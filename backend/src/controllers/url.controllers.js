import { nanoid } from "nanoid";
import { Url } from "../models/url.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { User } from "../models/user.model.js";

const createUrl = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.json(new ApiError(400, "User not logged in"));
  }
  const userLongUrl = req.body.longUrl;
  if (!userLongUrl) {
    return res.json(new ApiError(400, "Url is required"));
  }
  //needs work
  // const oldShortUrl = await Url.find({
  //   $and: [{ _id: user._id }, { long: userLongUrl }],
  // });
  // if (oldShortUrl) {
  //   return res.json(
  //     new ApiResponse(
  //       200,
  //       oldShortUrl.select("-_id"),
  //       "short url for this url already exists"
  //     )
  //   );
  // }

  const url = await Url.create({
    full: userLongUrl,
    short: nanoid(),
    owner: user._id,
  });
  if (!url) {
    return res.json(new ApiError(500, "Something went wrong"));
  }
  const newShortUrl = await Url.findOne({
    $and: [{ full: userLongUrl }, { owner: user._id }, { clicks: 0 }],
  });
  if (!newShortUrl) {
    return res.json(new ApiError(500, "Something went wrong"));
  }

  const newUrlObject = {
    full: userLongUrl,
    shortUrl: `https://${req.hostname}/${newShortUrl.short}`,
  };

  res.json(new ApiResponse(200, newUrlObject, "Short url created succesfully"));
});

const getAllUrl = asyncHandler(async (req, res) => {
  const user = req.user;
  if (!user) {
    return res.json(new ApiError(400, "User not logged in"));
  }

  const allUrlPairs = await Url.find({
    owner: user._id,
  });
  if (!allUrlPairs) {
    return res.json(new ApiError(400, "No urls found"));
  }

  return res.json(new ApiResponse(200, allUrlPairs, "All urls returned"));
});

const redirectUrl = asyncHandler(async (req, res) => {
  const shortId = req.params.shortId;
  if (shortId.length != 21) {
    return res.json(new ApiError(400, "Invalid url"));
  }
  const longUrl = await Url.findOne({
    short: shortId,
  });
  if (!longUrl) {
    return res.json(new ApiError(400, "Invalid url"));
  }
  const newLongUrl = await Url.findByIdAndUpdate(longUrl._id, {
    clicks: longUrl.clicks + 1,
  });
  if (!newLongUrl) {
    return res.json(new ApiError(500, "Redirection failed"));
  }

  res.redirect(301, newLongUrl.full);
});

export { createUrl, getAllUrl, redirectUrl };

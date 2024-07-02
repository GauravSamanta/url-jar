import { Router } from "express";
import { createUrl, getAllUrl } from "../controllers/url.controllers.js";
import { verifyJWT } from "../middlewares/auth.middleware.js";

const router = Router();

router.route("/short").post(verifyJWT, createUrl);
router.route("/getUrls").get(verifyJWT, getAllUrl);

export default router;

import { Card, Input, Button, Typography } from "@material-tailwind/react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { linkSchema } from "../schemas/linkSchema.js";
import { useState } from "react";
import axios from "axios";

export default function CreateLink() {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(linkSchema),
  });

  const [url, setUrl] = useState("https://url-jar-home.vercel.app/"); // Initialize with an empty string
  const [isLoading, setIsLoading] = useState(false);
  const onSubmit = async (data) => {
    setIsLoading(true);
    try {
      const response = await axios.post("/api/v1/url/short", data, {
        headers: { "Content-Type": "application/json" },
      });
      if (response.data) {
        setIsLoading(false);
        setUrl(response.data.data.shortUrl);
        const element=document.getElementById("shorten")
        document.value=url
        console.log(element);
        console.log(url);
      }
    } catch (error) {
      console.log(error);
      setIsLoading(false);
    }
  };

  return (
    <Card
      color="transparent"
      shadow={true}
      className="min-w-[40rem] max-w-[40rem] p-12 "
    >
      <form className="" onSubmit={handleSubmit(onSubmit)}>
        <Typography variant="h6" color="blue-gray" className="mb-3">
          Enter your Long URL
        </Typography>
        <div className="mb-1 flex flex-row gap-6">
          <Input
            size="lg"
            placeholder="Enter your long URL"
            className="!border-t-blue-gray-200 focus:!border-t-gray-900 basis-2/3"
            labelProps={{
              className: "before:content-none after:content-none",
            }}
            {...register("longUrl")}
          />
          <Button
            className="basis-1/3"
            fullWidth
            type="submit"
            disabled={isLoading}
          >
            {isLoading ? "Shortening..." : "Shorten"}
          </Button>
        </div>
        {errors.longUrl && <p>{errors.longUrl.message}</p>}
        <Typography variant="h6" color="blue-gray" className="">
          Your Shortened URL
        </Typography>
      </form>
      <div className="mb-1 flex flex-row gap-6">
        <Input
          size="lg"
          id="shorten"
          className="!border-t-blue-gray-200 focus:!border-t-gray-900 basis-2/3"
         value={url}
         readOnly
        />
        <Button
          className="basis-1/3"
          fullWidth
          type="button"
          onClick={() => navigator.clipboard.writeText(url)}
        >
          Copy
        </Button>
      </div>
    </Card>
  );
}

import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";
import morgan from "morgan";

const app = express();

app.use(
  cors({
    origin: ["https://url-jar-home.vercel.app", "http://localhost:5173"],
    credentials: true,
  })
);
app.use(express.json({ limit: "16kb" }));
app.use(express.urlencoded({ extended: true, limit: "16kb" }));
app.use(express.static("public"));
app.use(cookieParser());
app.use(
  morgan(":method :url :status :res[content-length] - :response-time ms")
);

//routes
import userRoutes from "./routes/user.route.js";
import urlRoutes from "./routes/url.routes.js";
import { redirectUrl } from "./controllers/url.controllers.js";

//routes declaration
app.use("/api/v1/users", userRoutes);
app.use("/api/v1/url", urlRoutes);

//main redirection
app.use("/:shortId", redirectUrl);

export { app };

import express from "express";
import dotenv from "dotenv";
dotenv.config();
import morgan from "morgan";
import cookieParser from "cookie-parser";
import fileUpload from "express-fileupload";
import cloudinary from "cloudinary";
import cors from "cors";

//route import
import user from "./route/user.js";
import goal from "./route/goal.js"

import { connectWithDB } from "./config/database.js";
connectWithDB();
const app = express();
const PORT  = process.env.PORT || 8090;

//regular middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: "*",
    credentials: true,
  })
);

//cookie and file middleware
app.use(cookieParser());
app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

//morgan middleware
app.use(morgan("tiny"));

//router middleware
app.use("/api/v1", user);
app.use("/api/v1", goal);

app.get("/", (req, res) => {
  res.send("working");
});


//connect with DB

//coludinary configurtion
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_NAME,
  api_key: process.env.CLOUDINARY_API,
  api_secret: process.env.CLOUDINARY_SECRET,
});

app.listen(PORT, () => {
  console.log(`server started at ${PORT}...`);
});

export default app;
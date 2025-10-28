import express from "express";
import { generateImage } from "../Controller/ImageController.js";
import authUser from "../Middelware/auth.js";

const ImageRoute = express.Router();

ImageRoute.post("/generateImage", authUser, generateImage);

export default ImageRoute;

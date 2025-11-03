import express from "express";
import mongoose from "mongoose";
import connectdb from "./Config/Mongodb.js";
import cors from "cors";
import UserRouter from "./routes/user.routes.js";
import ImageRoute from "./routes/ImageRoute.js";
import cookieParser from "cookie-parser";

const Fronted_Url = "http://localhost:5173";
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());
app.use(cookieParser());
app.use(
  cors({
    origin: Fronted_Url,
    Credential: true,
    methods: ["GET", "POST", "DELETE", "PUT"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

//connected database
await connectdb();

app.use("/api/user", UserRouter);
app.use("/api/image", ImageRoute);

app.get("/", (req, res) => {
  res.send("Welcome to the site");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

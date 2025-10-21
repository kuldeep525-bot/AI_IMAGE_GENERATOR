import express from "express";
import mongoose from "mongoose";
import connectdb from "./Config/Mongodb.js";
import cors from "cors";
import UserRouter from "./routes/user.routes.js";
const app = express();
const port = 5000;
app.use(cors());
app.use(express.json());

//connected database
await connectdb();

app.use("/api/user", UserRouter);

app.get("/", (req, res) => {
  res.send("Welcome to the site");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

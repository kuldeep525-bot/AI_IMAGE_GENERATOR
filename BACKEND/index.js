import express from "express";
import mongoose from "mongoose";
import connectdb from "./Config/Mongodb.js";
import cors from "cors";
const app = express();
const port = 5000;
app.use(cors());
await connectdb();

app.get("/", (req, res) => {
  res.send("Welcome to the site");
});

app.listen(port, () => {
  console.log(`server is running on port ${port}`);
});

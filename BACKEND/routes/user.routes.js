import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
} from "../Controller/userController.js";

const UserRouter = express.Router();

//define routes
UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.get("/logout", logoutUser);

export default UserRouter;

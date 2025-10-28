import express from "express";
import {
  loginUser,
  logoutUser,
  registerUser,
  userCredit,
} from "../Controller/userController.js";
import authUser from "../Middelware/auth.js";

const UserRouter = express.Router();

//define routes
UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);
UserRouter.get("/logout", logoutUser);
UserRouter.get("/credits", authUser, userCredit);

export default UserRouter;

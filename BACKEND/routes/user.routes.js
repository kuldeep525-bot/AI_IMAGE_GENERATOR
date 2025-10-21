import express from "express";
import { loginUser, registerUser } from "../Controller/userController.js";

const UserRouter = express.Router();

//define routes
UserRouter.post("/register", registerUser);
UserRouter.post("/login", loginUser);

export default UserRouter;

import User from "../Model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

const reisterUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || password) {
      return res.json({ success: false, message: "Missing Details" });
    }
  } catch (error) {}
};

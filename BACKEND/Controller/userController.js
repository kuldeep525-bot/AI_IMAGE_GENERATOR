import User from "../Model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

const JWT_SECURE_PASSWORD = "Ai_Image_Generator";
const NODE_ENV = "development";

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res.json({ success: false, message: "Missing details" });
    }

    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    if (!validator.isStrongPassword(password)) {
      return res.json({
        success: false,
        message:
          "Please enter a strong password (min 8 characters, including letters, numbers, and symbols)",
      });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.json({ success: false, message: "Email already registered" });
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const newUser = new User({ fullname, email, password: hashPassword });
    const userSave = await newUser.save();

    const token = jwt.sign({ id: userSave._id }, JWT_SECURE_PASSWORD, {
      expiresIn: "1d",
    });

    res.json({
      success: true,
      message: "User registered successfully",
      token,
      user: { fullname: userSave.fullname, email: userSave.email },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    const token = jwt.sign({ id: user._id }, JWT_SECURE_PASSWORD, {
      expiresIn: "1d",
    });

    const cookieOption = {
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      httpOnly: true,
      secure: NODE_ENV === "production",
      sameSite: "Strict",
    };

    res.cookie("jwt", token, cookieOption);

    res.json({
      success: true,
      message: "Login successful",
      token,
      user: { fullname: user.fullname, email: user.email },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

// LOGOUT USER
const logoutUser = async (req, res) => {
  res.clearCookie("jwt", {
    httpOnly: true,
    sameSite: "Strict",
    secure: NODE_ENV === "production",
  });
  res.json({ success: true, message: "Logged out successfully" });
};

//credit
const userCredit = async (req, res) => {
  try {
    const user = await User.findById(req.user.id);
    if (!user) {
      return res.json({ success: false, message: "User not found" });
    }
    res.json({
      success: true,
      credits: user.CreditBalance,
      user: { fullname: user.fullname },
    });
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser, logoutUser, userCredit };

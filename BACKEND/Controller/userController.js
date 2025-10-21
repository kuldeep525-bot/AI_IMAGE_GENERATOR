import User from "../Model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

const JWT_SECURE_PASSWORD = "USER1234";

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    // Check missing details
    if (!fullname || !email || !password) {
      return res.json({ success: false, message: "Missing details" });
    }

    // Validate email
    if (!validator.isEmail(email)) {
      return res.json({
        success: false,
        message: "Please enter a valid email",
      });
    }

    // Validate strong password
    if (!validator.isStrongPassword(password)) {
      return res.json({
        success: false,
        message:
          "Please enter a strong password (min 8 characters, including letters, numbers, and symbols)",
      });
    }

    // Hash password
    const hashPassword = await bcrypt.hash(password, 10);

    // Save user
    const newUser = new User({
      fullname,
      email,
      password: hashPassword,
    });

    const userSave = await newUser.save();

    // Create JWT token
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

    // Check if user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.json({ success: false, message: "User does not exist" });
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.json({ success: false, message: "Invalid password" });
    }

    // Generate token
    const token = jwt.sign({ id: user._id }, JWT_SECURE_PASSWORD, {
      expiresIn: "1d",
    });

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

export { registerUser, loginUser };

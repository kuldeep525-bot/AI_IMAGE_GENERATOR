// import User from "../Model/userModel.js";
// import bcrypt from "bcryptjs";
// import jwt from "jsonwebtoken";
// import validator from "validator";

// const JWT_SECURE_PASSWORD = "Ai_Image_Generator";
// const NODE_ENV = "development";

// // REGISTER USER
// const registerUser = async (req, res) => {
//   try {
//     const { fullname, email, password } = req.body;

//     if (!fullname || !email || !password) {
//       return res.json({ success: false, message: "Missing details" });
//     }

//     if (!validator.isEmail(email)) {
//       return res.json({
//         success: false,
//         message: "Please enter a valid email",
//       });
//     }

//     if (!validator.isStrongPassword(password)) {
//       return res.json({
//         success: false,
//         message:
//           "Please enter a strong password (min 8 characters, including letters, numbers, and symbols)",
//       });
//     }

//     const existingUser = await User.findOne({ email });
//     if (existingUser) {
//       return res.json({ success: false, message: "Email already registered" });
//     }

//     const hashPassword = await bcrypt.hash(password, 10);

//     const newUser = new User({ fullname, email, password: hashPassword });
//     const userSave = await newUser.save();

//     const token = jwt.sign({ id: userSave._id }, JWT_SECURE_PASSWORD, {
//       expiresIn: "1d",
//     });

//     res.json({
//       success: true,
//       message: "User registered successfully",
//       token,
//       user: { fullname: userSave.fullname, email: userSave.email },
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // LOGIN USER
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.json({ success: false, message: "User does not exist" });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.json({ success: false, message: "Invalid password" });
//     }

//     const token = jwt.sign({ id: user._id }, JWT_SECURE_PASSWORD, {
//       expiresIn: "1d",
//     });

//     const cookieOption = {
//       expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
//       httpOnly: true,
//       secure: NODE_ENV === "production",
//       sameSite: "Strict",
//     };

//     res.cookie("jwt", token, cookieOption);

//     res.json({
//       success: true,
//       message: "Login successful",
//       token,
//       user: { fullname: user.fullname, email: user.email },
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// // LOGOUT USER
// const logoutUser = async (req, res) => {
//   res.clearCookie("jwt", {
//     httpOnly: true,
//     sameSite: "Strict",
//     secure: NODE_ENV === "production",
//   });
//   res.json({ success: true, message: "Logged out successfully" });
// };

// //credit
// const userCredit = async (req, res) => {
//   try {
//     const user = await User.findById(req.user.id);
//     if (!user) {
//       return res.json({ success: false, message: "User not found" });
//     }
//     res.json({
//       success: true,
//       credits: user.CreditBalance,
//       user: { fullname: user.fullname },
//     });
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: error.message });
//   }
// };

// export { registerUser, loginUser, logoutUser, userCredit };

// BACKEND/Controller/userController.js
import User from "../Model/userModel.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import validator from "validator";

const JWT_SECURE_PASSWORD = "Ai_Image_Generator"; // keep same as auth middleware
const NODE_ENV = process.env.NODE_ENV || "development";
const createToken = (id) => {
  return jwt.sign({ id }, JWT_SECURE_PASSWORD, { expiresIn: "1d" });
};

// REGISTER USER
const registerUser = async (req, res) => {
  try {
    const { fullname, email, password } = req.body;

    if (!fullname || !email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing details" });
    }

    // validate email
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Invalid email" });
    }

    // check existing
    const userExists = await User.findOne({ email: email.toLowerCase() });
    if (userExists) {
      return res
        .status(400)
        .json({ success: false, message: "Email already registered" });
    }

    // hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullname,
      email: email.toLowerCase(),
      password: hashed,
      // CreditBalance default is set in schema
    });

    const token = createToken(user._id);

    // return token and basic user info
    return res.status(201).json({
      success: true,
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("registerUser error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// LOGIN USER
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res
        .status(400)
        .json({ success: false, message: "Missing credentials" });
    }

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res
        .status(401)
        .json({ success: false, message: "Invalid email or password" });
    }

    const token = createToken(user._id);

    return res.json({
      success: true,
      user: {
        _id: user._id,
        fullname: user.fullname,
        email: user.email,
      },
      token,
    });
  } catch (error) {
    console.error("loginUser error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// LOGOUT USER (example if you want to clear cookie — front-end may just drop the token)
const logoutUser = async (req, res) => {
  try {
    // If you're storing token in cookies, clear it. If using localStorage on client, instruct client to remove it.
    res.clearCookie("token");
    return res.json({ success: true, message: "Logged out" });
  } catch (error) {
    console.error("logoutUser error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

// GET USER CREDITS (protected route)
const userCredit = async (req, res) => {
  try {
    // ensure middleware put _id on req.user
    const userId = req.user && (req.user._id || req.user.id);
    if (!userId) {
      return res.status(401).json({ success: false, message: "Unauthorized" });
    }

    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    return res.json({
      success: true,
      credits: user.CreditBalance,
      user: { fullname: user.fullname, email: user.email },
    });
  } catch (error) {
    console.error("userCredit error:", error);
    return res.status(500).json({ success: false, message: error.message });
  }
};

export { registerUser, loginUser, logoutUser, userCredit };

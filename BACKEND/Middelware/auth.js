import jwt from "jsonwebtoken";

const JWT_SECURE_PASSWORD = "Ai_Image_Generator"; // keep same as in controller

const authUser = async (req, res, next) => {
  try {
    console.log("========== AUTH DEBUG ==========");
    console.log("Headers received:", req.headers);

    // 1️⃣ Extract the Authorization header
    const authHeader = req.headers["authorization"];
    if (!authHeader) {
      return res.status(401).json({
        success: false,
        message: "No Authorization header found",
      });
    }

    // 2️⃣ Ensure it starts with Bearer
    if (!authHeader.startsWith("Bearer ")) {
      return res.status(400).json({
        success: false,
        message: "Invalid Authorization format. It should start with 'Bearer '",
      });
    }

    // 3️⃣ Extract the token
    const token = authHeader.split(" ")[1];
    if (!token) {
      return res.status(400).json({
        success: false,
        message: "Token missing after Bearer",
      });
    }

    console.log("Token extracted:", token);

    // 4️⃣ Verify token
    const decoded = jwt.verify(token, JWT_SECURE_PASSWORD);
    console.log("Decoded token:", decoded);

    // 5️⃣ Store user ID in req.user (works for GET too)
    req.user = { id: decoded.id };

    // 6️⃣ Continue
    next();
  } catch (error) {
    console.log("JWT Verification Error:", error.message);
    return res.status(401).json({
      success: false,
      message: "Invalid or expired token",
    });
  }
};

export default authUser;

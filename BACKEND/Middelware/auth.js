import jwt from "jsonwebtoken";

const JWT_SECURE_PASSWORD = "Ai_Image_Generator"; // keep same as in controller

const authUser = async (req, res, next) => {
  try {
    console.log("========== AUTH DEBUG ==========");
    console.log("Headers received:", req.headers);

    const authHeader = req.headers["authorization"];
    if (!authHeader)
      return res
        .status(401)
        .json({ success: false, message: "No Authorization header found" });

    if (!authHeader.startsWith("Bearer "))
      return res
        .status(400)
        .json({ success: false, message: "Invalid Authorization format" });

    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, JWT_SECURE_PASSWORD);
    console.log("Decoded token:", decoded);

    req.user = decoded; // ✅ save decoded token (contains id)
    next();
  } catch (error) {
    console.log("JWT Verification Error:", error.message);
    return res
      .status(401)
      .json({ success: false, message: "Invalid or expired token" });
  }
};

export default authUser;

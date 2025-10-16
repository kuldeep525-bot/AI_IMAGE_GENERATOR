import jwt from "jsonwebtoken";
const jwt_user_password = "Ai_Image_Generator";

const authUser = async (req, res, next) => {
  const { token } = req.header;
  if (!token) {
    return res.json({ success: false, message: "Not authorized Login again" });
  }

  try {
    const token_decode = jwt.verify(token, jwt_user_password);
    if (token_decode.id) {
      req.body.userId = token_decode.id;
    } else {
      return res.json({
        success: false,
        message: "Not authorized Login again",
      });
    }

    next();
  } catch (error) {
    console.log(error);
    res.json({ success: false, message: error.message });
  }
};

export default authUser;

// import jwt from "jsonwebtoken";
// const jwt_user_password = "Ai_Image_Generator";

// const authUser = async (req, res, next) => {
//   try {
//     // ✅ 1. Get token from header
//     const authHeader = req.header("Authorization");

//     // ✅ 2. Check if token exists
//     if (!authHeader || !authHeader.startsWith("Bearer ")) {
//       return res.json({
//         success: false,
//         message: "Not authorized. Login again.",
//       });
//     }

//     // ✅ 3. Extract token (remove 'Bearer ')
//     const token = authHeader.split(" ")[1];

//     // ✅ 4. Verify token using your secret key
//     const decoded = jwt.verify(token, jwt_user_password);

//     // ✅ 5. Add userId to req.body for use in next functions
//     req.body.userId = decoded.id;

//     // ✅ 6. Continue to next middleware or route
//     next();
//   } catch (error) {
//     console.log(error);
//     res.json({ success: false, message: "Invalid or expired token" });
//   }
// };

// export default authUser;

import mongoose from "mongoose";

const connectdb = async () => {
  try {
    await mongoose.connect(
      "mongodb+srv://bachelor97797_db_user:NMgmde4Vx32fFdSK@clustor0.h5tciwb.mongodb.net/AI_IMAGE_GENRATOR"
    );
    console.log("✅ DB connected successfully");
  } catch (error) {
    console.error("❌ Database connection failed:", error.message);
    process.exit(1);
  }
};

export default connectdb;

import mongoose from "mongoose";

const TransactionSchema = new mongoose.Schema(
  {
    UserID: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    plan: {
      type: String,
      required: true,
      default: "Basic",
    },
    amount: {
      type: Number,
      required: true,
    },
    credit: {
      type: Number,
      required: true,
    },
    payment: {
      type: Boolean,
      default: false,
    },
    date: {
      type: Date,
      default: Date.now,
    },
  },
  { timestamps: true }
);

const Transaction = mongoose.model("Transaction", TransactionSchema);

export default Transaction;

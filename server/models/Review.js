const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  revieweeId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  star: {
    type: Number,
    enum: [1, 2, 3, 4, 5],
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
}, { timestamps: true });

module.exports = Request = mongoose.model("Review", ReviewSchema);

const mongoose = require("mongoose");

const ReviewSchema = new mongoose.Schema({
  reviewerId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Profile",
  },
  profileId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "Profile",
  },
  star: {
    type: Integer,
    enum: [0, 1, 2, 3, 4, 5],
    required: true,
  },
  description: {
    type: String,
    default: "",
  },
  timestamps: true,
});

module.exports = Request = mongoose.model("Review", ReviewSchema);

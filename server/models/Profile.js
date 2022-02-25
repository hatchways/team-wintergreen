const mongoose = require("mongoose");
const { arrayLimit } = require("../utils/helpers");

const profileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  name: {
    type: String,
    default: "",
  },
  description: {
    type: String,
    default: "",
  },
  gender: {
    type: String,
    enum: ["male", "female", "other"],
  },
  address: {
    type: String,
    default: "",
  },
  telephone: {
    type: String,
    default: "",
  },
  birthday: {
    type: Date,
    default: null,
  },
  photo: {
    type: String,
    default: "",
  },
  activeSchedule:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Availability",
  },
  accountType: {
    type: String,
    enum: ["pet_sitter", "pet_owner"],
    default: "pet_owner",
  },
  // most recent 10 reviews
  reviews: {
    type: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Review',
    }],
    validate: [arrayLimit, '{PATH} exceeds the limit of 10']
  },
});

module.exports = Profile = mongoose.model("Profile", profileSchema);

const mongoose = require("mongoose");

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
  photoKey: {
    type: String,
    default: "",
  },
  tagLine: {
    type: String,
    default: ''
  },
  price: {
    type: String,
  },
  rating: {
    type: String,
    default: 0,
  },
  activeSchedule:{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Availability",
  },
  accountType: {
    type: String,
    enum: ["pet_sitter", "pet_owner"],
    default: "pet_owner",
  }
});

module.exports = Profile = mongoose.model("Profile", profileSchema);

const express = require("express");
const router = express.Router();
const protect = require("../middleware/auth");
const { editProfile, loadProfile } = require("../controllers/profile");

router.route("/edit").put(protect, editProfile);

router.route("/load/:userId").get(protect, loadProfile);

module.exports = router;

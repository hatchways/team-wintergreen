const express = require("express");
const {
  getRequests,
  makeRequest,
  updateRequest,
} = require("../controllers/request");
const protect = require("../middleware/auth");
const router = express.Router();

router.route("/").get(protect, getRequests);
router.route("/").post(protect, makeRequest);
router.route("/").put(protect, updateRequest);

module.exports = router;

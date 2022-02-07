const express = require("express");
const {
  getRequests,
  makeRequest,
  updateRequest,
} = require("../controllers/request");
const protect = require("../middleware/auth");
const requestValidation = require("../middleware/request");
const router = express.Router();

router.route("/").get(protect, getRequests);
router.route("/").post(protect, requestValidation, makeRequest);
router.route("/:id").put(protect, requestValidation, updateRequest);

module.exports = router;

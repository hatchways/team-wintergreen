const express = require("express");
const router = express.Router();
const { protect } = require('../middleware/auth');
const {
  editProfile,
  loadProfile,
  getAllSitters
} = require('../controllers/profile');
const reviewRouter = require('../routes/review');
const notificationRouter = require('../routes/notification');

router.route("/edit").put(protect, editProfile);
router.route("/load/:userId").get(protect, loadProfile);
router.route('/sitters').get(getAllSitters);
router.use("/notifications", notificationRouter);

router.route('/load').get(protect, loadProfile);

router.use("/reviews", reviewRouter);

module.exports = router;

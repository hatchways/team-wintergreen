const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  editProfile,
  loadProfile,
} = require('../controllers/profile');
const reviewRouter = require('../routes/review');

router.route('/edit').put(protect, editProfile);

router.route('/load').get(protect, loadProfile);

router.use("/reviews", reviewRouter);

module.exports = router;
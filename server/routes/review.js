const express = require('express');
const router = express.Router();
const protect = require('../middleware/auth');
const {
  getReviews, createReview
} = require('../controllers/review');

router.route('/').get(protect, getReviews);
router.route('/').post(protect, createReview);

module.exports = router; 
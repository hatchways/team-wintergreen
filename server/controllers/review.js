const Review = require("../models/Review");
const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");

exports.getReviews = asyncHandler(async (req, res) => {
    const id = req.params.id;
    const reviews = await Review.find({ revieweeId: id });
    res.status(200).json({ success: { reviews }});
});

exports.createReview = asyncHandler(async (req, res) => {
    const {
        revieweeId,
        star,
        description
    } = req.body;
    const { id } = req.user;

    const review = new Review({
        id,
        revieweeId,
        star,
        description
    });
    await review.save();

    const profile = await Profile.findById({ userId: revieweeId }, { "reviews": 1 });
    const reviews = profile.reviews;

    if (reviews.length <= 10) {
        reviews.push(review);
    } else {
        reviews.pop();
        reviews.unshift(review);
    };
    profile = await profile.save();

    if (profile) res.status(200).json({ success: { review } });
});

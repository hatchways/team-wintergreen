const Review = require("../models/Review");
const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");

exports.getReviews = asyncHandler(async (req, res) => {
    const { id } = req.user;
    let reviews = await Review.find({ profileId: id });
    res.status(200).json({ success: { reviews }});
});
exports.createReview = asyncHandler(async (req, res) => {
    const {
        reviewerId,
        profileId,
        star,
        description
    } = req.body;
    let review = new Review({
        reviewerId,
        profileId,
        star,
        description
    });
    await review.save();

    let reviews = await Profile.find({ userId: profileId }, { "reviews": 1 }).reviews;
    if (reviews.length <= 10) {
        reviews.push(review);
    } else {
        reviews.pop();
        reviews.unshift(review);
    };
    let profile = await Profile.updateOne({ userId: profileId }, { $set: { reviews } })
    if (profile) res.status(200).json({ success: { review } });
});

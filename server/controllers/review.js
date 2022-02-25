const Review = require("../models/Review");
const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");

exports.getReviews = asyncHandler(async (req, res) => {
    const { id } = req.user;
    Review.find({ profileId: id })
        .then((reviews) => {
            res.status(200).json({
                success: {
                    reviews: reviews,
                },
            });
        });
});
exports.createReview = asyncHandler(async (req, res) => {
    const {
        reviewerId,
        profileId,
        star,
        description
    } = req.body;
    review = new Review({
        reviewerId,
        profileId,
        star,
        description
    });
    review.save();

    reviews = Profile.find({ userId: profileId }, { "reviews": 1 }).reviews;
    if (reviews.length <= 10) {
        reviews.push(review);
    } else {
        reviews.pop();
        reviews.unshift(review);
    };
    Profile.updateOne({ userId: profileId }, {
        $set:
        {
            reviews: reviews
        }
    }).then(
        res.status(200).json({
            success: {
                review: review
            }
        })
    );
});

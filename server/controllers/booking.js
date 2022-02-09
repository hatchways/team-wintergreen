const Booking = require("../models/Booking");
const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");

// @route GET /bookings
// @desc list of bookings
// @access Private
exports.getBookings = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ userId: req.user.id });
  if (profile.accountType === "pet_owner") {
    const bookings = await Booking.find({ userId: req.user.id });

    res.status(200).json({
      success: {
        bookings: bookings,
      },
    });
  } else {
    const bookings = await Booking.find({ sitterId: req.user.id });
    res.status(200).json({
      success: {
        bookings: bookings,
      },
    });
  }
});

// @route POST /bookings
// @desc Create a new booking
// @access Private
exports.makeBooking = asyncHandler(async (req, res, next) => {
  const booking = new Booking(req.booking);

  await Booking.create(booking);

  res.status(200).json({
    success: {
      bookings: bookings,
    },
  });
});

// @route PATCH /bookings
// @desc Update booking with approved or decline
// @access Private
exports.updateBooking = asyncHandler(async (req, res, next) => {
  const booking = await Booking.findById(req.booking.id);

  if (!booking) {
    res.status(400);
    throw new Error("Profile doesn't exist");
  }

  booking.set(req.booking);
  const updateBooking = await booking.save();

  res.status(200).json({
    success: {
      booking: updateBooking,
    },
  });
});

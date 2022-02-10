const bookingValidation = (req, res, next) => {
  const booking = req.body.booking;

  if (!booking.startDate || !booking.endDate) {
    res.status(400);
    throw new Error("date input error");
  } else {
    req.booking = booking;
  }

  if (!booking.petOwner && !booking.userId) {
    req.booking.userId = req.user.id;
  } else if (!booking.userId) {
    req.booking.userId = booking.petOwner.id;
  }

  if (!booking.sitter && !booking.sitterId) {
    res.status(400);
    throw new Error("sitter doesn't exist");
  } else if (!booking.sitterId) {
    req.booking.sitterId = booking.sitter.id;
  }

  next();
};

module.exports = bookingValidation;

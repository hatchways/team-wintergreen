const bookingValidation = (req, res, next) => {
  const booking = req.booking;

  if (!booking.userId) {
    res.status(400);
    throw new Error("user doesn't exist");
  }

  if (!booking.sitterId) {
    res.status(400);
    throw new Error("sitter doesn't exist");
  }

  if (!booking.startDate || !booking.endDate) {
    res.status(400);
    throw new Error("date input error");
  }

  next();
};

module.exports = bookingValidation;

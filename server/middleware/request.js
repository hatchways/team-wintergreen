const requestValidation = (req, res, next) => {
  const request = req.request;

  if (!request.userId) {
    res.status(400);
    throw new Error("user doesn't exist");
  }

  if (!request.sitterId) {
    res.status(400);
    throw new Error("sitter doesn't exist");
  }

  if (!request.startDate || !request.endDate) {
    res.status(400);
    throw new Error("date input error");
  }

  next();
};

module.exports = requestValidation;

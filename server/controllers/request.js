const Request = require("../models/Request");
const Profile = require("../models/Profile");
const asyncHandler = require("express-async-handler");

// @route GET /request
// @desc list of requests
// @access Private
exports.getRequests = asyncHandler(async (req, res, next) => {
  const profile = await Profile.findOne({ userId: req.user.id });

  if (profile.accountType === "pet_owner") {
    const requests = await Request.find({ userId: req.user.id });
    console.log(requests);
    res.status(200).json({
      success: {
        requests: requests,
      },
    });
  } else {
    const requests = await Request.find({ sitterId: req.user.id });
    res.status(200).json({
      success: {
        requests: requests,
      },
    });
  }
});

// @route POST /request
// @desc Create a new request
// @access Private
exports.makeRequest = asyncHandler(async (req, res, next) => {
  const request = new Request(req.body.request);

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

  await Request.create(request);
  res.status(200).json("create profile success");
});

// @route PUT /request
// @desc Update request with approved or decline
// @access Private
exports.updateRequest = asyncHandler(async (req, res, next) => {
  const request = await Request.findById(req.body.request.id);

  if (!request) {
    res.status(400);
    throw new Error("Profile doesn't exist");
  }

  request.set(req.body.request);
  const updateRequest = await request.save();

  res.status(200).json({
    success: {
      request: updateRequest,
    },
  });
});

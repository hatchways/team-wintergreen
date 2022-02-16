

const User = require("../models/User");
const asyncHandler = require("express-async-handler");
const Conversation = require("../models/conversation");
const Message = require("../models/message");
const Profile = require("../models/Profile");
// @route Post /create
// @desc create conversation
// @access Public
exports.createConversation = asyncHandler(async (req, res, next) => {
  const userId = await User.findById(req.user.id);
  if (!userId) {
    res.status(401);
    throw new Error("Not authorized");
  }
  const senderId = req.user.id;
  const { recipientId, text, conversationId } = req.body;
  if (conversationId) {
    const message = await Message.create({ senderId, text, conversationId });
    return res.json({ message });
  }

  let conversation = await Conversation.findOne({ $and: [{ userId1: senderId }, { userId2: recipientId }] });
  if (conversation) {
    const message = await Message.create({
      senderId,
      text,
      conversationId: conversation._id
    })
    res.status(200).json({
      success: {
        message: message,
        conversation: conversation._id
      },
    });
  }
  else {
    conversation = await Conversation.create({
      userId1: senderId, userId2: recipientId
    })
    const newMessage = await Message.create({
      senderId,
      text,
      conversationId: conversation._id
    })
    res.status(200).json({
      success: {
        message: newMessage,
        conversation: conversation._id
      },
    });
  }
});


// @route Post /send
// @desc send message
// @access Public
exports.sendMessage = asyncHandler(async (req, res, next) => {
  console.log(req.body)
  const userId = await User.findById(req.user.id);
  if (!userId) {
    res.status(401);
    throw new Error("Not authorized");
  }
  const senderId = req.user.id;
  const { text, conversationId } = req.body;

  let conversation = await Conversation.findOne({ _id: conversationId });
  if (conversation) {
    const message = await Message.create({
      senderId,
      text,
      conversationId
    })
    res.status(200).json({
      success: {
        message: message,
        conversation: conversation._id
      },
    });
  }

});


// @route GET /all
// @desc send message
// @access Public
exports.getAllConversations = asyncHandler(async (req, res, next) => {
  const userId = await User.findById(req.user.id);
  if (!userId) {
    res.status(401);
    throw new Error("Not authorized");
  }
  const senderId = req.user.id;
  let conversation = await Conversation.find({ $or: [{ userId1: senderId }, { userId2: senderId }] });
  let newConversation = [];
  let conversationInfo=[];
  console.log(conversation);
  for (let i = 0; i < conversation.length; i++) {
    let profile = "";
    newConversation.length=0;
    newConversation.conversationId=conversation[i]._id;
    console.log(conversation[i].userId1,senderId);
    if (conversation[i].userId1 == senderId) {
      profile = await Profile.findOne({ userId: conversation[i].userId2 });
      newConversation.otherUser=conversation[i].userId2;
      newConversation.name=profile.name;
      newConversation.photo=profile.photo;
    }
    else {
      profile = await Profile.findOne({ userId: conversation[i].userId1 });
      newConversation.otherUser=conversation[i].userId1;
      newConversation.name=profile.name;
      newConversation.photo=profile.photo;
    }
    let messages = await Message.find({ conversationId: conversation[i]._id });
    newConversation.latestMessage=messages[messages.length-1].text;
    newConversation.createAt=messages[messages.length-1].createdAt;
    conversationInfo[i]={...newConversation};

  }
  res.status(200).json({
    success: {
      newConversation:conversationInfo
    },
  });
});

// @route GET /message/:conversationId
// @desc send message
// @access Public
exports.getAllMessages = asyncHandler(async (req, res, next) => {
  console.log(req.params.conversationId)
  const conversationId = req.params.conversationId;
  let messages = await Message.find({ conversationId });
  res.status(200).json({
    success: {
      message: messages
    },
  });
});


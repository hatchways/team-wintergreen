const mongoose = require("mongoose");

const notificationSchema = new mongoose.Schema({
  // generally, there should be three broad categories of notification: notifications for messages, notifications for payment
  // activity, notifications for appointment activity and notifications for account activity (login/logout)
  type: {
    type: String,
    enum: ['account', 'appointment', 'message', 'payment'],
  },
});

module.exports = Notification = mongoose.model("Notification", notificationSchema);

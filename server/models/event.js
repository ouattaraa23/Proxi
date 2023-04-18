const mongoose = require("mongoose");

// Assuming you have already imported the User model
const ProxiUser = require("./proxi-user");

const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  joinCode: {
    type: String,
    required: true,
  },
  attendees: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "ProxiUser",
  },
  imageSource: {
    type: String,
    required: true,
  }
});

module.exports = mongoose.model("Event", eventSchema);

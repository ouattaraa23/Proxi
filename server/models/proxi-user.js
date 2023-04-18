const mongoose = require("mongoose");

const eventUser = require('./event');

const proxiUserSchema = new mongoose.Schema({
  phoneNumber: {
    type: String,
    required: true,
  },
  fullName: {
    type: String,
  },
  jobTitle: {
    type: String,
  },
  company: {
    type: String,
  },
  location: {
    type: String,
  },
  email: {
    type: String,
  },
  connections: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "ProxiUser",
  },
  pendingConnections: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: "ProxiUser",
  },
  skills: {
    type: [String],
  },
  registeredEvents: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'eventUser'
  },
  pastEvents: {
    type: [mongoose.Schema.Types.ObjectId],
    ref: 'eventUser'
  }
});

module.exports = mongoose.model("proxi-user", proxiUserSchema);

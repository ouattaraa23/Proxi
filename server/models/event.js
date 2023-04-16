const mongoose = require('mongoose');

// Assuming you have already imported the User model
const User = require('./proxi-user');

const eventSchema = new mongoose.Schema({
    eventName: {
        type: String,
        required: true
    },
    eventLocation: {
        type: String,
        required: true
    },
    eventDate: {
        type: Date,
        required: true
    },
    attendees: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    }]
});

module.exports = mongoose.model('Event', eventSchema);
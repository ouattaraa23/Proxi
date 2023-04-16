const mongoose = require('mongoose')

const proxiUserSchema = new mongoose.Schema({
    phoneNumber: {
        type: String,
        required: true
    }, 
    fullName: {
        type: String
    },
    jobTitle: {
        type: String
    },
    company: {
        type: String
    },
    location: {
        type: String
    }
})

module.exports = mongoose.model('proxi-user', proxiUserSchema)
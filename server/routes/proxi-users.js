const express = require('express')
const router = express.Router()
const ProxiUser = require('../models/proxi-user')

// Getting all Users
router.get('/users', async (req, res) => {
    try {
        const users = await ProxiUser.find()
        res.json(users)
    } catch (err) {
        // 500 status means there's something wrong in the server
        res.status(500).json( {message: "nice try man" })
    }
})

// Getting a User By PhoneNumber
router.get('/phoneNumber/:phoneNumber', getUserByPhoneNumber, async (req, res) => {
  res.json(res.user)
})

// Creating a User
router.post('/register', async (req, res) => {
    const user = new ProxiUser ({
        phoneNumber: req.body.phoneNumber,
    })

  try {
    const existingUser = await ProxiUser.findOne({ phoneNumber: req.body.phoneNumber });
    if (existingUser) {
      res.status(400).json({ message: 'User already exists' });
    } else {
      const newUser = await user.save();
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(500).json({ message: err.message});
  }
})

// Update a User
router.put('/update/:phoneNumber', getUserByPhoneNumber, async (req, res) => {
  if (req.body.fullName != null) {
      res.user.fullName = req.body.fullName;
  }
  if (req.body.jobTitle != null) {
      res.user.jobTitle = req.body.jobTitle;
  }
  if (req.body.company != null) {
      res.user.company = req.body.company;
  }
  if (req.body.location != null) {
      res.user.location = req.body.location;
  }

  try {
      const updatedUser = await res.user.save();
      res.json(updatedUser);
  } catch (err) {
      res.status(400).json({ message: err.message });
  }
})

// Helper function to get a user by their phone number
async function getUserByPhoneNumber(req, res, next) {
  let user

  try {
      const decodedPhoneNumber = decodeURIComponent(req.params.phoneNumber);
      user = await ProxiUser.findOne({ phoneNumber: decodedPhoneNumber})
  } catch (err) {
    if (user == null) {
      return res.status(404).json({ message: 'Phone number not found'})
    }
    return res.status(500).json({ message: err.message})
  }

  res.user = user
  next()
}

module.exports = router;
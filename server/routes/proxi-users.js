const express = require("express");
const router = express.Router();
const ProxiUser = require("../models/proxi-user");

// Getting all Users
router.get("/users", async (req, res) => {
  try {
    const users = await ProxiUser.find();
    res.json(users);
  } catch (err) {
    // 500 status means there's something wrong in the server
    res.status(500).json({ message: "nice try man" });
  }
});

// Getting a User By PhoneNumber
router.get(
  "/phoneNumber/:phoneNumber",
  getUserByPhoneNumber,
  async (req, res) => {
    res.json(res.user);
  }
);

// Creating a User
router.post("/register", async (req, res) => {
  const user = new ProxiUser({
    phoneNumber: req.body.phoneNumber,
  });

  try {
    const existingUser = await ProxiUser.findOne({
      phoneNumber: req.body.phoneNumber,
    });
    if (existingUser) {
      res.status(400).json({ message: "User already exists" });
    } else {
      const newUser = await user.save();
      res.status(201).json(newUser);
    }
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Update a User
router.put("/update/:phoneNumber", getUserByPhoneNumber, async (req, res) => {
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
  if (req.body.connections != null) {
    res.user.connections = req.body.connections;
  }
  if (req.body.skills != null) {
    res.user.skills = req.body.skills;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Update a User's email
router.put("/add-email/:phoneNumber", getUserByPhoneNumber, async (req, res) => {
  if (req.body.email != null) {
    res.user.email = req.body.email;
  }

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add a connection to a User
router.put("/add-connection/:phoneNumber", getUserByPhoneNumber, async (req, res) => {
  const connectionId = req.body.connectionId;
  if (!connectionId) {
    return res.status(400).json({ message: "Connection ID is required" });
  }
  if (res.user.connections.includes(connectionId)) {
    return res.status(400).json({ message: "Connection already exists" });
  }

  res.user.connections.push(connectionId);

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add a Pending Connection to a User
router.put("/add-pending-connection/:phoneNumber", getUserByPhoneNumber, async (req, res) => {
  const connectionId = req.body.connectionId;
  if (!connectionId) {
    return res.status(400).json({ message: "Connection ID is required" });
  }
  if (res.user.connections.includes(connectionId)) {
    return res.status(400).json({ message: "Connection already exists" });
  }

  res.user.pendingConnections.push(connectionId);

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Delete a Pending Connection from a User
router.put("/delete-pending-connection/:phoneNumber", getUserByPhoneNumber, async (req, res) => {
  const connectionId = req.body.connectionId;
  if (!connectionId) {
    return res.status(400).json({ message: "Connection ID is required" });
  }
  if (!res.user.pendingConnections.includes(connectionId)) {
    return res.status(400).json({ message: "Pending connection not found" });
  }

  res.user.pendingConnections = res.user.pendingConnections.filter(id => id.toString() !== connectionId);

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Add skills to a User
router.put("/add-skills/:phoneNumber", getUserByPhoneNumber, async (req, res) => {
  const newSkills = req.body.skills;
  if (!newSkills || newSkills.length === 0) {
    return res.status(400).json({ message: "Skills are required" });
  }

  // Filter out skills that are already in the user's skills list
  const skillsToAdd = newSkills.filter(skill => !res.user.skills.includes(skill));

  res.user.skills.push(...skillsToAdd);

  try {
    const updatedUser = await res.user.save();
    res.json(updatedUser);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});


// Getting a User by ID
router.get("/user/:userId", async (req, res) => {
  const userId = req.params.userId;
  const user = await getUserById(userId);

  if (!user) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(user);
});

// Helper function to get a user by their phone number
async function getUserByPhoneNumber(req, res, next) {
  let user;

  try {
    const userPhoneNumber = req.params.phoneNumber;
    user = await ProxiUser.findOne({ phoneNumber: userPhoneNumber });
  } catch (err) {
    if (user == null) {
      return res.status(404).json({ message: "Phone number not found" });
    }
    return res.status(500).json({ message: err.message });
  }

  res.user = user;
  next();
}

// Helper function to get a user by their ID
async function getUserById(userId) {
  let user;

  try {
    user = await ProxiUser.findById(userId);
  } catch (err) {
    console.error(err);
    return null;
  }

  return user;
}

module.exports = router;

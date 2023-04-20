const express = require("express");
const router = express.Router();
const eventUser = require("../models/event");
const ProxiUser = require("../models/proxi-user");

// Getting all Users
router.get("/all-events", async (req, res) => {
  try {
    const events = await eventUser.find();
    res.json(events);
  } catch (err) {
    // 500 status means there's something wrong in the server
    res.status(500).json({ message: "nice try man" });
  }
});

// Creating a User
router.post("/register", async (req, res) => {
  const user = new eventUser({
    name: req.body.name,
    location: req.body.location,
    date: req.body.date,
    description: req.body.description,
    joinCode: req.body.joinCode,
    attendees: req.body.attendees,
    imageSource: req.body.imageSource,
  });

  try {
    const existingUser = await eventUser.findOne({
      _id: req.body._id,
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

// Add attendee to an event
router.put("/add-attendee/:eventId/:userId", async (req, res) => {
  try {
    const event = await eventUser.findById(req.params.eventId);
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }

    const attendee = await ProxiUser.findById(req.params.userId);
    if (!attendee) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    if (event.attendees.includes(req.params.userId)) {
      res.status(400).json({ message: "User already added as attendee" });
      return;
    }

    event.attendees.push(req.params.userId);
    const updatedEvent = await event.save();
    res.json(updatedEvent);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Getting an Event by ID
router.get("/event/:eventId", async (req, res) => {
  const eventId = req.params.eventId;
  const event = await getEventById(eventId);

  if (!event) {
    return res.status(404).json({ message: "User not found" });
  }

  res.json(event);
});

// Getting an Event by Join Code
router.get("/join-code/:joinCode", async (req, res) => {
  try {
    const event = await eventUser.findOne({ joinCode: req.params.joinCode });
    if (!event) {
      res.status(404).json({ message: "Event not found" });
      return;
    }
    res.json(event);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message });
  }
});

// Helper function to get a user by their ID
async function getEventById(eventId) {
  let event;

  try {
    event = await eventUser.findById(eventId);
  } catch (err) {
    console.error(err);
    return null;
  }

  return event;
}

module.exports = router;

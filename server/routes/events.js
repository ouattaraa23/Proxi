const express = require("express");
const router = express.Router();
const eventUser = require("../models/event");

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

module.exports = router;
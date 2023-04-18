require("./src/db");

require('dotenv').config();

const express = require('express');
const bodyParser = express.json;
const cors = require('cors');
const proxiUserRoutes = require("./routes/proxi-users");
const eventRoutes = require("./routes/events")

// Create the app
const app = express();

const corsOp = {
    credentials: true,
    origin: "*"
};

app.use(cors(corsOp));
app.use(bodyParser());
app.use("/proxi-users/", proxiUserRoutes);
app.use("/events/", eventRoutes);

module.exports = app;


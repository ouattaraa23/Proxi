require("./src/db");

require('dotenv').config();

const express = require('express');
const bodyParser = express.json;
const cors = require('cors');
const proxiUserRoutes = require("./routes/proxi-users");

// Create the app
const app = express();

app.use(cors());
app.use(bodyParser());
app.use("/proxi-users/", proxiUserRoutes);

module.exports = app;


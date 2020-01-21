const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

//  health checks
app.get("/status", (req, res) => {
  res.status(200).send();
});

// cors
app.use(cors());

// bodyparser
app.use(bodyParser.json());

// Error 404 handler
app.use((req, res) => {
  res.send("not found");
});

module.exports = app;

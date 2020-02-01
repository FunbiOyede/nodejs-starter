const express = require("express");
const expressWinston = require("express-winston");
const cors = require("cors");
// const winston = require("winston");
// const { timestamp, combine, printf, label } = winston.format;
const bodyParser = require("body-parser");
const AdminRoutes = require("../api/routes/admin");
const PatientRoutes = require("../api/routes/patient");
const config = require("../config/index");
const HttpLogger = require("../api/middleware/index");
const app = express();

//  health checks
app.get("/status", (req, res) => {
  res.status(200).send("working");
});

// cors
app.use(cors());

// bodyparser
app.use(bodyParser.json());

// http logger
app.use(expressWinston.logger(HttpLogger()));

// routes

app.use(config.api.AdminPrefix, AdminRoutes);

app.use(config.api.prefix, PatientRoutes);

// Error 404 handler
app.use((req, res) => {
  res.send("not found");
});

module.exports = app;

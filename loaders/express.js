const express = require("express");
const expressWinston = require("express-winston");
const cors = require("cors");
const session = require("express-session");
const { errors } = require("celebrate");
const bodyParser = require("body-parser");
const AdminRoutes = require("../api/routes/admin");
const PatientRoutes = require("../api/routes/patient");
const AdminAuthRoutes = require("../api/routes/auth");
const config = require("../config/index");
const HttpLogger = require("../api/middleware/index");
const sessionStore = require("../loaders/sessionStore");
const mailer = require('../services/mailer');
const app = express();

// cors
app.use(cors());

// bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(
  session({
    secret: config.sessionSecret,
    resave: false,
    saveUninitialized: false,
    cookie:{
     httpOnly:true,

    },
    store: sessionStore
  })
);

// http logger
app.use(expressWinston.logger(HttpLogger()));

//  health checks
// GET
app.get("/status", (req, res) => {
  res.status(200).json("working");
  mailer.sendWelcome();
});

// routes
app.use(config.api.AdminPrefix, AdminAuthRoutes);
app.use(config.api.AdminPrefix, AdminRoutes);

app.use(config.api.prefix, PatientRoutes);
app.use(errors())

//Each 404 send to Omnipotent error handler
app.use((req, res, next) => {
  const error = new Error("Not found");
  error.status = 404;
  next(error);
});

// Omnipotent error handler
app.use((error, res) => {
  res.status(error.status || 500).json({
    error: {
      status: error.status || 500,
      message: error.message || "Internal server error"
    }
  });
});
module.exports = app;

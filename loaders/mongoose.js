const mongoose = require("mongoose");
const config = require("../config/index");
const mongooseLog = require("../loaders/logger").mongooseLogger;

module.exports = () => {
  mongoose.connect(config.databaseURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

  mongoose.connection.on("open", () => {
    mongooseLog.info(`connection opened on ${config.databaseURL}`);
  });
  mongoose.connection.on("error", () => {
    mongooseLog.error(`connection error on ${config.databaseURL}`);
  });
  mongoose.connection.on("close", () => {
    mongooseLog.warn(`connection closed on ${config.databaseURL}`);
  });
};

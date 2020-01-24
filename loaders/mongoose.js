const mongoose = require("mongoose");
const config = require("../config/index");
const logger = require("../loaders/logger");

module.exports = () => {
  mongoose.connect(config.databaseURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

  mongoose.connection.on("open", () => {
    logger.info(`connection opened on ${config.databaseURL}`);
  });
  mongoose.connection.on("error", () => {
    logger.error(`connection error on ${config.databaseURL}`);
  });
  mongoose.connection.on("close", () => {
    logger.info(`connection closed on ${config.databaseURL}`);
  });
};

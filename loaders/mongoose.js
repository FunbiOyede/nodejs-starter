const mongoose = require("mongoose");
const config = require("../config/index");

module.exports = () => {
  mongoose.connect(config.databaseURL, {
    useUnifiedTopology: true,
    useNewUrlParser: true
  });

  mongoose.connection.on("open", () => {
    console.log(`connection opened on ${config.databaseURL}`);
  });
  mongoose.connection.on("error", () => {
    console.log(`connection error on ${config.databaseURL}`);
  });
  mongoose.connection.on("close", () => {
    console.log(`connection closed on ${config.databaseURL}`);
  });
};

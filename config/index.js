const dotenv = require("dotenv");
dotenv.config();
process.env.NODE_ENV = process.env.NODE_ENV || "developement";

module.exports = {
  port: process.env.PORT,
  databaseURL:
    process.env.MONGO_URI || "mongodb://localhost:27017/ExampleHealth",
  api: {
    prefix: "/api"
  }
};

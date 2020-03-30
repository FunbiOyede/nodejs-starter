const dotenv = require("dotenv");
dotenv.config();
process.env.NODE_ENV = process.env.NODE_ENV || "development";

module.exports = {
  port: process.env.PORT,
  sessionSecret:process.env.SESSION_SECRET,
  databaseURL:
    process.env.MONGO_URI || "mongodb://localhost:27017/ExampleHealth",
  api: {
    AdminPrefix: "/api/admin",
    prefix: "/api"
  }
};

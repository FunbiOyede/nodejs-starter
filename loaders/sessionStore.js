const session = require("express-session");
const MongoSessionStore = require("connect-mongodb-session")(session);
const config = require("../config/index");
const store = new MongoSessionStore({
  uri: config.databaseURL,
  collection: "session"
});

module.exports = store;

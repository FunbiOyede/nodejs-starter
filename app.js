const Server = require("./loaders/express");
const config = require("./config/index");

const server = new Server(config.port)

server.startServer()
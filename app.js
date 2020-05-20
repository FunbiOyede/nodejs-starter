const app = require("./loaders/express");
require("./loaders/mongoose")();
const config = require("./config/index");
const http = require("http");
const serverLog = require("./loaders/logger").serverLogger;
const {start} = require('./loaders/redis');

const server = http.createServer(app);

server.listen(config.port, err => {
  if (err) {
    serverLog.error(err);
    process.exit(1);
   
  }
   start();
  serverLog.info(`
       **********************************************
        Server listening on port: ${config.port}
       **********************************************
    `);
});

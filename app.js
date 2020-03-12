const app = require("./loaders/express");
require("./loaders/mongoose")();
const config = require("./config/index");
const http = require("http");
const serverLog = require("./loaders/logger").serverLogger;

const server = http.createServer(app);

server.listen(config.port, err => {
  if (err) {
    process.exit(1);
    serverLog.error(err);
  }
  
  serverLog.info(`
       **********************************************
       🌋 Server listening on port: ${config.port}🌋
       **********************************************
    `);
});

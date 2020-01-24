const app = require("./loaders/express");
require("./loaders/mongoose")();
const config = require("./config/index");
const http = require("http");
const logger = require("./loaders/logger");

const server = http.createServer(app);

server.listen(config.port, err => {
  if (err) {
    process.exit(1);
    logger.error(err);
  }
  logger.info(`
       **********************************************
       🌋 Server listening on port: ${config.port}🌋
       **********************************************
    `);
});

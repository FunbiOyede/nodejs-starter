const winston = require("winston");
const { timestamp, splat, cli, combine } = winston.format;

const logger = winston.createLogger({
  level: "info",
  format: combine(timestamp(), splat(), cli()),
  transports: [new winston.transports.Console()]
});
module.exports = logger;

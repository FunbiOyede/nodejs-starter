const winston = require("winston");
const { timestamp, combine, printf, label } = winston.format;

/**
 *
 * @function loggerConfigurator
 * @description general configurator for all areas
 * @param {string} area area where the logger is to be used E.g. Mongoose, Server.
 * @returns {object} logging configurations containing transports, formats.
 *
 */
const loggerConfigurator = area => {
  return {
    level: "info",
    format: combine(
      label({
        label: area
      }),
      timestamp(),
      printf(info => {
        return `  ${info.timestamp} - ${info.label}:[${info.level}]: ${info.message}  `;
      })
    ),
    transports: [
      new winston.transports.Console(),
      new winston.transports.File({ filename: "app.log" })
    ]
  };
};

// areas where logging is to be used
const MONGOOSE = "mongoose";
const SERVER = "server";
const RESPONSE = "response";

// adding to the winston.loggers instance
winston.loggers.add(MONGOOSE, loggerConfigurator(MONGOOSE));
winston.loggers.add(SERVER, loggerConfigurator(SERVER));
winston.loggers.add(RESPONSE, loggerConfigurator(RESPONSE));
// getting it by areas or category name and exporting to use in different areas
module.exports.mongooseLogger = winston.loggers.get(MONGOOSE);
module.exports.serverLogger = winston.loggers.get(SERVER);
module.exports.responseLogger = winston.loggers.get(RESPONSE);

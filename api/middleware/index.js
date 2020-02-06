const winston = require("winston");
const { timestamp, combine, printf, label } = winston.format;

const transport = [];

if (process.env.NODE_ENV !== "production") {
  transport.push(new winston.transports.Console());
} else {
  transport.push(new winston.transports.File({ filename: "http.log" }));
}

/**
 * @function HttpLogger
 * @description  logger for express routes
 * @returns {object} logging configurations containing transports, formats.
 */

const HttpLogger = () => {
  return {
    transports: transport,
    level: "info",
    format: combine(
      label({
        label: "HTTP Requests"
      }),
      timestamp(),
      printf(info => {
        return `  ${info.timestamp} - ${info.label}:[${info.level}] - ${info.message}  `;
      })
    ),
    msg:
      "method={{req.method}}, route={{req.url}}, code={{res.statusCode}}, response-time={{res.responseTime}}ms"
  };
};

module.exports = HttpLogger;

const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 30 * 60 * 1000, //30 minutes
    max:100
})

module.exports = limiter
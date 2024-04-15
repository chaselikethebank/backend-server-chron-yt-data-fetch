const rateLimit = require("express-rate-limit");

// Define rate limiter options
const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 100, // 100 requests per minute
    message: "Too many requests from this IP, please try again later.",
});

module.exports = limiter;

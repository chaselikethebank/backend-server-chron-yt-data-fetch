// corsMiddleware.js

const cors = require("cors");

// Define CORS options
const corsOptions = {
  origin: "http://localhost:3000", // Update with your allowed origin
};

// Export CORS middleware
module.exports = cors(corsOptions);

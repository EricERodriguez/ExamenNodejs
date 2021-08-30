const cors = require("cors");

const corsOptions = {
  origin: ["https://example3.com"],
  optionsSuccessStatus: 200,
};

module.exports = cors(corsOptions);
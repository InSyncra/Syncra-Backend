module.exports = {
  environment: process.env.NODE_ENV || "development",
  port: process.env.PORT,
  url: process.env.SERVER_URL || `http://localhost:${process.env.PORT}`,
};

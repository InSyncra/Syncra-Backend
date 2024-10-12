module.exports = {
  environment: process.env.NODE_ENV || "development",
  port: process.env.PORT || 8000,
  frontendUrl: process.env.FRONTEND_URL || "http://localhost:5173",
  sessionSecret: process.env.SESSION_SECRET
};

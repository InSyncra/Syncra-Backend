// config file to read, load, and export environment variables
export default {
  dbConfig: process.env.DB_FILE,
  port: process.env.PORT,
  environment: process.env.NODE_ENV || "development",
};

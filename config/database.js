import { default as config } from "./index";
export default {
  development: {
    dialect: "sqlite",
    storage: config.dbConfig,
    logging: false,
  },
  production: {
    username: "root",
    password: null,
    database: "database_production",
    host: "127.0.0.1",
    dialect: "mysql",
  },
};

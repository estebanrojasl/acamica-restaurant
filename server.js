const ENV = process.env.NODE_ENV || "development";
const express = require("express");
const { config } = require("./config/environments/" + ENV);
const routes = require("./config/routes");
const mySqlSequelize = require("./config/database/mysql-db");

const server = express();

mySqlSequelize.initDatabase();

server.use("/api/v1/larissa", routes.initApiRoutes());

server.listen(config.Port, () => {
  console.log(`Server listening at ${config.Port}`);
});

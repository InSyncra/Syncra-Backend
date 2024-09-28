const routes = require("express").Router();
const apiRouter = require("./api");
const webhookRouter = require("./webhook");

routes.use("/api/v1", apiRouter);
routes.use("/api/webhooks/v1", webhookRouter);

module.exports = routes;

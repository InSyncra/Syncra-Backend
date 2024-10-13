const apiRouter = require("express").Router();
const sessionRouter = require("./auth");

apiRouter.use("/auth", sessionRouter);

module.exports = apiRouter;

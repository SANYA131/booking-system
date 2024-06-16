const { Router } = require("express");

const slots = require("./slots");
const event = require("./event");

const ApiRouter = Router();

ApiRouter.use("/slots", slots);
ApiRouter.use("/event", event);

module.exports = ApiRouter;

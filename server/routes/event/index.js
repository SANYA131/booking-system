const express = require("express");
const createEvent = require("./createEvent/api");
const getEvents = require("./getEvents/api");

const router = express.Router();

router.post("/createEvent", createEvent);
router.get("/getEvents", getEvents);

module.exports = router;

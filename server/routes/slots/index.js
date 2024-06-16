const express = require("express");
const listAvailableSlots = require("./listAvailableSlots/api");

const router = express.Router();

router.get("/listAvailableSlots", listAvailableSlots);

module.exports = router;

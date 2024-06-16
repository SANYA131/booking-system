const moment = require("moment-timezone");
const {
  generateTimeSlotsInUTC,
  convertSlotsToTimeZone,
} = require("../../../../utils/constants");
const { getEvents } = require("../../../model/event");

async function listAvailableSlots(req, res, next) {
  try {
    const { date, timeZone } = req.query;
    const db = req.db;

    if (!date || !timeZone) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const utcSlots = generateTimeSlotsInUTC({ date });

    const snapshot = await getEvents();
    const bookedSlots = snapshot.docs.map((doc) => doc.data());

    const freeSlots = utcSlots.filter((slot) => {
      const slotMoment = moment.utc(slot).valueOf();
      return !bookedSlots.some((event) => {
        const eventStart = event.startDateTimeStamp;
        const eventEnd = event.endDateTimeStamp;
        return slotMoment >= eventStart && slotMoment < eventEnd;
      });
    });

    const freeSlotsInTimeZone = convertSlotsToTimeZone(freeSlots, timeZone);

    res
      .status(200)
      .send({ data: freeSlotsInTimeZone, message: "AVAILABLE_SLOTS_FETCHED" });
  } catch (error) {
    console.error("Error getting free slots:", error);
    return next(error);
  }
}

module.exports = listAvailableSlots;

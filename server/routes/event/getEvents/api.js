const moment = require("moment-timezone");
const { getEventsBetweenTimeStamp } = require("../../../model/event");
const { defaultTimeZone } = require("../../../../utils/constants");

async function getEvents(req, res, next) {
  try {
    const { startDate, endDate } = req.query;

    if (!startDate || !endDate) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const startDateTime = moment
      .tz(startDate, defaultTimeZone)
      .startOf("day")
      .utc()
      .valueOf();
    const endDateTime = moment
      .tz(endDate, defaultTimeZone)
      .endOf("day")
      .utc()
      .valueOf();

    const snapshot = await getEventsBetweenTimeStamp({
      startDateTime,
      endDateTime,
    });

    const events = snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    res.status(200).send({ data: events, message: "EVENTS_FETCHED" });
  } catch (error) {
    console.error("Error getting events:", error);
    return next(error);
  }
}

module.exports = getEvents;

const moment = require("moment-timezone");
const { convertTimeToSourceUTC } = require("../../../../utils/constants");
const { addEvent, getEventsBetweenTimeStamp } = require("../../../model/event");

async function createEvent(req, res, next) {
  try {
    const { dateTime, duration = 30, timeZone } = req.body;

    if (!dateTime || !timeZone) {
      return res.status(400).json({ message: "Invalid request data" });
    }

    const startDateTime = moment(
      convertTimeToSourceUTC(dateTime, timeZone)
    ).valueOf();
    const endDateTime = moment
      .tz(dateTime, timeZone)
      .add(duration, "minutes")
      .utc()
      .valueOf();

    const snapshot = await getEventsBetweenTimeStamp({
      startDateTime,
      endDateTime,
    });

    if (!snapshot.empty) {
      return res.status(422).json({ message: "Slot already booked" });
    }

    const event = {
      startDateTimeStamp: startDateTime,
      endDateTimeStamp: endDateTime,
      timeZone,
    };

    await addEvent({ data: event });
    res.status(200).send({ message: "Event created successfully" });
  } catch (error) {
    console.error("Error creating event:", error);
    return next(error);
  }
}

module.exports = createEvent;

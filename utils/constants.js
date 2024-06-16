const moment = require("moment-timezone");

const startHour = 10; // Start time in hours
const endHour = 17; // End time in hours
const slotDuration = 30; // Duration of each slot in minutes
const defaultTimeZone = "America/Los_Angeles";

const convertTimeToSourceUTC = (dateTime, timeZone = defaultTimeZone) => {
  return moment.tz(dateTime, timeZone).utc();
};

const convertSlotsToTimeZone = (slots, timeZone) => {
  return slots.map((slot) =>
    moment.utc(slot).tz(timeZone).format("YYYY-MM-DDTHH:mm:ss")
  );
};

function generateTimeSlotsInUTC({ date }) {
  const slots = [];

  const startDateTime = `${date}T${startHour}:00:00`;
  const endDateTime = `${date}T${endHour}:00:00`;

  const currentTime = convertTimeToSourceUTC(startDateTime);
  const endTime = convertTimeToSourceUTC(endDateTime);

  while (currentTime < endTime) {
    slots.push(currentTime.format("YYYY-MM-DDTHH:mm:ss"));
    currentTime.add(slotDuration, "minutes");
  }

  return slots;
}

module.exports = {
  convertTimeToSourceUTC,
  startHour,
  endHour,
  slotDuration,
  defaultTimeZone,
  convertSlotsToTimeZone,
  generateTimeSlotsInUTC,
};

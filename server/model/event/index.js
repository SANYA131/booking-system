const { query } = require("express");
const db = require("../../../firebase");

const eventsCollection = db.collection("events");

async function getEvents() {
  return await eventsCollection.get();
}

async function getEventsBetweenTimeStamp({ startDateTime, endDateTime }) {
  return await eventsCollection
    .where("startDateTimeStamp", ">=", startDateTime)
    .where("endDateTimeStamp", "<=", endDateTime)
    .get();
}

async function addEvent({ data }) {
  try {
    await eventsCollection.add(data);
  } catch (err) {
    return Promise.reject(err);
  }
}

module.exports = {
  addEvent,
  getEventsBetweenTimeStamp,
  getEvents,
  eventsCollection,
};

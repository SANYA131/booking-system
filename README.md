# booking-system

This is a booking system API built using Node.js, Express, and Firebase Firestore. The API allows users to create events, retrieve available time slots, and fetch events within a given date range.

## Table of Contents

- [Installation](#installation)
- [Configuration](#configuration)
- [Endpoints](#endpoints)
  - [Create Event](#create-event)
  - [Get Free Slots](#get-free-slots)
  - [Get Events](#get-events)


## Installation

1. Clone the repository:
   git clone ->  https://github.com/SANYA131/booking-system.git
   
2. Navigate to the project directory:
   cd booking-system
3. Install the dependencies:
   npm install
4. Set up your environment variables by creating a .env file in the root directory
  
## Configuration
Ensure that you have enabled the Firestore API in your Firebase project. Visit the Firebase Console and enable the Firestore API for your project.

## Endpoints
1. Create Event - 
      URL: /booking/event/createEvent
      Method: POST
      Params:
        dateTime (String, required): The start date and time of the event in ISO format (e.g., 2024-06-15T10:00:00).
        duration (Number, required): The duration of the event in minutes.
        timeZone (String, optional): The ID of the user creating the event.
      Response:
        200 OK: Event created successfully.
        422 Unprocessable Entity: Slot already booked.
        500 Internal Server Error: An error occurred while creating the event.
2. Get Free Slots
      URL: /booking/slots/listAvailableSlots
      Method: GET
      Params:
      date (String, required): The date for which to retrieve free slots (e.g., 2024-06-15).
      timeZone (String, required): The time zone to consider (e.g., America/New_York).
      Response:
        200 OK: An array of available time slots in that timezone.
        400 Bad Request: Invalid request data.
        500 Internal Server Error: An error occurred while retrieving free slots.
3. Get Events
        URL: /booking/get-events
        Method: GET
        Params:
        startDate (String, required): The start date to filter events (e.g., 2024-06-15).
        endDate (String, required): The end date to filter events (e.g., 2024-06-16).
        Response:
          200 OK: An array of events within the given date range.
          400 Bad Request: Invalid request data.
          500 Internal Server Error: An error occurred while retrieving events.



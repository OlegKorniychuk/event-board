const fs = require('fs');
const dotenv = require('dotenv');
const Event = require('../src/models/eventModel');

const mongoose = require('mongoose');

dotenv.config({ path: '.env' });

const EVENT_COUNT = 100;
const MAX_DATE_RANGE = 300;
const eventExample = fs.readFileSync(`${__dirname}/eventExample.json`, { encoding: 'utf-8' });

const importData = async (events) => {
  try {
    await Event.create(events);
    console.log(`${events.length} events uploaded`);
    process.exit();
  } catch (err) {
    console.log(err);
  }
}


const DB = process.env.MONGO_DB_CONNECTION.replace(
  'PASSWORD',
  process.env.MONGO_DB_PASSWORD,
);
mongoose
  .connect(DB)
  .then(() => {
    console.log('DB connection successful');
    const events = [];

    for (i = 1; i <= EVENT_COUNT; i++) {
      const event = JSON.parse(eventExample);
      event.title = event.title + i;
      event.description = event.description + i;
      let date = new Date(event.date);
      date.setDate(date.getDate() + Math.floor(Math.random() * MAX_DATE_RANGE) + 1)
      event.date = date.toISOString();
      event.organizer = event.organizer + i;

      events.push(event);
    }
    importData(events);
  })
  .catch((err) => {
    console.log('Could not connect to the database');
    console.log(err.message);
  });

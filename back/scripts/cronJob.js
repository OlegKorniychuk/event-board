const path = require('path');
const dotenv = require('dotenv');
const { getJson } = require('serpapi');
const Event = require('../src/models/eventModel');

dotenv.config({ path: path.join(__dirname, '../.env') });

const runJob = async () => {
  console.log("Cron job started");
  try {
    let eventsArray = [];
    
    for (let i = 0; i < 40; i+=10) {
      const response = await getJson({
        engine: "google_events",
        q: "Events in Chicago",
        hl: "en",
        gl: "us",
        start: i,
        api_key: process.env.EVENTS_API_KEY
      })
  
      if (response?.search_metadata?.status !== 'Success') {
        console.log(response)
        throw new Error(`Bad response status: ${response.search_metadata.status}`);
      }
  
      if (!response.events_results) {
        console.log(response);
        throw new Error(`No events received`);
      }
  
      const events = response?.events_results
      
      const preparedEvents = events.map((event) => ({
        title: event.title,
        description: event?.description?.toString().substring(0, 40)?.trim() + '...',
        date: event.date.start_date,
        organizer: event.venue?.name || `Event Organizer ${i}`
      }));
  
      eventsArray = [...eventsArray, ...preparedEvents];
      console.log(`${i} objects ready`);
    }

    await Event.create(eventsArray);
    console.log(`${eventsArray.length} events uploaded`);
  } catch(err) {
    console.log(err);
  }
}


module.exports = runJob;
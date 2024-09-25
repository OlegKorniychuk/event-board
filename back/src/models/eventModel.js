const mongoose = require('mongoose');

const participantSchema = new mongoose.Schema({
  full_name: {
    type: String,
    required: [true, "Please, enter your full name"],
    trim: true,
  },
  email: {
    type: String,
    required: [true, "Please, enter your email"],
    trim: true,
  },
  date_of_birth: {
    type: Date,
    required: [true, "Please, enter your date of birth"],
  },
  where_heard: {
    type: String,
    required: [true, "Please, tell us how did you learn about this event"],
    enum: ["Social Media", "Friends", "Found Myself", "Other"]
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: [true, "No title provided"],
    trim: true,
  },
  description: {
    type: String,
    required: [true, "No description provided"],
    trim: true,
  },
  date: {
    type: Date,
    required: [true, "No date provided"],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
  organizer: {
    type: String,
    required: [true, "No organizer provided"],
    trim: true,
  },
  participants: [participantSchema]
});

const Event = mongoose.model('Event', eventSchema);

module.exports = Event;

const mongoose = require('mongoose');
const Event = require('../models/eventModel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.createEvent = catchAsync(async (req, res, next) => {
  const newEvent = await Event.create(req.body);

  res.status(200).json({
    status: "success",
    data: {
      newEvent: newEvent
    }
  });
});

exports.getAllEvents = catchAsync(async (req, res, next) => {
  let query = Event.find();

  //Sort
  if (req.query.sort) {
    const sortBy = req.query.sort.replaceAll(',', ' ');
    query = query.sort(sortBy);
  } else {
    query = query.sort('-createdAt');
  }

  //Limit Fields
  if (req.query.fields) {
    const fields = req.query.fields.replaceAll(',', ' ');
    query = query.select(fields);
  } else {
    query = query.select('-__v -participants');
  }

  // Paginate
  const page = req.query.page * 1 || 1;
  const limit = req.query.limit * 1 ||  20;
  const skip = (page - 1) * limit;
  query = query.skip(skip).limit(limit);

  const events = await query;
  const totalCount = await Event.countDocuments();
  res.status(200).json({
    status: "succes",
    results: events.length,
    totalCount: totalCount,
    data: {
      events: events,
    },
  });
});

exports.getEvent = catchAsync(async (req, res, next) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    return next(new AppError('Event with this ID could not be found', 404));
  }

  res.status(200).json({
    status: "success",
    data: {
      event: event,
    },
  });
});

exports.registerForEvent = catchAsync(async (req, res, next) => {
  const updatedEvent = await Event.findOneAndUpdate(
    { _id: req.params.id },
    { $push: { participants: req.body } },
    { 
      new: true,
      runValidators: true,
    }
  );

  if (!updatedEvent) {
    return next(new AppError('Event with this ID could not be found', 404));
  };

  res.status(200).json({
    status: "success",
    data: {
      event: updatedEvent
    }
  });
});

exports.getRegistrationStats = catchAsync(async (req, res, next) => {
  const registrations = await Event.aggregate([
    {
      $match: { _id: mongoose.Types.ObjectId.createFromHexString(req.params.id) },
    },
    {
      $unwind: "$participants",
    },
    {
      $group: {
        _id: {
          $dateToString: { format: "%Y-%m-%d", date: "$participants.createdAt" }
        },
        totalRegistrations: { $sum: 1 },
      },
    },
    {
      $project: {
        _id: 0,
        date: "$_id",
        totalRegistrations: 1,
      }
    },
    {
      $sort: { "date": 1 },
    },
  ]);

  res.status(200).json({
    status: "success",
    data: {
      registrationsPerDay: registrations,
    },
  });
});
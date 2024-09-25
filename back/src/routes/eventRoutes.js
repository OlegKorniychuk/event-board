const express = require('express');
const eventController = require('../controllers/eventController.js');

const router = new express.Router();

router.route('/')
  .get(eventController.getAllEvents);

router.route('/:id')
  .get(eventController.getEvent);

router.route('/:id/register')
  .patch(eventController.registerForEvent);


module.exports = router;

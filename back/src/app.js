const express = require('express');

const app = express();

app.get('/', (req, res) => {
  res.json({
    status: "success",
    data: {
      message: "Test",
    },
  });
})

module.exports = app;
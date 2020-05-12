/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');

const host = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;

// Server Connection
const app = express();
app.listen(process.env.SERVER_PORT, (err) => {
  if (err) {
    console.log('Error starting up server');
  } else {
    console.log(`Server now hosted on http://${host}:${port}`);
  }
});

app.use(express.static('public'));
app.use(express.urlencoded());

// HTTP Handlers
// app.route('/:id')
//   .get((req, res, next) {

//   })

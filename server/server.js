/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const host = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;
const app = express();

// Middleware
app.use(createProxyMiddleware(`http://${host}:9800/api/photos`, {
  changeOrigin: true,
  router: {
    'http://localhost:9800': 'http://localhost:9000'
  }
}));
app.use(express.static('public'));
app.use(express.urlencoded());

app.listen(process.env.SERVER_PORT, (err) => {
  if (err) {
    console.log('Error starting up server');
  } else {
    console.log(`Server now hosted on http://${host}:${port}`);
  }
});


// HTTP Handlers
app.get('/api/photos/:id', (req, res, next) => {
  res.redirect(`http://${host}:9800/?${req.params.id}`);
  next();
});

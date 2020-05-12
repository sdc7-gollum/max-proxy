/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const host = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;
const app = express();

// Middleware
app.use(createProxyMiddleware(`http://${host}:9800/api/photos`, { changeOrigin: true }));
app.use(createProxyMiddleware(`http://${host}:9006/api/description`, { changeOrigin: true }));
app.use(createProxyMiddleware(`http://${host}:9006/api/place`, { changeOrigin: true }));
app.use(createProxyMiddleware(`http://${host}:9802/api/room`, { changeOrigin: true }));
app.use(createProxyMiddleware(`http://${host}:9803/api/ratings`, { changeOrigin: true }));
app.use(createProxyMiddleware(`http://${host}:9803/api/reviews`, { changeOrigin: true }));
app.use(express.static('public'));
app.use(express.urlencoded());

app.listen(process.env.SERVER_PORT, (err) => {
  if (err) {
    console.log('Error starting up server');
  } else {
    console.log(`Server now hosted on http://${host}:${port}`);
  }
});

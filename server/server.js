/* eslint-disable no-console */
require('dotenv').config();
const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');

const host = process.env.SERVER_HOST;
const port = process.env.SERVER_PORT;
const app = express();

const photosPort =  process.env.photosPort || 9800;
const descPort = process.env.descPort || 9006;
const resPort = process.env.resPort || 9802;
const reviewsPort = process.env.reviewsPort || 9803;

// Middleware
app.use(createProxyMiddleware(`http://${host}:${photosPort}/api/photos`, { changeOrigin: true }));
app.use(createProxyMiddleware(`http://${host}:${descPort}/api/description`, { changeOrigin: true }));
app.use(createProxyMiddleware(`http://${host}:${descPort}/api/place`, { changeOrigin: true }));
app.use(createProxyMiddleware(`http://${host}:${resPort}/api/room`, { changeOrigin: true }));
app.use(createProxyMiddleware(`http://${host}:${reviewsPort}/api/ratings`, { changeOrigin: true }));
app.use(createProxyMiddleware(`http://${host}:${reviewsPort}/api/reviews`, { changeOrigin: true }));
app.use(express.static('public'));
app.use(express.urlencoded());

app.listen(process.env.SERVER_PORT, (err) => {
  if (err) {
    console.log('Error starting up server');
  } else {
    console.log(`Server now hosted on http://${host}:${port}`);
  }
});

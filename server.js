require('dotenv').config();
const express = require("express");
const app = express();
const router = require("./router/auth-router");
const connectDb = require("./utils/db");

app.use(express.json());
// This line of code adds Express middleware that parses incoming
// requests bodies with JSON payloads.It's important to place this before
// any routes that need to handle JSON data in the request body. This
// middleware is responsible for parsing JSON data from requests, and it should be
// applies at the beginning of your middleware stack to ensure it's available
// fo rall subsequent route handlers.

app.use("/api/auth", router);
//Mount the Router: To use the router in your main Express app, you can "mount"
// it at a specific URL prefix

const PORT = 5000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
  });
});

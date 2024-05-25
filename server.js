require("dotenv").config();
const express = require("express");
const cors = require("cors");
const app = express();
const authRoute = require("./router/auth-router");
const contactRoute = require("./router/contact-router");
const connectDb = require("./utils/db");
const errorMiddleWare = require("./middlewares/error-middleware");

// lets tackle cors policy error
const corsOptions = {
  origin: "http://localhost:5173",
  methods: "GET, POST, PUT, DELETE, PATCH, HEAD",
  credentials: true,
};

app.use(cors(corsOptions));

app.use(express.json());
// This line of code adds Express middleware that parses incoming
// requests bodies with JSON payloads.It's important to place this before
// any routes that need to handle JSON data in the request body. This
// middleware is responsible for parsing JSON data from requests, and it should be
// applies at the beginning of your middleware stack to ensure it's available
// fo rall subsequent route handlers.

app.use("/api/auth", authRoute);
//Mount the Router: To use the router in your main Express app, you can "mount"
// it at a specific URL prefix

app.use("/api/form", contactRoute);

app.use(errorMiddleWare);

const PORT = 5000;
connectDb().then(() => {
  app.listen(PORT, () => {
    console.log(`server is running at port ${PORT}`);
  });
});

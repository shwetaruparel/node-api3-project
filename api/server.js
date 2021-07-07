const express = require('express');
 const userRouter = require('./users/users-router')

const server = express();

// remember express by default cannot parse JSON in request bodies
server.use(express.json());

// global middlewares and the user's router need to be connected here
const {
  logger,
  errorHandling
} = require("./middleware/middleware");

server.use("/api/users", logger, userRouter);
//server.use("/api/users",userRouter);

server.get('/', (req, res) => {
  res.send(`<h2>Let's write some middleware!</h2>`);
});

// you just do this here at the end of the pipeline
server.use(errorHandling);

module.exports = server;

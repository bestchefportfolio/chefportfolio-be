const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// local imports

const server = express();
server.use(express.json());
server.use(helmet());
server.use(cors());

// routes

// test end point

server.get("/", (req, res) =>
  res.status(200).send("<h1>The server is up and running! <3 ☺</h1>")
);

module.exports = server;

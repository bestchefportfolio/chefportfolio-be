const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

// local imports
const authRouter = require("./routes/auth/router.js");

const server = express();
server.use(helmet());
server.use(cors());
server.use(express.json());

// routes
server.use("/", authRouter);



// test end point
server.get("/", (req, res) =>
  res.status(200).send("<h1>The server is up and running! <3 ☺</h1>")
);

module.exports = server;

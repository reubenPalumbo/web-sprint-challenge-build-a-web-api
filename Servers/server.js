const express = require("express");

const action = require("./actionAPI");
const projects = require("./projectsAPI");

const server = express();

server.use("/", action);
server.use("/", projects);

module.exports = server;

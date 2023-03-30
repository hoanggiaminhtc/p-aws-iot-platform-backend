const express = require("express");
const { getListTopics, addTopic } = require("../Controllers/mqttController");
const { verifyToken } = require("../Middlewares/verifyToken");
const Router = express.Router();

Router.get("/getall", verifyToken, getListTopics);
Router.post("/addtopic", verifyToken, addTopic);

module.exports = Router;

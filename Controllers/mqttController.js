const mqtt = require("mqtt");
const Topic = require("../models/Topic");
const logger = require("../AppLog/logger");
var options = {
  host: "645074f05ae34d8480922ca276b085d8.s1.eu.hivemq.cloud",
  port: 8883,
  protocol: "mqtts",
  username: "thaibui",
  password: "1234567890",
};
const Telemetry = require("../models/Telemetry");
//initialize the MQTT client
const client = mqtt.connect(options);
// const client = mqtt.connect("mqtt://localhost:1883");
//set up the callbacks
client.on("connect", function () {
  logger.info(`MQTT connected`)
});
client.on("error", function (error) {
  logger.error(`MQTT connect failed: ${error}`)
});
Topic.find({})
  .then((data) => {
    data.forEach((data) => {
      client.subscribe(data._id.toString());
    });
  })
  .catch((err) => {});
client.on("message", async function (topic, message) {
  logger.info(`Received Topic: ${topic} - Recevied mesage: ${message.toString()}`)
  const data = await Telemetry.create({ topic: topic, value: message });
});

exports.getListTopics = async (req, res, next) => {
  try {
    const listTopic = await Topic.find({ idUser: req.body.userId });
    res.status(200).json({ status: "success", topics: listTopic });
    logger.info(`Get List Topics successfully", "userId": "${req.body.userId}`);
  } catch (error) {
    logger.error(`Get List Topics fail", \"userId\": \"${req.body.userId}\", \"ERROR\": \"${error}`);
    next(error);
  }
};

exports.addTopic = async (req, res, next) => {
  try {
    const topic = await Topic.create({ ...req.body });
    client.subscribe(topic._id.toString());
    res.status(200).json({
      status: "success",
      data: topic._id,
    });
    logger.info(`Add Topics successfully", "userId": "${req.body.userId}", "TopicId" : "${topic._id}`);
  } catch (error) {
    logger.error(`Get List Topics fail", \"userId\": \"${req.body.userId}\", \"ERROR\": \"${error}`);
    next(error);
  }
};

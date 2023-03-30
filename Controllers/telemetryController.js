const Telemetry = require('../models/Telemetry');
const mqtt = require('mqtt');
const Topic = require('../models/Topic');
const logger = require("../AppLog/logger");
const client = mqtt.connect('');
exports.getAllData = async (req, res, next) => {
    await Telemetry.find({})
        .then((telemetry) => {
            res.status(200).json({ 
                status: "success",
                data: {telemetry},
            });
            logger.info(`Get All Data telemetry successfully", "userId": "${req.body.userId}`);
        })
        .catch (err => {
            logger.error(`Get All Data telemetry fail", "userId": "${req.body.userId}", "ERROR": "${err}`);
            next(err)
    })
};
exports.getDeviceData = async (req, res, next) => {
    await Telemetry.find({deviceId:req.params.deviceId})
        .then((telemetry) => {
            res.status(200).json({ 
                status: "success",
                data: {telemetry},
            });
            logger.info(`Get data device successfully", "userId": "${req.body.userId}", "deviceId": "${req.params.deviceId}`);
        })
        .catch (err => {
            logger.error(`Get data device fail", "userId": "${req.body.userId}", "ERROR": "${err}`);
            next(err)
    })
};
exports.getDatalastnday = async (req, res, next) => {
  await Telemetry.find({
    topic: req.query.topic,
    createdAt: { $gte: new Date(new Date().getTime() - req.query.date) },
  })
    .sort({ createdAt: -1 })
    .then((telemetry) => {
      res.status(200).json({
        status: "success",
        data: { telemetry },
      });
      logger.info(`Get data last some days successfully", "userId": "${req.body.userId}", "deviceId": "${req.params.deviceId}`);

    })
    .catch((err) => {
      logger.error(`Get data last some days fail", "userId": "${req.body.userId}", "ERROR": "${err}`);
      next(err);
    });
};

exports.deleteTopicAndUnsubscribe = async (req, res, next) => {
    try {
        const {deviceId} = req.params;
        const top = await Topic.find({deviceId:deviceId});
        for (let i = 0; i < top.length; i++) {
            client.unsubscribe(top[i]._id.toString());
            await Telemetry.deleteMany({topic:top[i].topic});
        }
        await Topic.deleteMany({deviceId:deviceId});
        logger.info(`delete Topic And Unsubscribe successfully", "userId": "${req.body.userId}", "deviceId": "${deviceId}`)
        next();
    } catch (error) {
        logger.error(`delete Topic And Unsubscribe fail", "userId": "${req.body.userId}", "ERROR": "${error}`);
        next(error);
    }
};

exports.getTopicData = async (req, res, next) => {
  try {
    const telemetry = await Telemetry.find({ topic: req.params.topicId })
      .limit(5)
      .sort({ _id: -1 });

    res.status(200).json({
      status: "success",
      data: telemetry.length === 0 ? 0 : { telemetry },
    });
    logger.info(`Get Topic Data successfully", "userId": "${req.body.userId}", "topicId": "${req.params.topicId}`);
  } catch (error) {
    logger.error(`Get Topic Data fail", "userId": "${req.body.userId}", "ERROR": "${error}`);
    next(error);
  }
};
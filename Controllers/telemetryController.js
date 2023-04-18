const Telemetry = require('../models/Telemetry');
const logger = require("../AppLog/logger");
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
        deviceId: req.query.deviceId,
        createdAt: { $gte: new Date(new Date().getTime() - Number(req.query.date)) },
    })
        .sort({ createdAt: -1 })
        .then((telemetry) => {
            res.status(200).json({
                status: "success",
                data: { telemetry },
            });
            logger.info(`get Data last n days successfully", "userId": "${req.body.userId}", "deviceId": "${req.params.deviceId}`);
        })
        .catch((err) => {
            logger.error(`get Data last n days fail", "userId": "${req.body.userId}", "ERROR": "${err}`);
            next(err);
        });
};

exports.getlastDeviceData = async (req, res, next) => {
    try {
        const telemetry = await Telemetry.find({ deviceId: req.params.deviceId })
            .limit(1)
            .sort({ _id: -1 });
        res.status(200).json({
            status: "success",
            data: telemetry.length === 0 ? 0 : { telemetry },
        });
        logger.info(`Get last DeviceData successfully", "userId": "${req.body.userId}", "deviceId": "${req.params.deviceId}`);
    } catch (error) {
        logger.error(`Get last DeviceData device fail", "userId": "${req.body.userId}", "ERROR": "${err}`);
        next(error);
    }
};
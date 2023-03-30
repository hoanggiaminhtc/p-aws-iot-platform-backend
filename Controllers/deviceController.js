const Device = require("../models/Device");
const Topic = require("../models/Topic");
const logger = require("../AppLog/logger");
exports.getAlldevice = async (req, res, next) => {
  const userId = req.body.userId;
  await Device.find({ userid: userId }) 
    .then(device => {
      res.status(200).json({
        status: "success",
        data: { device },
      });
      logger.info(`Get all device successfully", \"userId\": \"${req.body.userId}`);
    })
    .catch(err => {
      logger.error(`Get all device fail", \"userId\": \"${req.body.userId}\",\"ERROR\": \"${err}`);
      next(err);
    })
};

exports.getOnedevice = async (req, res) => {
  try {
    const topic = await Topic.find({ deviceId: req.params.deviceId });
    const device = await Device.findById(req.params.deviceId);
    res.status(200).json({
      status: "success",
      data: { device, topic },
    });
    logger.info(`Get one device successfully", \"userId\": \"${req.body.userId}",\"deviceId\": \"${req.params.deviceId}"`);
  }catch (error) {
    logger.error(`Get one device fail", \"userId\": \"${req.body.userId}\",\"ERROR\": \"${error}`);
  }
};

exports.addDevice = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const device = await Device.create({ ...req.body, userid: userId });
    res.status(200).json({
      status: "success",
      data: { device },
    });
    logger.info(`Add device successfully", \"userId\": \"${req.body.userId}`);
  } catch (error) {
    logger.error(`Add device device fail", \"userId\": \" ${req.body.userId}\",\"ERROR\": \"${error}`);
    next(error);
  }
};

exports.deleteDevice = async (req, res, next) => {
  try {
    const { deviceId } = req.params;
    await Device.findByIdAndDelete(deviceId);
    res.status(200).json({
      status: "success",
      message: "Delete successfully",
    });
    logger.info(`Delete device successfully", \"userId\": \"${req.body.userId}","deviceId": "${deviceId}`);
  } catch (error) {
    logger.error(`Delete device device fail", \"userId\": \"${req.body.userId}\",\"ERROR\": \"${error}`);
    next(error);
  }
};
exports.updateDevice = async (req, res, next) => {
  try {
    const { deviceId } = req.params;
    const device = await Device.findByIdAndUpdate(deviceId, req.body, {
      new: true,
      runValidator: true,
    }); // res noi dung update
    res.status(200).json({
      status: "success",
      data: { device },
    });
    logger.info(`Update device successfully", "userId": "${req.body.userId}","deviceId": "${deviceId}`);
  } catch (error) {
    logger.error(`Update device device fail", \"userId\": \"${req.body.userId}\",\"ERROR\": \"${error}`);
    next(error);
  }
};

exports.searchDevice = async (req, res, next) => {
  try {
    let query = {};
    if (req.query.keyword) {
      query.$or = [
        { name: { $regex: req.query.keyword, $options: "i" } },
        { type: { $regex: req.query.keyword, $options: "i" } },
      ];
    }
    console.log(req.query.keyword);
    let device = await Device.find(query);
    logger.info(`search device successfully", "userId": "${req.body.userId}`);
    return res.status(200).send({
      message: "success",
      data: device,
    });
  } catch (error) {
    logger.error(`Search device device fail", \"userId\": \"${req.body.userId}`);
    next(err);
  }
};

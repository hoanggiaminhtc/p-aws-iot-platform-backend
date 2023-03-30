const express = require('express');

const {getAllData, getDeviceData, getTopicData, getDatalastnday} = require('../Controllers/telemetryController');
const { verifyToken } = require('../Middlewares/verifyToken');
const Router = express.Router();

Router.get('/getall', verifyToken, getAllData);
Router.get('/getdevicedata/:deviceId', verifyToken, getDeviceData);
Router.get("/gettopicdata/:topicId", getTopicData);
Router.get('/getdatalastnday', getDatalastnday);

module.exports = Router;
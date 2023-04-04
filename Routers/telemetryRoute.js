const express = require('express');

const { getDatalastnday, getlastDeviceData} = require('../Controllers/telemetryController');
const Router = express.Router();

Router.get("/gettopicdata/:deviceId", getlastDeviceData);
Router.get('/getdatalastnday', getDatalastnday);

module.exports = Router;
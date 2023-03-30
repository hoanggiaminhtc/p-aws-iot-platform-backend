const express = require('express');

const { addDevice, deleteDevice, updateDevice, getAlldevice, getOnedevice, searchDevice} = require('../Controllers/deviceController');
const { deleteTopicAndUnsubscribe } = require('../Controllers/telemetryController');
const { verifyToken } = require('../Middlewares/verifyToken');
const Router = express.Router();

Router.get('/getall', verifyToken, getAlldevice);
Router.get('/getone/:deviceId', verifyToken, getOnedevice);
Router.get('/search', verifyToken, searchDevice);
Router.post('/add', verifyToken, addDevice);
Router.delete('/delete/:deviceId', verifyToken, deleteTopicAndUnsubscribe, deleteDevice);
Router.put('/update/:deviceId', verifyToken, updateDevice);

module.exports = Router;
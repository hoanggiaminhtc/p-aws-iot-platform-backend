const express = require("express");
const { getAllUser, 
        deleteUser, 
        getUserGateway, 
        register
    } = require("../Controllers/adminController")
const { getAlldevice } = require("../Controllers/deviceController")
const { verifyToken } = require("../Middlewares/verifyToken");
const Router = express.Router();
Router.get("/getalluser", verifyToken, getAllUser);
Router.get("/getusergateway/:gwuserId", verifyToken, getUserGateway);
Router.get("/getuserdevice/:gatewayId", verifyToken, getAlldevice);
Router.delete("/deleteuser/:deletebyUserId", verifyToken, deleteUser);
Router.post("/register", register);

module.exports = Router;

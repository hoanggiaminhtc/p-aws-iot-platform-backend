const express = require("express");

const {
  login,
  register,
  forgetPassword,
  changePassword,
  authentication,
} = require("../Controllers/authController");
const { verifyToken } = require("../Middlewares/verifyToken");
const upload = require("../cloudinary/multer");
const Router = express.Router();

Router.post("/register", register);
Router.post("/login", login);
Router.post("/resetpassword", forgetPassword);
Router.put("/changepassword", verifyToken, changePassword);
Router.get("/authentication", verifyToken, authentication);

module.exports = Router;

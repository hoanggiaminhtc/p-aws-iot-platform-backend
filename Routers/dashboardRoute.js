const express = require("express");
const {
  getDashboard,
  addDashboard,
  deleteDashboard,
  updateDashboard,
  getAlldboard,
  getListWidgets,
  addWidget,
  deleteWidget,
  updateWidget,
} = require("../Controllers/dashboardController");
const { verifyToken } = require("../Middlewares/verifyToken");
const Router = express.Router();

Router.get("/listWidgets", verifyToken, getListWidgets);
Router.post("/addwidget", verifyToken, addWidget);
Router.delete("/deletewidget/:widgetId", verifyToken, deleteWidget);
Router.put("/updatewidget/:widgetId", verifyToken, updateWidget);

Router.get("/getall", verifyToken, getAlldboard);
Router.get("/getone/:dashboardId", verifyToken, getDashboard);
Router.get("/getone/share/:dashboardId", getDashboard);
Router.post("/add", verifyToken, addDashboard);
Router.delete("/delete/:dashboardId", verifyToken, deleteDashboard);
Router.put("/update/:dashboardId", verifyToken, updateDashboard);

module.exports = Router;

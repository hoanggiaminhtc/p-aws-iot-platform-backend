const Dashboard = require("../models/Dashboard");
const Widget = require("../models/Widget");
const logger = require("../AppLog/logger");
exports.getAlldboard = async (req, res, next) => {
  const userId = req.body.userId;
  await Dashboard.find({ userid: userId })
    .then((dashboard) => {
      res.status(200).json({
        status: "success",
        data: { dashboard }
      });
      logger.info(`Get all dashboard successfully", \"userId\": \"${userId}`);
    })
    .catch((err) => {
      logger.error(`Get all dashboard fail", \"userId\": \"${userId}\",\"ERROR\": \"${err}`);
      next(err);
    })
};
exports.getDashboard = async (req, res, next) => {
  await Widget.find({ dashboard_id: req.params.dashboardId })
    .then((dashboard) => {
      res.status(200).json({
        status: "success",
        data: { dashboard }
      });
      logger.info(`Get dashboard successfully", \"userId\": \"${req.body.userId}`);
    })
    .catch((err) => {
      logger.error(`Get dashboard fail", \"userId\": \"${req.body.userId}\",\"ERROR\": \" ${err}`);
      next(err);
    });
};
exports.addDashboard = async (req, res, next) => {
  try {
    const userId = req.body.userId;
    const dashboard = await Dashboard.create({
      name: req.body.name,
      userid: userId,
    });
    logger.info(`Add dashboard successfully", \"userId\": \"${req.body.userId}`);
    return res.status(200).json({
      status: "success",
      data: dashboard
    });
  } catch (error) {
    logger.error(`Add dashboard fail", \"userId\": \"${req.body.userId}\",\"ERROR\": \"${error}`);
    next(error);
  }
};
exports.deleteDashboard = async (req, res, next) => {
  try {
    const dashboardId = req.params.dashboardId;
    await Widget.deleteMany({ dashboard_id: req.params.dashboardId });
    await Dashboard.findByIdAndDelete(dashboardId);
    res.status(200).json({
      status: "success",
      message: "Delete successfully"
    });
    logger.info(`Delete dashboard successfully", \"userId\": \"${req.body.userId}", "dashboardID" : "${req.params.dashboardId}`);
  } catch (error) {
    logger.error(`Delete dashboard fail", \"userId\": \"${req.body.userId}\",\"ERROR\": \"${error}`);
    next(error);
  }
};
exports.updateDashboard = async (req, res, next) => {
  try {
    const dashboardId = req.params.dashboardId;
    const dashboard = await Dashboard.findByIdAndUpdate(dashboardId, req.body, {
      new: true,
      runValidator: true
    });
    res.status(200).json({
      status: "success",
      data: dashboard
    });
    logger.info(`Update dashboard successfully", \"userId\": \"${req.body.userId}", "dashboardID" : "${req.params.dashboardId}`);
  } catch (error) {
    logger.error(`Update dashboard fail", \"userId\": \"${req.body.userId}\",\"ERROR\": \"${error}`);
    next(error);
  }
};

exports.getListWidgets = async (req, res, next) => {
  try {
    const widgets = await Widget.find({});
    res.status(200).json({
      status: "success",
      data: { widgets }
    });
    logger.info(`List Widgets successfully", \"userId\": \"${req.body.userId}`);
  } catch (error) {
    logger.error(`List Widgets fail", \"userId\": \"${req.body.userId}\",\"ERROR\": \"${error}`);
    next(error);
  }
};

exports.addWidget = async (req, res, next) => {
  try {
    const widget = await Widget.create({ ...req.body});
    res.status(200).json({
      status: "success",
      data: widget
    });
    logger.info(`Add Widget successfully", \"userId\": \"${req.body.userId}`);
  } catch (error) {
    logger.error(`Add Widget fail", \"userId\": \"${req.body.userId}\",\"ERROR\": \"${error}`);
    next(error);
  }
};
exports.deleteWidget = async (req, res, next) => {
  try {
    const widgetId = req.params.widgetId;
    await Widget.findByIdAndDelete(widgetId);
    res.status(200).json({
      status: "success",
      message: "Delete successfully"
    });
    logger.info(`Delete Widget successfully", \"userId\": \"${req.body.userId}`);
  } catch (error) {
    logger.error(`Delete Widget fail", \"userId\": \"${req.body.userId}\",\"ERROR\": \"${error}`);
    next(error);
  }
};
exports.getOneWidget = async (req, res, next) => {
  try {
    const widget = await Widget.findById(req.params.widgetId);
    res.status(200).json({
      status: "success",
      data: widget
    });
    logger.info("Get One Widget successfully");
  } catch (error) {
    logger.error(`Add Widget fail", \"userId\": \"${req.body.userId}\",\"ERROR\": \"${error}`);
    next(error);
  }
};
exports.updateWidget = async (req, res, next) => {
  try {
    const widgetId = req.params.widgetId;
    const widget = await Widget.findByIdAndUpdate(widgetId, req.body, {
      new: true,
      runValidator: true
    });
    res.status(200).json({
      status: "success",
      data: widget
    });
  } catch (error) {
    next(error);
  }
};
exports.getListWidgets = async (req, res, next) => {
  try {
    const widgets = await Widget.find({ userId: req.body.userId });
    res.status(200).json({
      status: "success",
      data: { widgets }
    });
    logger.info(`List Widget successfully", \"userId\": \"${req.body.userId}`);
  }catch (error) {
    logger.error(`List Widget fail", \"userId\": \"${req.body.userId}\",\"ERROR\": \"${error}`);
    next(error);
  }
};

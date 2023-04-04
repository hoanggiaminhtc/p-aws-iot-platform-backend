const jwt = require("jsonwebtoken");
const logger = require("../AppLog/logger")
exports.verifyToken = async (req, res, next) => {
  // Lay quyen truy cap tu req header
  const Authorization = req.header("authorization");
  if (!Authorization) {
    const err = new Error("Unauthorized");
    err.statusCode = 400;
    return next(err);
  }
  // get token
  const token = Authorization.replace("Bearer ", "");
  try {
    // Verify token
    const { userId } = jwt.verify(token, "thai123");
    req.body.userId = userId;
    next();
  } catch (error) {
    logger.error(`Authorization fail", "ERROR": "${error.message}`);
    if (error.message === "jwt expired") {
      return res.status(400).json({ message: error.message });
    } else {
      return res.status(400).json({ message: "failure" });
    }
  }
};

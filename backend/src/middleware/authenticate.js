const { verifyToken } = require("../config/jwt");
const User            = require("../models/User");
const AppError        = require("../utils/AppError");
const HTTP            = require("../constants/httpStatus");
const MESSAGES        = require("../constants/messages");

const authenticate = async (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer "))
      return next(new AppError(MESSAGES.UNAUTHORIZED, HTTP.UNAUTHORIZED));

    const token = authHeader.split(" ")[1];
    const decoded = verifyToken(token);

    const user = await User.findById(decoded.id);
    if (!user) return next(new AppError(MESSAGES.USER_NOT_FOUND, HTTP.UNAUTHORIZED));

    req.user = user;
    next();
  } catch (err) {
    next(err);
  }
};

module.exports = authenticate;
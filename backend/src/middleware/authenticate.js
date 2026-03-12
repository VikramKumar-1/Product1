const { verifyToken } = require("../config/jwt");
const User            = require("../models/User");
const AppError        = require("../utils/AppError");
const catchAsync      = require("../utils/catchAsync");
const HTTP            = require("../constants/httpStatus");
const MESSAGES        = require("../constants/messages");

/*
 * Protects routes — attaches req.user when a valid Bearer token is present.
 */
const authenticate = catchAsync(async (req, _res, next) => {
  const authHeader = req.headers.authorization;
 
  if (!authHeader || !authHeader.startsWith("Bearer "))
    throw new AppError(MESSAGES.UNAUTHORIZED, HTTP.UNAUTHORIZED);
 
  const token = authHeader.split(" ")[1];
  const decoded = verifyToken(token); // throws JsonWebTokenError on bad token
 
  const user = await User.findById(decoded.id);
  if (!user) throw new AppError(MESSAGES.USER_NOT_FOUND, HTTP.UNAUTHORIZED);
 
  req.user = user;
  next();
});
 
module.exports = authenticate;
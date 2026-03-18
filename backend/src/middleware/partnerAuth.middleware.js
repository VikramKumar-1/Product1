const jwt = require('jsonwebtoken');
const Partner = require('../models/partner.model');
const AppError = require('../utils/AppError');
const catchAsync = require('../utils/catchAsync');

/**
 * Middleware: protects partner dashboard routes.
 * Verifies JWT and attaches partner to req.partner.
 */
const partnerAuth = catchAsync(async (req, res, next) => {
  let token;

  if (req.headers.authorization?.startsWith('Bearer ')) {
    token = req.headers.authorization.split(' ')[1];
  }

  if (!token) throw new AppError('Authentication required', 401);

  const decoded = jwt.verify(token, process.env.JWT_SECRET);

  if (decoded.role !== 'partner') throw new AppError('Access denied', 403);

  const partner = await Partner.findById(decoded.id);
  if (!partner) throw new AppError('Partner no longer exists', 401);
  if (partner.status === 'suspended') throw new AppError('Account suspended', 403);

  req.partner = partner;
  next();
});

/**
 * Middleware: protects admin routes.
 * Checks req.user.role === 'admin' (set by existing user auth middleware).
 */
const adminOnly = (req, res, next) => {
  if (!req.user || req.user.role !== 'admin') {
    return next(new AppError('Admin access required', 403));
  }
  next();
};

module.exports = { partnerAuth, adminOnly };
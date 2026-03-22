// src/middleware/optionalAuth.js
const jwt = require('jsonwebtoken');
const User = require('../models/User');

const optionalAuth = async (req, res, next) => {
  try {
    let token;
    if (req.headers.authorization?.startsWith('Bearer ')) {
      token = req.headers.authorization.split(' ')[1];
    }

    if (token) {
      const decoded = jwt.verify(token, process.env.JWT_SECRET);
      const user = await User.findById(decoded.id);
      if (user) req.user = user; // attach if valid
    }
  } catch (err) {
    // ignore invalid token — treat as guest
  }
  next(); // always continue
};

module.exports = optionalAuth;
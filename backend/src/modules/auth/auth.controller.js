const authService = require("../auth/auth.service");
const catchAsync = require("../../utils/catchAsync");
const { sendSuccess} = require("../../utils/response");
const HTTP = require("../../constants/httpStatus");
const MESSAGES = require("../../constants/messages");

// POST /api/auth/register
const register = catchAsync(async (req, res)=> {
    const result = await authService.register(req.body);
    sendSuccess(res, HTTP.CREATED, MESSAGES.REGISTER_SUCCESS, result);
});

// POST /api/auth/login
const login = catchAsync(async (req, res)=>{
    const result = await authService.login(req.body);
    sendSuccess(res, HTTP.OK, MESSAGES.LOGIN_SUCCESS, result);
});

// GET /api/auth/me
const getMe = catchAsync(async (req,res) => {
    sendSuccess(res, HTTP.OK, MESSAGES.USER_FETCH_SUCCESS,{
        user: {
            id:  req.user._id,
            name:  req.user.name,
            email:        req.user.email,
            avatar:       req.user.avatar,
            authProvider: req.user.authProvider,
        },
    });
});

// POST /api/auth/forget-password
const forgotPassword = catchAsync(async (req, res) => {
  await authService.forgotPassword(req.body);
  // Always 200 — prevents email enumeration
  sendSuccess(res, HTTP.OK, MESSAGES.FORGOT_PASSWORD_SENT);
});

// POST /api/auth/reset-password?token=<raw_token>
const resetPassword = catchAsync(async (req, res) => {
  const result = await authService.resetPassword({
    token: req.query.token,
    ...req.body,
  });
  sendSuccess(res, HTTP.OK, MESSAGES.RESET_SUCCESS, result);
});

// PATCH /api/auth/change-password  (protected)
const changePassword = catchAsync(async (req, res) => {
  const result = await authService.changePassword({
    userId: req.user._id,
    ...req.body,
  });
  sendSuccess(res, HTTP.OK, MESSAGES.CHANGE_SUCCESS, result);
});

// GET /api/auth/google/callback  — called by Passport after Google consents
const googleCallback = (req, res) => {
  const { token } = authService.handleGoogleUser(req.user);
  // Redirect to frontend; frontend stores the token
  res.redirect(`${process.env.CLIENT_URL}/oauth-success?token=${token}`);
};

// POST /api/auth/logout
const logout = catchAsync(async (_req, res) => {
  // JWT is stateless — client deletes the token.
  // Extend here to blacklist refresh tokens if needed.
  sendSuccess(res, HTTP.OK, MESSAGES.LOGOUT_SUCCESS);
});

module.exports = {
  register,
  login,
  getMe,
  forgotPassword,
  resetPassword,
  changePassword,
  googleCallback,
  logout,
};

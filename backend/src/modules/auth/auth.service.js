const crypto = require("crypto");
const User = require("../../models/User");
const { generateToken }  = require("../../config/jwt");
const { sendPasswordResetEmail, sendPasswordChangedEmail } = require("./email.service");

const AppError = require("../../utils/AppError");
const MESSAGES = require("../../constants/messages");
const HTTP       = require("../../constants/httpStatus");

// ── Internal helpers ────

const safeUser = (user) => ({
    id: user.id,
    name: user.name,
    email: user.email,
    avatar: user.avatar,
    authProvider: user.authProvider,
});

const tokenResponse = (user) => ({
    token: generateToken(user._id),
    user: safeUser(user),
});

const register = async ({ name, email, password }) => {
    if (!name || !email || !password)
         throw new AppError(MESSAGES.MISSING_FIELDS,HTTP.BAD_REQUEST);

    if (await User.findOne({ email }))
        throw new AppError(MESSAGES.EMAIL_IN_USE, HTTP.CONFLICT);

   const user = await User.create({ name, email, password});
   return tokenResponse(user); 
};

//--Login ---
const login = async ({ email, password }) => {
  if (!email || !password)
    throw new AppError(MESSAGES.MISSING_FIELDS, HTTP.BAD_REQUEST);
 
  const user = await User.findOne({ email }).select("+password");
 
  if (!user)
    throw new AppError(MESSAGES.INVALID_CREDENTIALS, HTTP.UNAUTHORIZED);
 
  // Block local login for Google-only accounts
  if (user.authProvider === "google" && !user.password)
    throw new AppError(MESSAGES.GOOGLE_ACCOUNT, HTTP.UNAUTHORIZED);
 
  const valid = await user.comparePassword(password);
  if (!valid)
    throw new AppError(MESSAGES.INVALID_CREDENTIALS, HTTP.UNAUTHORIZED);
 
  return tokenResponse(user);
};
// ── Forgot Password ───────────────────────────────────────────────────────────
const forgotPassword = async ({ email }) => {
  if (!email)
    throw new AppError(MESSAGES.MISSING_FIELDS, HTTP.BAD_REQUEST);
 
  const user = await User.findOne({ email });
 
  // Return silently when user not found — prevents email enumeration
  if (!user) return;
 
  const rawToken = crypto.randomBytes(32).toString("hex");
 
  user.passwordResetToken   = hashToken(rawToken);
  user.passwordResetExpires = Date.now() + 15 * 60 * 1000; // 15 min
  await user.save({ validateBeforeSave: false });
 
  const resetURL = `${process.env.CLIENT_URL}/reset-password?token=${rawToken}`;
 
  try {
    await sendPasswordResetEmail({ to: user.email, name: user.name, resetURL });
  } catch (err) {
    // Roll back if email delivery fails
    user.passwordResetToken   = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });
    throw new AppError(MESSAGES.SERVER_ERROR, HTTP.INTERNAL_SERVER_ERROR);
  }
};

// ── Reset Password ────────────────────────────────────────────────────────────
const resetPassword = async ({ token, password, confirmPassword }) => {
  if (!token || !password || !confirmPassword)
    throw new AppError(MESSAGES.MISSING_FIELDS, HTTP.BAD_REQUEST);
 
  if (password !== confirmPassword)
    throw new AppError(MESSAGES.PASSWORD_MISMATCH, HTTP.BAD_REQUEST);
 
  const user = await User.findOne({
    passwordResetToken:   hashToken(token),
    passwordResetExpires: { $gt: Date.now() },
  });
 
  if (!user)
    throw new AppError(MESSAGES.RESET_TOKEN_INVALID, HTTP.BAD_REQUEST);
 
  user.password             = password;
  user.passwordResetToken   = undefined;
  user.passwordResetExpires = undefined;
  await user.save();
 
  await sendPasswordChangedEmail({ to: user.email, name: user.name });
 
  return tokenResponse(user);
};
 
// ── Change Password (authenticated user) ─────────────────────────────────────
const changePassword = async ({ userId, currentPassword, newPassword, confirmPassword }) => {
  if (!currentPassword || !newPassword || !confirmPassword)
    throw new AppError(MESSAGES.MISSING_FIELDS, HTTP.BAD_REQUEST);
 
  if (newPassword !== confirmPassword)
    throw new AppError(MESSAGES.PASSWORD_MISMATCH, HTTP.BAD_REQUEST);
 
  if (currentPassword === newPassword)
    throw new AppError(MESSAGES.PASSWORD_SAME, HTTP.BAD_REQUEST);
 
  const user = await User.findById(userId).select("+password");
 
  if (!user)
    throw new AppError(MESSAGES.USER_NOT_FOUND, HTTP.NOT_FOUND);
 
  if (!user.password)
    throw new AppError(MESSAGES.NO_LOCAL_PASSWORD, HTTP.BAD_REQUEST);
 
  const valid = await user.comparePassword(currentPassword);
  if (!valid)
    throw new AppError(MESSAGES.CURRENT_PASSWORD_WRONG, HTTP.UNAUTHORIZED);
 
  user.password = newPassword;
  await user.save();
 
  await sendPasswordChangedEmail({ to: user.email, name: user.name });
 
  return tokenResponse(user);
};
 
// ── Google OAuth (called after Passport validates) ────────────────────────────
const handleGoogleUser = (user) => tokenResponse(user);
 
module.exports = {
  register,
  login,
  forgotPassword,
  resetPassword,
  changePassword,
  handleGoogleUser,
};
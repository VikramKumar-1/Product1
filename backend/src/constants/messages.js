const MESSAGES = {
  // ── Register / Login ──────────────────────────────────
  REGISTER_SUCCESS:       "Account created successfully",
  LOGIN_SUCCESS:          "Logged in successfully",
  LOGOUT_SUCCESS:         "Logged out successfully",
  MISSING_FIELDS:         "Please provide all required fields",
  EMAIL_IN_USE:           "An account with this email already exists",
  INVALID_CREDENTIALS:    "Invalid email or password",
  GOOGLE_ACCOUNT:         "This email is linked to Google. Please sign in with Google.",

  // ── Password ──────────────────────────────────────────
  FORGOT_PASSWORD_SENT:   "If that email exists, a reset link has been sent",
  RESET_SUCCESS:          "Password reset successfully",
  CHANGE_SUCCESS:         "Password updated successfully",
  PASSWORD_MISMATCH:      "Passwords do not match",
  PASSWORD_SAME:          "New password must be different from your current one",
  CURRENT_PASSWORD_WRONG: "Current password is incorrect",
  RESET_TOKEN_INVALID:    "Reset link is invalid or has expired",
  NO_LOCAL_PASSWORD:      "This account uses Google sign-in. Use forgot password to set one.",

  // ── User ──────────────────────────────────────────────
  USER_NOT_FOUND:         "No account found",
  USER_FETCH_SUCCESS:     "User fetched successfully",

  // ── Server ────────────────────────────────────────────
  SERVER_ERROR:           "Something went wrong. Please try again.",
  ROUTE_NOT_FOUND:        "Route not found",
};

module.exports = MESSAGES;
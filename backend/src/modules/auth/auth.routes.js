const express      = require("express");
const passport     = require("passport");

const controller = require("../auth/auth.controller");
const authenticate = require("../../middleware/authenticate");

const router = express.Router();

// ── Public ────────────────────────────────────────────────────────────────────
router.post("/register",        controller.register);
router.post("/login",           controller.login);
router.post("/forgot-password", controller.forgotPassword);
router.post("/reset-password",  controller.resetPassword);

//-- Protected ----------------------------
router.get  ("/me",              authenticate, controller.getMe);
router.patch("/change-password", authenticate, controller.changePassword);
router.post ("/logout",          authenticate, controller.logout);

//── Google OAuth ──────────────────────────────────────────────────────────────
router.get("/google",
  passport.authenticate("google", { scope: ["profile", "email"], session: false })
);

router.get("/google/callback",
  passport.authenticate("google", {
    failureRedirect: `${process.env.CLIENT_URL}/login?error=google_failed`,
    session: false,
  }),
  controller.googleCallback
);
 
module.exports = router;
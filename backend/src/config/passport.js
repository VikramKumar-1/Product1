const passport = require("passport");
const User = require("../models/User");

const setupGoogleStrategy = () => {
  const { Strategy: GoogleStrategy } = require("passport-google-oauth20");

  passport.use(
    new GoogleStrategy(
      {
        clientID:    process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        callbackURL:  process.env.GOOGLE_CALLBACK_URL,
      },
      async (_accessToken, _refreshToken, profile, done) => {
        try {
          // 1. Already registered via Google
          let user = await User.findOne({ googleId: profile.id });
          if (user) return done(null, user);

          // 2. Email exists from manual registration → link accounts
          user = await User.findOne({ email: profile.emails[0].value });
          if (user) {
            user.googleId     = profile.id;
            user.authProvider = "google";
            user.isVerified   = true;
            if (!user.avatar) user.avatar = profile.photos[0]?.value || "";
            await user.save();
            return done(null, user);
          }

          // 3. Brand new user — auto register and sign in
          user = await User.create({
            name:         profile.displayName,
            email:        profile.emails[0].value,
            googleId:     profile.id,
            avatar:       profile.photos[0]?.value || "",
            authProvider: "google",
            isVerified:   true,
          });

          return done(null, user);
        } catch (err) {
          return done(err, null);
        }
      }
    )
  );

  console.log("✅  Google OAuth strategy registered");
};

// Only register strategy if credentials are present in .env
if (process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET) {
  setupGoogleStrategy();
} else {
  console.warn("⚠️   GOOGLE_CLIENT_ID or GOOGLE_CLIENT_SECRET missing in .env");
  console.warn("⚠️   Google OAuth is disabled — server will still run normally");
}

// JWT-only flow — sessions not used
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  try {
    const user = await User.findById(id);
    done(null, user);
  } catch (err) {
    done(err, null);
  }
});

module.exports = passport;
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const passport = require("passport");

const GOOGLE_CLIENT_ID =
  "206155733129-h4p4fkdbhqi5eu3kan7ri91u1b7q8em0.apps.googleusercontent.com";
const GOOGLE_CLIENT_SECRET = "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";

passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5700/api/googleAuth/auth/google/callback",
    },
    function (accessToken, refreshToken, profile, done) {
      done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

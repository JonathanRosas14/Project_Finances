import passport from "passport";
import { Strategy as GoogleStrategy } from "passport-google-oauth20";
import { db } from "./db.js";

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      try {
        const email = profile.emails[0].value;
        const username = profile.displayName;
        const providerId = profile.id;

        const [user] = await db.query("SELECT * FROM users WHERE email = ?", [
          email,
        ]);

        if (user.length > 0) {
          return done(null, user[0]);
        }

        const [result] = await db.query(
          `INSERT INTO users (username, email, provider, provider_id)
           VALUES (?, ?, 'google', ?)`,
          [username, email, providerId]
        );

        done(null, { id: result.insertId, email });
      } catch (error) {
        done(error, null);
      }
    }
  )
);

export default passport;

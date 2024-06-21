const express = require("express");
const { v4: uuidv4 } = require("uuid");
const user = require("../model/user.Schema"); // Assuming you have a user model defined
const { encryptPassword, getToken } = require("../utils/AuthUtils"); // Assuming you have these utility functions

module.exports = (kindeClient) => {
  const router = express.Router();

  // Login route
  router.get("/login", (req, res) => {
    const loginUrl = kindeClient.getLoginUrl();
    res.redirect(loginUrl);
  });

  // Register route
  router.get("/register", (req, res) => {
    const registerUrl = kindeClient.getRegisterUrl();
    res.redirect(registerUrl);
  });

  // Callback route
  router.get("/callback", async (req, res) => {
    try {
      const tokenResponse = await kindeClient.exchangeCodeForToken(
        req.query.code
      );
      console.log("Token Response:", tokenResponse);
      req.session.token = tokenResponse.access_token;

      const profile = await kindeClient.getUserProfile(
        tokenResponse.access_token
      );
      console.log("User Profile:", profile);
      req.session.userId = profile.id;

      res.redirect(`/genvision/${profile.id}`);
    } catch (error) {
      console.error("Error during callback:", error);
      res.status(500).send("Authentication failed");
    }
  });

  // Logout route
  router.get("/logout", (req, res) => {
    const logoutUrl = kindeClient.getLogoutUrl();
    req.session.destroy(() => {
      res.redirect(logoutUrl);
    });
  });

  // Custom route for handling auth with Kinde
  router.post("/auth/kinde", async (req, res, next) => {
    try {
      const { code } = req.body;

      const tokenResponse = await kindeClient.exchangeCodeForToken(code);
      const profile = await kindeClient.getUserProfile(
        tokenResponse.access_token
      );

      let existingUser = await user.findOne({ username: profile.email });
      if (!existingUser) {
        existingUser = new user({
          username: profile.email,
          name: profile.name,
          password: await encryptPassword(uuidv4()), // Generate a random password for new users
        });
        await existingUser.save();
      }

      const appToken = getToken(existingUser._id);
      res.status(200).json({ token: appToken, userId: existingUser._id });
    } catch (error) {
      next(error);
    }
  });

  return router;
};

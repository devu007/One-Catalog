const express = require("express");
const fetch = require("node-fetch");
const User = require("../model/user.Schema");
const { getToken } = require("../utils/tokenUtils");
const { handleError } = require("../utils/errorUtils");
const { encryptPassword } = require("../utils/AuthUtils");
const { v4: uuidv4 } = require("uuid");

const router = express.Router();

router.post("/auth/amazon", async (req, res, next) => {
  try {
    const { token } = req.body;

    const response = await fetch("https://api.amazon.com/user/profile", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    if (!response.ok) {
      return next(handleError(401, "Invalid token"));
    }

    const profile = await response.json();

    let user = await User.findOne({ username: profile.email });
    if (!user) {
      user = new User({
        username: profile.email,
        name: profile.name,
        password: await encryptPassword(uuidv4()), // Generate a random password for new users
      });
      await user.save();
    }

    const appToken = getToken(user._id);
    res.status(200).json({ token: appToken, userId: user._id });
  } catch (error) {
    next(error);
  }
});

module.exports = router;

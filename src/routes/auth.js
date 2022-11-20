const express = require("express");
const router = express.Router();

const jwt = require("jsonwebtoken");
const passport = require("passport");
const authControllers = require("../controllers/auth");

/* POST login. */
router.post("/login", function (req, res, next) {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    console.log("error", info);

    if (err || !user) {
      return res.status(400).json({
        message: info ? info.message : "Login failed",
        user: user,
      });
    }

    req.login(user, { session: false }, (err) => {
      if (err) {
        res.send(err);
      }

      const token = jwt.sign(user, "your_jwt_secret");

      return res.json({ user, token });
    });
  })(req, res);
});

router.post("/signup", authControllers.signup);

module.exports = router;

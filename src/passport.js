const passport = require("passport");
const passportJWT = require("passport-jwt");

const ExtractJWT = passportJWT.ExtractJwt;

const LocalStrategy = require("passport-local").Strategy;
const JWTStrategy = passportJWT.Strategy;

const { PrismaClient } = require("@prisma/client");
const bcrypt = require("bcrypt");

const prisma = new PrismaClient();

passport.use(
  new LocalStrategy(
    {
      usernameField: "email",
      passwordField: "password",
    },
    function (email, password, cb) {
      console.log(email);
      prisma.user
        .findUnique({
          where: {
            email: email,
          },
        })
        .then((user) => {
          if (!user) {
            return cb(null, false, { message: "Incorrect email or password." });
          } else {
            return cb(null, user, {
              message: "Logged In Successfully",
            });
          }
        })
        .catch((err) => {
          return cb(err);
        });
    }
  )
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: "your_jwt_secret",
    },
    function (jwtPayload, cb) {
      console.log(jwtPayload);
      //find the user in db if needed
      return cb(null, "hilton");
      //   UserModel.findOneById(jwtPayload.id)
      //     .then((user) => {
      //       return cb(null, user);
      //     })
      //     .catch((err) => {
      //       return cb(err);
      //     });
    }
  )
);

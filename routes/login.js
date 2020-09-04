require("dotenv").config();
const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const bcrypt = require("bcrypt");
let db = require("../models");
const jwt = require("jsonwebtoken");

router.use(bodyParser.urlencoded({ extended: false }));

router.post("/login", (req, res) => {
  let username = req.body.username;
  console.log(username);
  let password = req.body.password;
  console.log(password);

  db.users
    .findOne({
      where: {
        username: username,
      },
    })
    .then((persistUser) => {
      if (persistUser) {
        bcrypt
          .compare(password, persistUser.password)
          .then((success) => {
            if (success) {
              let token = jwt.sign(
                {
                  id: persistUser.id,
                  username: persistUser.username,
                },
                process.env.JWT_SECRET,
                {
                  expiresIn: "4h",
                }
              );

              res
                .status(200)
                .json({ message: "Successfully logged in!", token: token });
            }
          })
          .catch((err) => console.error(err));
      } else {
        res
          .status(500)
          .json({ message: "Incorrect credentials, please try again" });
      }
    });
});

module.exports = router;

const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
let SALT = 15;
let db = require("../models");

router.use(bodyParser.urlencoded({ extended: false }));

router.post("/register", (req, res) => {
  let username = req.body.username;
  let email = req.body.email;
  let password = req.body.password;
  db.users
    .findOne({
      where: {
        username: username,
      },
    })
    .then((user) => {
      if (user) {
        console.log("username already exists");
        res.status(500).json({ message: "username already exists" });
      } else {
        db.users
          .findOne({
            where: {
              email: email,
            },
          })
          .then((user2) => {
            console.log("looking for email...");
            if (user2) {
              console.log("email already exists");
              res.status(500).json({ message: "email already exists" });
            } else {
              bcrypt.hash(password, SALT).then((hash) => {
                console.log("hashing password....");
                let user = db.users.build({
                  username: username,
                  email: email,
                  password: hash,
                });

                user
                  .save()
                  .then(() =>
                    res.status(200).json({ message: "New user created!" })
                  )
                  .catch((err) => console.error(err));
              });
            }
          });
      }
    });
});

module.exports = router;

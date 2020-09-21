const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
let SALT = 15;

let db = require("../models");

router.use(bodyParser.urlencoded({ extended: false }));

router.post("/updateUsername", (req, res) => {
  let id = req.body.id;
  let username = req.body.username;
  let updatedusername = req.body.updatedusername;
  console.log(id);
  console.log(username);
  console.log(updatedusername);

  db.users
    .findOne({
      where: {
        id: id,
      },
    })
    .then(() => {
      db.users
        .findOne({
          where: {
            username: updatedusername,
          },
        })
        .then((updateUser) => {
          if (updateUser) {
            console.log("username already exists");
            res.status(500).json({ message: "username already exists" });
          } else {
            let newusername = {
              username: updatedusername,
            };
            newusername
              .save()
              .then(() => {
                console.log("Updated username in database");
                res.status(200).json({ message: "username has been updated!" });
              })
              .catch((err) => console.log(err));
          }
        });
    });
});

router.post("/updateEmail", (req, res) => {
  let id = req.body.id;
  let email = req.body.email;
  console.log(email);

  db.users
    .findOne({
      where: {
        id: id,
      },
    })
    .then(() => {
      db.users
        .findOne({
          where: {
            email: email,
          },
        })
        .then((newEmail) => {
          if (email) {
            console.log("email already exists, please select another");
            res
              .status(500)
              .json({ message: "email already exists, please select another" });
          } else {
            newEmail.email = email;
            email
              .save()
              .then(() => {
                console.log("Updated email in database");
                res.status(200);
              })
              .catch((err) => console.log(err));
          }
        });
    });
});

router.post("/updatePassword", (req, res) => {
  let id = req.body.id;
  let password = req.body.password;
  console.log(password);

  db.users
    .findOne({
      where: {
        email: email,
      },
    })
    .then((newPassword) => {
      bcrypt.hash(password, SALT).then((hash) => {
        //I'm slightly confused how to do this
      });
    });
});

module.exports = router;

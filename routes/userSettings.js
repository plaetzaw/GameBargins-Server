const express = require("express");
const router = express.Router();
const bcrypt = require("bcrypt");
const bodyParser = require("body-parser");
let SALT = 15;

let db = require("../models");

router.use(bodyParser.urlencoded({ extended: false }));

router.post("/updateUsername", async (req, res) => {
  let id = req.body.id;
  let username = req.body.username;
  let updatedusername = req.body.updatedusername;

  try {
    let persistUser = await db.users.findOne({
      where: { id },
    });

    if (persistUser) {
      persistUser.username = updatedusername;

      await persistUser.save({
        fields: ["username"],
      });

      res
        .status(200)
        .json({ message: `Success, your new username is ${username}` });
    } else res.status(500).json({ message: "Something went wrong" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
});

router.post("/updateEmail", async (req, res) => {
  let id = req.body.id;
  let updatedemail = req.body.email;

  try {
    let persistUser = await db.users.findOne({
      where: { id },
    });

    if (persistUser) {
      persistUser.email = updatedemail;

      await persistUser.save({
        fields: ["email"],
      });

      res.status(200).json({ message: `Success, your email has been updated` });
    } else res.status(500).json({ message: "Something went wrong" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
});

router.post("/updatePassword", async (req, res) => {
  let id = req.body.id;
  let password = req.body.password;

  try {
    let persistUser = await db.users.findOne({
      where: { id },
    });
    if (persistUser) {
      let newpassword = await bcrypt.hash(password, SALT);
      persistUser.password = newpassword;

      await persistUser.save({
        fields: ["password"],
      });
      res
        .status(200)
        .json({ message: `Success, your password has been updated` });
    } else res.status(500).json({ message: "Something went wrong" });
  } catch (e) {
    console.error(e);
    res.status(500).json({ error: e });
  }
});

module.exports = router;

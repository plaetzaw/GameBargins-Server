const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("../models");

router.use(bodyParser.urlencoded({ extended: false }));

router.post("/viewSavedGames", (req, res) => {
  console.log(req.body);
  const userID = req.body.userID;
  console.log(userID);

  db.games
    .findAll({
      where: {
        userID: userID,
      },
    })
    .then((savedGames) => {
      res.status(200).json(savedGames);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;

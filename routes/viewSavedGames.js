const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const db = require("../models");

router.use(bodyParser.urlencoded({ extended: false }));

router.post("/viewSavedGames", (req, res) => {
  const userID = req.body.userID;
  console.log(userID);

  db.games
    .findAll({
      where: {
        userID: userID,
      },
    })
    .then((savedGames) => {
      res.sendStatus(200).json(savedGames);
    })
    .catch((err) => console.err(err));
});

module.exports = router;

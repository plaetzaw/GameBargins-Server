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
    .then((games) => {
      // let reviews = savedGames.steamRatingCount;

      // const steamReviewChecker = (reviews) => {
      //   if (reviews === 0) {
      //     return "false";
      //   } else {
      //     return "true";
      //   }
      // };

      // let steamBool = steamReviewChecker(reviews);

      // let score = savedGames.metacriticScore;

      // const metacriticScoreColor = (score) => {
      //   if (score > 80) {
      //     return "green";
      //   } else if (80 > score > 61) {
      //     return "yellow";
      //   } else {
      //     return "red";
      //   }
      // };

      // let scoreColor = metacriticScoreColor(score);

      res.status(200).json(games);
    })
    .catch((err) => {
      console.log(err);
    });
});

module.exports = router;

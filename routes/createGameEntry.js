const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
let db = require("../models");

router.use(bodyParser.urlencoded({ extended: false }));

router.post("/createGameEntry", async (req, res) => {
  const title = req.body.title;
  const metacriticLink = req.body.metacriticLink;
  const dealID = req.body.dealID;
  const storeID = req.body.storeID;
  const gameID = req.body.gameID;
  const salePrice = req.body.salePrice;
  const normalPrice = req.body.normalPrice;
  const isOnSale = req.body.isOnSale;
  const savings = req.body.savings;
  const metacriticScore = req.body.metacriticScore;
  const steamRatingText = req.body.steamRatingText;
  const steamRatingPercent = req.body.steamRatingPercent;
  const steamRatingCount = req.body.steamRatingCount;
  const steamAppID = req.body.steamAppID;
  const releaseDate = req.body.releaseDate;
  const lastChange = req.body.lastChange;
  const dealRating = req.body.dealRating;
  const thumb = req.body.thumb;
  const userID = req.body.userID;

  console.log(userID);

  try {
    let newGame = await db.games.build({
      title: title,
      metacriticLink: metacriticLink,
      dealID: dealID,
      storeID: storeID,
      gameID: gameID,
      salePrice: salePrice,
      normalPrice: normalPrice,
      isOnSale: isOnSale,
      savings: savings,
      metacriticScore: metacriticScore,
      steamRatingText: steamRatingText,
      steamRatingPercent: steamRatingPercent,
      steamRatingCount: steamRatingCount,
      steamAppID: steamAppID,
      releaseDate: releaseDate,
      lastChange: lastChange,
      dealRating: dealRating,
      thumb: thumb,
      userID: userID,
    });

    let savedGame = await newGame.save();

    console.log(savedGame);
    res.status(200).json({ message: "OK", savedGame });
  } catch (e) {
    res.status(500).json({ message: "An error has occured", error: e });
  }

  // let newGame = db.games.build({
  //   title: title,
  //   metacriticlink: metacriticlink,
  //   dealID: dealID,
  //   storeID: storeID,
  //   gameID: gameID,
  //   salePrice: salePrice,
  //   normalPrice: normalPrice,
  //   isOnSale: isOnSale,
  //   savings: savings,
  //   metacriticScore: metacriticScore,
  //   steamRatingText: steamRatingText,
  //   steamRatingPercent: steamRatingPercent,
  //   steamRatingCount: steamRatingCount,
  //   steamID: steamID,
  //   releaseDate: releaseDate,
  //   lastChange: lastChange,
  //   dealRating: dealRating,
  //   thumb: thumb,
  //   userID: userID,
  // });

  // newGame
  //   .save()
  //   .then(() => {
  //     console.log("Saving game to the database");
  //     res.sendStatus(200);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   });
});

module.exports = router;

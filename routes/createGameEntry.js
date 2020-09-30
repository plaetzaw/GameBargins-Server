const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const axios = require("axios");
const CircularJSON = require("circular-json");
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

  let reviews = req.body.steamRatingCount;

  const steamReviewChecker = (reviews) => {
    if (reviews < 1) {
      return "false";
    } else {
      return "true";
    }
  };

  const steamCheckerBool = steamReviewChecker(reviews);

  let score = req.body.metacriticScore;

  const metacriticScoreColor = (score) => {
    if (score > 89) {
      return "lightgreen";
    } else if (90 > score && score > 75) {
      return "green";
    } else if (75 > score && score > 51) {
      return "yellow";
    } else {
      return "red";
    }
  };

  const scoreColor = metacriticScoreColor(score);

  try {
    let newGame = await db.games.build({
      title: title,
      metacriticLink: metacriticLink,
      dealID: dealID,
      storeID: storeID,
      gameID: gameID,
      salePrice: parseFloat(salePrice),
      normalPrice: parseFloat(normalPrice),
      isOnSale: isOnSale,
      savings: parseFloat(savings).toFixed(2),
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
      steamCheckerBool: steamCheckerBool,
      scoreColor: scoreColor,
    });

    let savedGame = await newGame.save();

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

router.post("/getInfoAndSave", async (req, res) => {
  let id = req.body.cheapestDealID;
  const userID = req.body.userID;

  let apiURL = `https://www.cheapshark.com/api/1.0/deals?id=${id}`;

  axios.post(apiURL).then((results) => {
    console.log(results.data).then((data) => {});
  });

  const title = data.gameInfo.title;
  const metacriticLink = data.gameInfo.metacriticLink;
  const dealID = data.gameInfo.dealID;
  const storeID = data.gameInfo.storeID;
  const gameID = data.gameInfo.gameID;
  const salePrice = data.gameInfo.salePrice;
  const normalPrice = data.gameInfo.normalPrice;
  const isOnSale = data.gameInfo.isOnSale;
  const savings = data.gameInfo.savings;
  const metacriticScore = data.gameInfo.metacriticScore;
  const steamRatingText = data.gameInfo.steamRatingText;
  const steamRatingPercent = data.gameInfo.steamRatingPercent;
  const steamRatingCount = data.gameInfo.steamRatingCount;
  const steamAppID = data.gameInfo.steamAppID;
  const releaseDate = data.gameInfo.releaseDate;
  const lastChange = data.gameInfo.lastChange;
  const dealRating = data.gameInfo.dealRating;
  const thumb = data.gameInfo.thumb;

  // const isOnSaleChecker = (isOnSale) => {
  //   if (isOnSale === null) {
  //     if (salePrice < normalPrice) {
  //       return true;
  //     } else {
  //       return false;
  //     }
  //   }
  // };

  // const isOnSaleBool = isOnSaleChecker(isOnSale);

  // const savingsChecker = (savings) => {
  //   if (savings === null) {
  //     let verifiedSavings = salePrice / normalPrice;
  //     return verifiedSavings;
  //   }
  // };

  // const checkedSavings = savingsChecker(savings);

  let reviews = req.body.steamRatingCount;

  const steamReviewChecker = (reviews) => {
    if (reviews < 1) {
      return "false";
    } else {
      return "true";
    }
  };

  const steamCheckerBool = steamReviewChecker(reviews);

  let score = req.body.metacriticScore;

  const metacriticScoreColor = (score) => {
    if (score > 89) {
      return "lightgreen";
    } else if (90 > score && score > 75) {
      return "green";
    } else if (75 > score && score > 51) {
      return "yellow";
    } else {
      return "red";
    }
  };

  const scoreColor = metacriticScoreColor(score);

  try {
    let newGame = await db.games.build({
      title: title,
      metacriticLink: metacriticLink,
      dealID: dealID,
      storeID: storeID,
      gameID: gameID,
      salePrice: parseFloat(salePrice),
      normalPrice: parseFloat(normalPrice),
      isOnSale: isOnSale,
      savings: parseFloat(savings).toFixed(2),
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
      steamCheckerBool: steamCheckerBool,
      scoreColor: scoreColor,
    });

    let savedGame = await newGame.save();

    res.status(200).json({ message: "OK", savedGame });
  } catch (e) {
    res.status(500).json({ message: "An error has occured", error: e });
  }
});

module.exports = router;

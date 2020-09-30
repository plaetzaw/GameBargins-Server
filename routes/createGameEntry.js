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

  let apiURL = `https://www.cheapshark.com/api/1.0/deals?id=${id}`;

  let results = await axios.get(apiURL);
  console.log(results.data);
  try {
    const userID = req.body.userID;
    const title = results.data.gameInfo.name;
    const metacriticLink = results.data.gameInfo.metacriticLink;
    const dealID = id;
    const storeID = results.data.gameInfo.storeID;
    const gameID = results.data.gameInfo.gameID;
    const salePrice = results.data.gameInfo.salePrice;
    const normalPrice = results.data.gameInfo.retailPrice;
    // const isOnSale = results.data.gameInfo.isOnSale;
    const savings = normalPrice - salePrice;
    const metacriticScore = results.data.gameInfo.metacriticScore;
    const steamRatingText = results.data.gameInfo.steamRatingText;
    const steamRatingPercent = results.data.gameInfo.steamRatingPercent;
    const steamRatingCount = results.data.gameInfo.steamRatingCount;
    const steamAppID = results.data.gameInfo.steamAppID;
    const releaseDate = results.data.gameInfo.releaseDate;
    const lastChange = results.data.gameInfo.lastChange;
    const dealRating = results.data.gameInfo.dealRating;
    const thumb = results.data.gameInfo.thumb;

    console.log(normalPrice);
    console.log(salePrice);
    const isOnSale = (salePrice, normalPrice) => {
      if (salePrice < normalPrice) {
        return true;
      } else {
        return false;
      }
    };
    const isOnSaleBool = isOnSale(salePrice, normalPrice);

    const dealRatingChecker = (salePrice, normalPrice) => {
      let deal = salePrice / normalPrice;
      console.log(deal);
      return deal;
    };

    const dealValue = dealRatingChecker(salePrice, normalPrice);
    console.log(dealValue);

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

    // move me to the end of the try-catch

    let newGame = await db.games.build({
      title: title,
      metacriticLink: metacriticLink,
      dealID: dealID,
      storeID: storeID,
      gameID: gameID,
      salePrice: parseFloat(salePrice),
      normalPrice: parseFloat(normalPrice),
      isOnSale: isOnSaleBool,
      savings: parseFloat(savings).toFixed(2),
      metacriticScore: metacriticScore,
      steamRatingText: steamRatingText,
      steamRatingPercent: steamRatingPercent,
      steamRatingCount: steamRatingCount,
      steamAppID: steamAppID,
      releaseDate: releaseDate,
      lastChange: lastChange,
      dealRating: dealValue,
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

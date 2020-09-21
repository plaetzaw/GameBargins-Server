const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const axios = require("axios");
const CircularJSON = require("circular-json");
let db = require("../models");

router.use(bodyParser.urlencoded({ extended: false }));

router.post("/advancedSearch", (req, res) => {
  let gameTitle = req.body.gameTitle;
  let maxPrice = req.body.value;
  let onSale = req.body.checked;

  const onSaleChecker = (onSale) => {
    if (onSale === true) {
      return 1;
    } else {
      return 0;
    }
  };

  const onSaleBool = onSaleChecker(onSale);

  let apiURL = `https://www.cheapshark.com/api/1.0/deals?title=${gameTitle}&upperPrice=${maxPrice}&onSale=${onSaleBool}`;

  axios
    .get(apiURL)
    .then((results) => {
      let gameJSON = CircularJSON.stringify(results.data);
      res.status(200).send(gameJSON);
    })
    .catch((err) => console.error(err));
});

module.exports = router;

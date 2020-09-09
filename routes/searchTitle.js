const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const axios = require("axios");
const CircularJSON = require("circular-json");
let db = require("../models");

router.use(bodyParser.urlencoded({ extended: false }));

router.post("/searchTitle", (req, res) => {
  let gameTitle = req.body.gameTitle;

  let apiURL = `https://www.cheapshark.com/api/1.0/deals?title=${gameTitle}`;

  axios
    .get(apiURL)
    .then((results) => {
      // console.log(results);
      let gameJSON = CircularJSON.stringify(results);
      // console.log(gameJSON);
      res.status(200).json(gameJSON);
    })
    .catch((err) => console.error(err));
});

module.exports = router;

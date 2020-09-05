const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const axios = require("axios");
let db = require("../models");

router.use(bodyParser.urlencoded({ extended: false }));

router.post("/searchTitle", (req, res) => {
  let gameTitle = req.body.gameTitle;

  let apiURL = `https://www.cheapshark.com/api/1.0/deals?title=${gameTitle}`;

  axios
    .get(apiURL)
    .then((results) => {
      console.log(results);
      res.status(200).json(results);
    })
    .catch((err) => console.error(err));
});

module.exports = router;

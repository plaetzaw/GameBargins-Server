const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
const axios = require("axios");
let db = require("../models");

router.use(bodyParser.urlencoded({ extended: false }));

router.post("/setAlert", (req, res) => {
  let gameID = req.body.gameID;
  let email = req.body.email;
  let price = req.body.price;
  let apiURL = `https://www.cheapshark.com/api/1.0/alerts?action=set&email=${email}&gameID=${gameID}&price=${price}`;

  axios
    .get(apiURL)
    .then((newAlert) => {
      console.log(newAlert);
      res
        .sendStatus(200)
        .json({ message: `Alert set for ${gameID} at ${price} to ${email}` });
    })
    .catch((err) => console.error(err));
});

module.exports = router;

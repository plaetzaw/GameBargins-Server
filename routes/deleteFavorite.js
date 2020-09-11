const express = require("express");
const router = express.Router();
const bodyParser = require("body-parser");
let db = require("../models");

router.use(bodyParser.urlencoded({ extended: false }));

router.post("/deleteFavorite", (req, res) => {
  let id = req.body.id;
  console.log(id);

  db.games
    .destroy({
      where: {
        id: id,
      },
    })
    .then(() => {
      res.status(200).json({ message: "Game removed from favorites" });
    })
    .catch((err) => console.error(err));
});

module.exports = router;

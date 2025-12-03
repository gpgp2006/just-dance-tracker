const express = require("express");
const router = express.Router();
const { Song, Game } = require("../models");

router.get("/", async (req, res) => {
  try {
    const { game_edition } = req.query;

    let options = {
      include: [{ model: Game, as: "game" }],
    };

    if (game_edition) {
      options.where = { game_edition: game_edition };
    }

    const songs = await Song.findAll(options);
    res.json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;

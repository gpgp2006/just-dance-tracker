const express = require('express');
const router = express.Router();
const { Game } = require('../models');

// GET /api/games - Lista todos os jogos
router.get('/', async (req, res) => {
    try {
        const games = await Game.findAll();
        res.json(games);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
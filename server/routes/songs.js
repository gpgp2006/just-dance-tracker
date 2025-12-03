const express = require('express');
const router = express.Router();
const { Song, Game } = require('../models');

// GET /api/songs
// Pode receber um filtro: /api/songs?game_edition=2023
router.get('/', async (req, res) => {
    try {
        const { game_edition } = req.query;
        
        // Configuração da busca
        let options = {
            include: [{ model: Game, as: 'game' }] // Traz os dados do jogo junto
        };

        // Se o usuário passou um filtro na URL, adiciona o WHERE
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
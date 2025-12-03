const express = require('express');
const router = express.Router();
const { Score, User, Song } = require('../models');

// GET /api/scores
// Aceita filtros: ?song_id=... &user_id=...
router.get('/', async (req, res) => {
    try {
        const { song_id, user_id } = req.query; // <--- Agora lemos o user_id também
        let whereClause = {};

        if (song_id) {
            whereClause.song_id = song_id;
        }
        
        // --- A CORREÇÃO MÁGICA ESTÁ AQUI ---
        // Se o front mandar um user_id, filtramos por ele.
        // Assim, o João só recebe as notas do João.
        if (user_id) {
            whereClause.user_id = user_id;
        }

        const scores = await Score.findAll({
            where: whereClause,
            include: [
                { model: User, as: 'user', attributes: ['username'] },
                { model: Song, as: 'song', attributes: ['title'] }
            ],
            order: [['score_points', 'DESC']]
        });

        res.json(scores);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// POST /api/scores - Cria nova
router.post('/', async (req, res) => {
    try {
        const { user_id, song_id, score_points, stars, platform, input_method } = req.body;
        const newScore = await Score.create({
            user_id,
            song_id,
            score_points,
            stars,
            platform,
            input_method
        });
        res.status(201).json(newScore);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// DELETE /api/scores/:id
router.delete('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const deleted = await Score.destroy({
            where: { id: id }
        });

        if (deleted) {
            return res.status(204).send("Score deleted");
        }
        throw new Error("Score not found");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// PUT /api/scores/:id
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { score_points, platform, input_method, stars } = req.body;

        const [updated] = await Score.update({
            score_points, 
            platform, 
            input_method,
            stars
        }, {
            where: { id: id }
        });

        if (updated) {
            const updatedScore = await Score.findByPk(id);
            return res.status(200).json(updatedScore);
        }
        throw new Error("Score not found");
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
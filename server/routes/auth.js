const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs'); // Biblioteca de criptografia
const { User } = require('../models');

// 1. CHECAGEM DE USUÁRIO (O "Google Style")
// Verifica se o usuário existe para decidir se mostra LOGIN ou CADASTRO
router.post('/check-username', async (req, res) => {
    try {
        const { username } = req.body;
        const user = await User.findOne({ where: { username } });
        
        if (user) {
            res.json({ exists: true, photo: user.photo }); // Retorna se existe e a foto (se tiver)
        } else {
            res.json({ exists: false });
        }
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 2. CADASTRO (SIGN UP)
router.post('/signup', async (req, res) => {
    try {
        const { username, password, email, default_platform, default_input } = req.body;

        // Criptografa a senha antes de salvar
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = await User.create({
            username,
            email,
            password: hashedPassword, // Salva o hash, nunca a senha real
            default_platform,
            default_input
        });

        // Retorna o usuário SEM a senha
        const userResponse = newUser.toJSON();
        delete userResponse.password;
        
        res.status(201).json(userResponse);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

// 3. LOGIN
router.post('/login', async (req, res) => {
    try {
        const { username, password } = req.body;
        
        // Busca o usuário
        const user = await User.findOne({ where: { username } });
        if (!user) return res.status(404).json({ error: "Usuário não encontrado" });

        // Compara a senha enviada com o hash no banco
        const isMatch = await bcrypt.compare(password, user.password);
        
        if (!isMatch) return res.status(400).json({ error: "Senha incorreta" });

        // Login sucesso: Retorna dados do usuário
        const userResponse = user.toJSON();
        delete userResponse.password; // Remove senha por segurança
        
        res.json(userResponse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

// 4. ATUALIZAR USUÁRIO (EDITAR PERFIL)
router.put('/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { email, password, default_platform, default_input } = req.body;
        
        const updateData = { email, default_platform, default_input };

        // Se mandou senha nova, criptografa ela também
        if (password) {
            const salt = await bcrypt.genSalt(10);
            updateData.password = await bcrypt.hash(password, salt);
        }

        await User.update(updateData, { where: { id } });
        
        // Retorna usuário atualizado
        const updatedUser = await User.findByPk(id);
        const userResponse = updatedUser.toJSON();
        delete userResponse.password;

        res.json(userResponse);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
});

module.exports = router;
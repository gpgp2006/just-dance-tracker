const { Sequelize } = require('sequelize');

const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite', // O arquivo do banco será criado automaticamente na raiz do server
    logging: false
});

module.exports = sequelize;
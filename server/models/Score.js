const { DataTypes } = require("sequelize");
const sequelize = require("../config/database");

const Score = sequelize.define("Score", {
  score_points: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  stars: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  platform: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  input_method: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});

module.exports = Score;

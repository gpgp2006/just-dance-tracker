const sequelize = require("../config/database");

const Game = require("./Game");
const Song = require("./Song");
const User = require("./User");
const Score = require("./Score");

Game.hasMany(Song, {
  foreignKey: "game_edition",
  sourceKey: "edition",
  as: "songs",
});
Song.belongsTo(Game, {
  foreignKey: "game_edition",
  targetKey: "edition",
  as: "game",
});

User.hasMany(Score, { foreignKey: "user_id", as: "scores" });
Score.belongsTo(User, { foreignKey: "user_id", as: "user" });

Song.hasMany(Score, { foreignKey: "song_id", sourceKey: "id", as: "scores" });
Score.belongsTo(Song, { foreignKey: "song_id", targetKey: "id", as: "song" });

const db = {
  sequelize,
  Game,
  Song,
  User,
  Score,
};

module.exports = db;

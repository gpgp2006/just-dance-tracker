const express = require("express");
const cors = require("cors");
const path = require("path");
const { sequelize } = require("./models");
const authRoutes = require("./routes/auth");
const gamesRoutes = require("./routes/games");
const songsRoutes = require("./routes/songs");
const scoresRoutes = require("./routes/scores");

const app = express();
const PORT = 3001;

app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
app.use("/images", express.static(path.join(__dirname, "public/images")));

app.use("/api/games", gamesRoutes);
app.use("/api/songs", songsRoutes);
app.use("/api/scores", scoresRoutes);

app.get("/", (req, res) => {
  res.send("API Just Dance Tracker Funcionando");
});

sequelize.sync({ force: false }).then(() => {
  console.log("Banco de dados conectado");
  app.listen(PORT, () => {
    console.log(`Servidor rodando na porta ${PORT}`);
  });
});

import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import SongRow from "../components/SongRow";
import { GAME_PLATFORMS, getValidInputs } from "../utils/gameRules";
import { useAuth } from "../context/AuthContext";

const LOGO_MAP = {
  "Xbox 360": "xbox360.png",
  "Xbox One": "xboxone.png",
  "Xbox Series X/S": "xboxseries.png",
  PC: "pc.png",
  PS3: "ps3.png",
  PS4: "ps4.png",
  PS5: "ps5.png",
  Wii: "wii.png",
  "Wii U": "wiiu.png",
  Switch: "switch.png",
};

function GameDetails() {
  const { edition } = useParams();
  const [songs, setSongs] = useState([]);
  const [gameTitle, setGameTitle] = useState("");
  const { user } = useAuth();

  const [isEditMode, setIsEditMode] = useState(false);
  const [filterPlatform, setFilterPlatform] = useState("");
  const [filterMethod, setFilterMethod] = useState("");

  useEffect(() => {
    if (user) {
      setFilterPlatform(user.default_platform || "");
      setFilterMethod(user.default_input || "");
    }
  }, [user]);

  useEffect(() => {
    axios
      .get(`http://localhost:3001/api/songs?game_edition=${edition}`)
      .then((response) => {
        setSongs(response.data);
        if (response.data.length > 0) {
          setGameTitle(response.data[0].game.title);
        }
      })
      .catch((error) => {
        console.error("Erro ao buscar músicas:", error);
      });
  }, [edition]);

  const handlePlatformClick = (platform) => {
    if (filterPlatform === platform) {
      setFilterPlatform("");
      setFilterMethod("");
      return;
    }

    setFilterPlatform(platform);

    const validInputs = getValidInputs(platform, edition);
    if (validInputs.length === 1) {
      setFilterMethod(validInputs[0]);
    } else {
      setFilterMethod("");
    }
  };

  return (
    <div className="container mt-5">
      <div className="d-flex align-items-center justify-content-between mb-4">
        <div className="d-flex align-items-center">
          <Link to="/" className="btn btn-outline-secondary me-3">
            &larr; Voltar
          </Link>
          <h2 className="mb-0">{gameTitle || `Just Dance ${edition}`}</h2>
        </div>

        <div className="form-check form-switch bg-white p-2 rounded border shadow-sm ps-5 pe-3">
          <input
            className="form-check-input ms-0 me-2"
            type="checkbox"
            id="editModeSwitch"
            checked={isEditMode}
            onChange={() => setIsEditMode(!isEditMode)}
            style={{ cursor: "pointer", transform: "scale(1.3)" }}
          />
          <label
            className="form-check-label fw-bold user-select-none"
            htmlFor="editModeSwitch"
            style={{ cursor: "pointer" }}
          >
            {isEditMode ? "Voltar para Modo Visualização" : "Ativar Modo de Edição"}
          </label>
        </div>
      </div>

      <div className="card mb-4 border-0 bg-light shadow-sm">
        <div className="card-body py-3">
          <div className="row">
            <div className="col-md-12 mb-2">
              <label className="form-label small text-muted fw-bold text-uppercase">
                Filtrar Visualização por Plataforma
              </label>
              <div className="d-flex flex-wrap gap-2">
                {(GAME_PLATFORMS[edition] || []).map((platform) => (
                  <button
                    key={platform}
                    title={platform}
                    onClick={() => handlePlatformClick(platform)}
                    className="btn p-1 shadow-sm d-flex align-items-center justify-content-center transition-all"
                    style={{
                      width: "50px",
                      height: "50px",
                      border:
                        filterPlatform === platform
                          ? "2px solid #0d6efd"
                          : "1px solid #dee2e6",
                      backgroundColor:
                        filterPlatform === platform ? "white" : "#f8f9fa",
                      opacity:
                        filterPlatform && filterPlatform !== platform ? 0.5 : 1,
                      transition: "all 0.2s ease",
                    }}
                  >
                    <img
                      src={`http://localhost:3001/images/consoles/${LOGO_MAP[platform]}`}
                      alt={platform}
                      style={{
                        maxWidth: "100%",
                        maxHeight: "100%",
                        objectFit: "contain",
                      }}
                    />
                  </button>
                ))}
              </div>
              {filterPlatform ? (
                <small className="text-primary fw-bold mt-1 d-block">
                  {filterPlatform}
                </small>
              ) : (
                <small className="text-muted mt-1 d-block fst-italic">
                  Visualização Geral (Mostrando a melhor pontuação de todas as
                  plataformas)
                </small>
              )}
            </div>

            <div className="col-md-6 mt-3">
              <label className="form-label small text-muted fw-bold text-uppercase">
                Filtrar por Método
              </label>
              <select
                className="form-select"
                value={filterMethod}
                onChange={(e) => setFilterMethod(e.target.value)}
                disabled={
                  !filterPlatform ||
                  getValidInputs(filterPlatform, edition).length <= 1
                }
              >
                <option value="">
                  {getValidInputs(filterPlatform, edition).length <= 1 &&
                  filterPlatform
                    ? filterMethod
                    : "Todos os Métodos"}
                </option>
                {filterPlatform &&
                  getValidInputs(filterPlatform, edition).length > 1 &&
                  getValidInputs(filterPlatform, edition).map((input) => (
                    <option key={input} value={input}>
                      {input}
                    </option>
                  ))}
              </select>
            </div>

            <div className="col-md-6 mt-3 text-end d-flex align-items-end justify-content-end">
              <small className="text-muted fst-italic">
                {isEditMode
                  ? "Você já pode adicionar novas pontuações."
                  : "Habilite o modo edição para alterar pontuações."}
              </small>
            </div>
          </div>
        </div>
      </div>

      <div className="card shadow-sm">
        <div className="card-body p-0">
          <table className="table table-hover mb-0">
            <thead className="table-dark">
              <tr>
                <th style={{ width: "100px" }}></th>
                <th>Título / Artista</th>
                <th className="text-end" style={{ width: "220px" }}>
                  Melhor Pontuação
                </th>
                <th style={{ width: "50px" }}></th>
              </tr>
            </thead>
            <tbody>
              {songs.length > 0 ? (
                songs.map((song) => (
                  <SongRow
                    key={song.id}
                    song={song}
                    gameEdition={edition}
                    isEditMode={isEditMode}
                    filterPlatform={filterPlatform}
                    filterMethod={filterMethod}
                    userSettings={{
                      default_platform:
                        filterPlatform || user?.default_platform || "",
                      default_input: filterMethod || user?.default_input || "",
                    }}
                    currentUser={user}
                  />
                ))
              ) : (
                <tr>
                  <td colSpan="4" className="text-center py-5 text-muted">
                    Nenhuma música encontrada.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default GameDetails;

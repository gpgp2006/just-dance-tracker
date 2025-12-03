import { useState, useEffect } from "react";
import axios from "axios";
import { GAME_PLATFORMS, getValidInputs } from "../utils/gameRules";

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

const StarFeedback = ({ details }) => {
  if (!details) return null;

  if (details.type === "error" || details.type === "text") {
    return <span className={`fw-bold ${details.color}`}>{details.text}</span>;
  }

  if (details.type === "image") {
    return (
      <img
        src={`http://localhost:3001/images/stars/${details.src}`}
        alt={details.alt}
        title={details.alt}
        style={{ height: "30px", objectFit: "contain" }}
      />
    );
  }
  return null;
};

function SongRow({
  song,
  gameEdition,
  isEditMode,
  filterPlatform,
  filterMethod,
  userSettings,
  currentUser,
}) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [scores, setScores] = useState([]);

  const [selectedPlatform, setSelectedPlatform] = useState("");
  const [selectedInput, setSelectedInput] = useState("");
  const [scoreValue, setScoreValue] = useState("");

  const [editingId, setEditingId] = useState(null);

  const fetchScores = () => {
    if (!currentUser) return;

    axios
      .get(
        `http://localhost:3001/api/scores?song_id=${song.id}&user_id=${currentUser.id}`
      )
      .then((res) => setScores(res.data))
      .catch((err) => console.error("Erro ao carregar scores", err));
  };

  useEffect(() => {
    if (currentUser) {
      fetchScores();
    }
  }, [song.id, currentUser]);

  useEffect(() => {
    if (!editingId) {
      if (userSettings?.default_platform)
        setSelectedPlatform(userSettings.default_platform);
      if (userSettings?.default_input)
        setSelectedInput(userSettings.default_input);
    }
  }, [userSettings, editingId]);

  const getScoreDetails = (val) => {
    const points = parseInt(val);
    const edition = parseInt(gameEdition);

    if (isNaN(points)) return null;
    if (points > 13333)
      return {
        type: "error",
        text: "Inválida (> 13333)",
        color: "text-danger",
      };

    let image = null;
    let altText = "";

    if (edition >= 2018 && points >= 12000) {
      image = "megastar.webp";
      altText = "Megastar";
    } else if (edition >= 2017 && points >= 11000) {
      image = "superstar.webp";
      altText = "Superstar";
    } else if (points >= 10000) {
      image = "5stars.webp";
      altText = "5 Estrelas";
    } else if (points >= 8000) {
      image = "4stars.webp";
      altText = "4 Estrelas";
    } else if (points >= 6000) {
      image = "3stars.webp";
      altText = "3 Estrelas";
    } else if (points >= 4000) {
      image = "2stars.webp";
      altText = "2 Estrelas";
    } else if (points >= 2000) {
      image = "1stars.webp";
      altText = "1 Estrela";
    }

    if (image) return { type: "image", src: image, alt: altText };
    return { type: "text", text: "0 Estrelas", color: "text-muted" };
  };

  const getBestScoreForDisplay = () => {
    const filteredScores = scores.filter((s) => {
      const matchesPlatform = filterPlatform
        ? s.platform === filterPlatform
        : true;
      const matchesMethod = filterMethod
        ? s.input_method === filterMethod
        : true;
      return matchesPlatform && matchesMethod;
    });
    return filteredScores.length > 0 ? filteredScores[0] : null;
  };

  const bestScore = getBestScoreForDisplay();
  const bestScoreDetails = bestScore
    ? getScoreDetails(bestScore.score_points)
    : null;
  const currentInputDetails = getScoreDetails(scoreValue);
  const availablePlatforms = GAME_PLATFORMS[gameEdition] || [];

  const handlePlatformSelect = (platformName) => {
    setSelectedPlatform(platformName);
    const validInputs = getValidInputs(platformName, gameEdition);
    if (validInputs.length === 1) setSelectedInput(validInputs[0]);
    else setSelectedInput("");
  };

  const handleEditClick = (score) => {
    setEditingId(score.id);
    setSelectedPlatform(score.platform);
    setSelectedInput(score.input_method);
    setScoreValue(score.score_points);
  };

  const handleCancelEdit = () => {
    setEditingId(null);
    setScoreValue("");
    if (userSettings?.default_platform)
      setSelectedPlatform(userSettings.default_platform);
    if (userSettings?.default_input)
      setSelectedInput(userSettings.default_input);
  };

  const handleDeleteClick = async (id) => {
    if (window.confirm("Tem certeza que deseja apagar esta pontuação?")) {
      try {
        await axios.delete(`http://localhost:3001/api/scores/${id}`);
        fetchScores();
      } catch (error) {
        alert(
          `Erro ao deletar: ${error.response?.data?.error || error.message}`
        );
      }
    }
  };

  const handleSave = async () => {
    if (!selectedPlatform || !selectedInput || !scoreValue)
      return alert("Preencha tudo!");
    if (parseInt(scoreValue) > 13333) return alert("Máximo 13333!");

    const payload = {
      user_id: currentUser.id,
      song_id: song.id,
      platform: selectedPlatform,
      input_method: selectedInput,
      score_points: parseInt(scoreValue),
      stars: 5,
    };

    try {
      if (editingId) {
        await axios.put(
          `http://localhost:3001/api/scores/${editingId}`,
          payload
        );
        alert("Pontuação atualizada com sucesso!");
        handleCancelEdit();
      } else {
        await axios.post("http://localhost:3001/api/scores", payload);
        alert("Pontuação salva com sucesso!");
        setScoreValue("");
      }
      fetchScores();
    } catch (error) {
      console.error("Erro no save:", error);
      alert(`Erro ao salvar: ${error.response?.data?.error || error.message}`);
    }
  };

  return (
    <>
      <tr
        onClick={() => setIsExpanded(!isExpanded)}
        style={{ cursor: "pointer" }}
        className={isExpanded ? "table-active border-bottom-0" : ""}
      >
        <td style={{ width: "100px" }}>
          <div
            className="bg-secondary text-white rounded d-flex align-items-center justify-content-center"
            style={{ width: "80px", height: "80px" }}
          >
            {song.cover_image ? (
              <img
                src={`http://localhost:3001${song.cover_image}`}
                alt={song.title}
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
                className="rounded"
              />
            ) : (
              <span style={{ fontSize: "1.5rem" }}>🎵</span>
            )}
          </div>
        </td>
        <td className="align-middle">
          <h5 className="mb-0 fw-bold">{song.title}</h5>
          <small className="text-muted">{song.artist}</small>
        </td>

        <td className="align-middle text-end">
          {bestScore ? (
            <div>
              <h5
                className="mb-0 fw-bold text-dark display-6"
                style={{ fontSize: "1.2rem" }}
              >
                {bestScore.score_points}
              </h5>
              <div className="d-flex justify-content-end">
                <StarFeedback details={bestScoreDetails} />
              </div>
              {!filterPlatform && (
                <div className="text-muted mt-1" style={{ fontSize: "0.7rem" }}>
                  no {bestScore.platform} com {bestScore.input_method}
                </div>
              )}
            </div>
          ) : (
            <span className="text-muted opacity-50">---</span>
          )}
        </td>
        <td className="align-middle text-end">
          <button className="btn btn-sm btn-outline-dark">
            {isExpanded ? "▲" : "▼"}
          </button>
        </td>
      </tr>

      {isExpanded && (
        <tr className="bg-light table-active">
          <td colSpan="4" className="p-0">
            <div className="p-4 border-bottom shadow-inset">
              {(isEditMode || editingId) && (
                <div
                  className={`mb-5 border-bottom pb-4 animate-fade-in ${
                    editingId ? "bg-white p-3 border rounded shadow-sm" : ""
                  }`}
                >
                  <div className="d-flex justify-content-between align-items-center mb-3">
                    <h6 className="fw-bold mb-0 text-primary">
                      {editingId
                        ? `✏️ Editando Pontuação #${editingId}`
                        : "➕ Adicionar Nova Pontuação"}
                    </h6>
                    {editingId && (
                      <button
                        onClick={handleCancelEdit}
                        className="btn btn-sm btn-outline-secondary"
                      >
                        Cancelar Edição
                      </button>
                    )}
                  </div>

                  <div className="row">
                    <div className="col-md-6">
                      <label className="form-label small text-muted">
                        Plataforma
                      </label>
                      <div className="d-flex flex-wrap gap-2 mb-3">
                        {availablePlatforms.map((platform) => (
                          <button
                            key={platform}
                            title={platform}
                            onClick={(e) => {
                              e.stopPropagation();
                              handlePlatformSelect(platform);
                            }}
                            className={`btn p-1 shadow-sm d-flex align-items-center justify-content-center`}
                            style={{
                              width: "50px",
                              height: "50px",
                              border:
                                selectedPlatform === platform
                                  ? "2px solid #0d6efd"
                                  : "1px solid #dee2e6",
                              backgroundColor:
                                selectedPlatform === platform
                                  ? "white"
                                  : "#f8f9fa",
                              opacity:
                                selectedPlatform &&
                                selectedPlatform !== platform
                                  ? 0.5
                                  : 1,
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
                    </div>
                    <div className="col-md-6">
                      <div className="row g-2">
                        <div className="col-6">
                          <label className="form-label small text-muted">
                            Método
                          </label>
                          <select
                            className="form-select form-select-sm"
                            value={selectedInput}
                            onChange={(e) => setSelectedInput(e.target.value)}
                            disabled={!selectedPlatform}
                          >
                            <option value="">...</option>
                            {selectedPlatform &&
                              getValidInputs(selectedPlatform, gameEdition).map(
                                (i) => (
                                  <option key={i} value={i}>
                                    {i}
                                  </option>
                                )
                              )}
                          </select>
                        </div>
                        <div className="col-6">
                          <label className="form-label small text-muted">
                            Pontos
                          </label>
                          <input
                            type="number"
                            className="form-control form-control-sm"
                            value={scoreValue}
                            onChange={(e) => setScoreValue(e.target.value)}
                            placeholder="0"
                          />
                        </div>
                        <div
                          className="col-12 mt-2"
                          style={{ minHeight: "35px" }}
                        >
                          <StarFeedback details={currentInputDetails} />
                        </div>
                        <div className="col-12 mt-2">
                          <button
                            onClick={handleSave}
                            className="btn btn-sm btn-success w-100"
                            disabled={!scoreValue}
                          >
                            {editingId ? "Atualizar Pontuação" : "Salvar"}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              )}

              <div>
                <h6 className="fw-bold mb-3 text-muted text-uppercase small">
                  Histórico de Pontuações ({filterPlatform || "Geral"})
                </h6>
                {scores.length > 0 ? (
                  <div className="table-responsive">
                    <table className="table table-sm table-bordered bg-white align-middle">
                      <thead className="table-light">
                        <tr>
                          <th>Plataforma</th>
                          <th>Método</th>
                          <th>Pontos</th>
                          <th>Rank</th>
                          {isEditMode && (
                            <th
                              className="text-center"
                              style={{ width: "100px" }}
                            >
                              Ações
                            </th>
                          )}
                        </tr>
                      </thead>
                      <tbody>
                        {scores
                          .filter((s) => {
                            const mp = filterPlatform
                              ? s.platform === filterPlatform
                              : true;
                            const mm = filterMethod
                              ? s.input_method === filterMethod
                              : true;
                            return mp && mm;
                          })
                          .map((score) => {
                            const det = getScoreDetails(score.score_points);
                            const isEditing = editingId === score.id;

                            return (
                              <tr
                                key={score.id}
                                className={isEditing ? "table-warning" : ""}
                              >
                                <td>{score.platform}</td>
                                <td>{score.input_method}</td>
                                <td className="fw-bold">
                                  {score.score_points}
                                </td>
                                <td>
                                  <StarFeedback details={det} />
                                </td>
                                {isEditMode && (
                                  <td className="text-center">
                                    <div className="btn-group btn-group-sm">
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleEditClick(score);
                                        }}
                                        className="btn btn-outline-primary"
                                        title="Editar"
                                      >
                                        ✏️
                                      </button>
                                      <button
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleDeleteClick(score.id);
                                        }}
                                        className="btn btn-outline-danger"
                                        title="Deletar"
                                      >
                                        🗑️
                                      </button>
                                    </div>
                                  </td>
                                )}
                              </tr>
                            );
                          })}
                        {scores.filter((s) =>
                          filterPlatform ? s.platform === filterPlatform : true
                        ).length === 0 && (
                          <tr>
                            <td
                              colSpan={isEditMode ? 5 : 4}
                              className="text-center text-muted"
                            >
                              Nenhuma pontuação com este filtro.
                            </td>
                          </tr>
                        )}
                      </tbody>
                    </table>
                  </div>
                ) : (
                  <p className="text-muted small">
                    Nenhuma pontuação registrada ainda.
                  </p>
                )}
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default SongRow;

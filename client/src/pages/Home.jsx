import { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

function Home() {
    const [games, setGames] = useState([]);

    // useEffect roda assim que a tela carrega
    useEffect(() => {
        // Busca os dados da SUA API
        axios.get('http://localhost:3001/api/games')
            .then(response => {
                setGames(response.data);
            })
            .catch(error => {
                console.error("Erro ao buscar jogos:", error);
            });
    }, []);

    return (
        <div className="container mt-5">
            <h1 className="text-center mb-4 display-4 fw-bold">Selecione a Edição</h1>
            
            <div className="row g-4">
                {games.map((game) => (
                    <div key={game.edition} className="col-md-4 col-sm-6">
                        <div className="card h-100 shadow-sm border-0 hover-effect">
                            {/* Note como montamos a URL da imagem: Servidor + Caminho do Banco */}
                            <img 
                                src={`http://localhost:3001${game.cover_image}`} 
                                className="card-img-top" 
                                alt={game.title}
                                style={{
    width: '100%',
    // Define que a caixa da imagem SEMPRE terá a proporção de 2 de largura por 3 de altura (formato retrato padrão)
    aspectRatio: '2 / 3',
    // 'contain' = Mágica! Força a imagem inteira a caber dentro da caixa, sem cortar NADA.
    objectFit: 'contain',
    // Adiciona um fundo cinza claro suave. Se a imagem não preencher a caixa perfeitamente, o espaço que sobra fica cinza em vez de branco, parecendo mais profissional.
    backgroundColor: '#e9ecef',
    // (Opcional) Uma pequena borda arredondada no topo para combinar com o card
    borderTopLeftRadius: 'calc(0.375rem - 1px)',
    borderTopRightRadius: 'calc(0.375rem - 1px)'
}}
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title fw-bold">{game.title}</h5>
                                <Link to={`/game/${game.edition}`} className="btn btn-primary mt-2 w-100">
                                    Ver Músicas
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Home;
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useAuth } from '../context/AuthContext';

function Login() {
    const [step, setStep] = useState(1); // 1: Username, 2: Senha, 3: Cadastro
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [email, setEmail] = useState('');
    const [error, setError] = useState('');
    
    const { login } = useAuth();
    const navigate = useNavigate();

    // Passo 1: Checa se usuário existe
    const handleCheckUser = async (e) => {
        e.preventDefault();
        setError('');
        if (!username) return;

        try {
            const res = await axios.post('http://localhost:3001/api/auth/check-username', { username });
            if (res.data.exists) {
                setStep(2); // Usuário existe -> Vai para Login (Senha)
            } else {
                setStep(3); // Não existe -> Vai para Cadastro
            }
        } catch (err) {
            console.error(err);
            setError('Erro ao conectar com o servidor.');
        }
    };

    // Passo 2: Login com senha
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const res = await axios.post('http://localhost:3001/api/auth/login', { username, password });
            login(res.data); // Salva no contexto global
            navigate('/'); // Manda pra Home
        } catch (err) {
            console.error(err);
            setError('Senha incorreta ou erro no servidor.');
        }
    };

    // Passo 3: Cadastro (Sign Up)
    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            // Cria conta com configurações padrão
            const res = await axios.post('http://localhost:3001/api/auth/signup', { 
                username, 
                password, 
                email,
                default_platform: '', // Padrão vazio (Geral)
                default_input: ''
            });
            login(res.data); // Já loga direto após criar a conta
            navigate('/');
        } catch (err) {
            console.error(err);
            setError('Erro ao criar conta: ' + (err.response?.data?.error || err.message));
        }
    };

    return (
        <div className="d-flex align-items-center justify-content-center min-vh-100 bg-light">
            <div className="card shadow border-0 p-4" style={{ width: '400px' }}>
                <div className="text-center mb-4">
                    <h1 className="fw-bold text-primary">Just Dance Tracker</h1>
                    <p className="text-muted">Entre para gerenciar suas pontuações</p>
                </div>

                {error && <div className="alert alert-danger btn-sm">{error}</div>}

                {/* PASSO 1: DIGITAR USUÁRIO */}
                {step === 1 && (
                    <form onSubmit={handleCheckUser}>
                        <div className="mb-3">
                            <label className="form-label">Nome de Usuário</label>
                            <input 
                                type="text" 
                                className="form-control form-control-lg" 
                                placeholder="Seu nickname"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                                autoFocus
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 btn-lg">Continuar</button>
                    </form>
                )}

                {/* PASSO 2: DIGITAR SENHA (LOGIN) */}
                {step === 2 && (
                    <form onSubmit={handleLogin}>
                        <div className="d-flex align-items-center mb-3 p-2 bg-light rounded">
                            <span className="fw-bold me-auto">👤 {username}</span>
                            <button type="button" onClick={() => { setStep(1); setPassword(''); }} className="btn btn-link btn-sm text-decoration-none">Alterar</button>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Senha</label>
                            <input 
                                type="password" 
                                className="form-control form-control-lg" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                autoFocus
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-primary w-100 btn-lg">Entrar</button>
                    </form>
                )}

                {/* PASSO 3: CRIAR CONTA (SIGN UP) */}
                {step === 3 && (
                    <form onSubmit={handleSignup}>
                        <div className="alert alert-info py-2 small">
                            Usuário <strong>{username}</strong> não encontrado. Vamos criar uma conta?
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Email</label>
                            <input 
                                type="email" 
                                className="form-control" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Crie uma Senha</label>
                            <input 
                                type="password" 
                                className="form-control" 
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <button type="submit" className="btn btn-success w-100 btn-lg">Criar Conta</button>
                        <button type="button" onClick={() => setStep(1)} className="btn btn-link w-100 mt-2 text-decoration-none">Voltar</button>
                    </form>
                )}
            </div>
        </div>
    );
}

export default Login;
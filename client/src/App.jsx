import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  Link,
} from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider, useAuth } from "./context/AuthContext";
import Home from "./pages/Home";
import GameDetails from "./pages/GameDetails";
import Login from "./pages/Login";

const ProtectedRoute = ({ children }) => {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
};

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  return (
    <>
      <nav className="navbar navbar-dark bg-dark mb-4 px-4 justify-content-between">
        <Link to="/" className="navbar-brand mb-0 h1 text-decoration-none">
          Just Dance Tracker
        </Link>
        <div className="d-flex align-items-center gap-3">
          <span className="text-white">
            Olá, <strong>{user?.username}</strong>
          </span>
          <button onClick={logout} className="btn btn-outline-light btn-sm">
            Sair
          </button>
        </div>
      </nav>
      {children}
    </>
  );
};

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="min-vh-100 bg-light">
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Layout>
                    <Home />
                  </Layout>
                </ProtectedRoute>
              }
            />

            <Route
              path="/game/:edition"
              element={
                <ProtectedRoute>
                  <Layout>
                    <GameDetails />
                  </Layout>
                </ProtectedRoute>
              }
            />
          </Routes>
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;

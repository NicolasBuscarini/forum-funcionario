import {
  BrowserRouter as Router,
  Routes,
  Route,
  useLocation,
} from "react-router-dom";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home/Home";
import HRPage from "./pages/HRPage/HRPage";
import DocPg from "./pages/Doc/DocPg.js";
import VideoPage from "./pages/VideoPage/VideoPg";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import Qualidade from "./pages/Qualidade/Qualidade.js";
import Autenticacao from "./pages/Autenticacao/Autenticacao.js";
import Postar from "./pages/Postar/Postar.js";
import EsqueceuSenha from "./pages/EsqueceuSenha/EsqueceuSenha.js";

const Layout = ({ children }) => {
  const location = useLocation(); // Hook agora está dentro do Router

  const isAutenticacaoPage = location.pathname === "/autenticacao"; // Verifica se é a rota de login

 
 

  return (
    <>
      {!isAutenticacaoPage && <Header />}
      {!isAutenticacaoPage && <NavBar />}

      <div className="container-fluid mt-4 mb-4">
        {children} {/* Renderiza os componentes dentro do Layout */}
      </div>

      {!isAutenticacaoPage && <Footer />}
    </>
  );
};

const App = () => {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            {/* Login Route */}
            <Route path="/autenticacao" element={<Autenticacao />} />

            {/* Protected Routes */}
            <Route
              path="/"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/rh"
              element={
                <ProtectedRoute>
                  <HRPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/qualidade"
              element={
                <ProtectedRoute>
                  <Qualidade />
                </ProtectedRoute>
              }
            />
            <Route
              path="/documentos"
              element={
                <ProtectedRoute>
                  <DocPg />
                </ProtectedRoute>
              }
            />
            <Route
              path="/fique-por-dentro"
              element={
                <ProtectedRoute>
                  <VideoPage />
                </ProtectedRoute>
              }
            />
            <Route
              path="/suporte"
              element={
                <ProtectedRoute>
                  <Home />
                </ProtectedRoute>
              }
            />
            <Route
              path="/postar"
              element={
                <ProtectedRoute>
                  <Postar />
                </ProtectedRoute>
              }
            />
            <Route path="/esqueceu-senha"  element={<EsqueceuSenha />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;

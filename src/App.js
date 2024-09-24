import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Chat from "./components/Chat/Chat";
import Footer from "./components/Footer/Footer";
import BirthdayBoard from "./components/BirthdayBoard/BirthdayBoard";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home/Home";
import HRPage from "./pages/HRPage/HRPage";
import DocPg from "./pages/Doc/DocPg.js";
import LoginPage from "./pages/LoginPage/LoginPage";
import VideoPage from "./pages/VideoPage/VideoPg";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";
import CreatePost from "./pages/CreatePost/CreatePost.js";
import Qualidade from "./pages/Qualidade/Qualidade.js";




const Layout = ({ children }) => {
  const location = useLocation(); // Hook agora está dentro do Router

  const isLoginPage = location.pathname === "/login"; // Verifica se é a rota de login
  const isHomePage = location.pathname === "/"; // Verifica se é a rota de home

  return (
    <>
      {!isLoginPage && <Header />}
      {!isLoginPage && <NavBar />}


      <div className="container-fluid mt-4 mb-4">
     
        
        <div className="row">
          {/* Renderiza a coluna esquerda apenas na Home */}
          {isHomePage && (
            <div className="col-xl-3 mb-2">
              <BirthdayBoard />
            </div>
          )}

          {/* Ajusta a largura da coluna central dependendo das colunas laterais */}
          <div className={isHomePage ? "col-xl-6 mb-2" : "col-xl-12 mb-2"}>
            {children} {/* Renderiza os componentes dentro do Layout */}
          </div>

          {/* Renderiza a coluna direita apenas na Home */}
          {isHomePage && (
            <div className="col-xl-3 mb-2">
              <Chat />
            </div>
          )}
        </div>
      </div>
      {!isLoginPage && <Footer />}


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
            <Route path="/login" element={<LoginPage />} />

            {/* Protected Routes */}
            <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/rh" element={<ProtectedRoute><HRPage /></ProtectedRoute>} />
            <Route path="/Qualidade" element={<ProtectedRoute><Qualidade /></ProtectedRoute>} />
            <Route path="/Documentos" element={<ProtectedRoute><DocPg /></ProtectedRoute>} />
            <Route path="/Fique por Dentro" element={<ProtectedRoute><VideoPage /></ProtectedRoute>} />
            <Route path="/Suporte" element={<ProtectedRoute><Home /></ProtectedRoute>} />
            <Route path="/Postar" element={<ProtectedRoute><CreatePost /></ProtectedRoute>} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;

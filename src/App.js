import React, { useContext } from "react";
import { BrowserRouter as Router, Routes, Route, Navigate, useLocation } from "react-router-dom";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Chat from "./components/Chat/Chat";
import Footer from "./components/Footer/Footer";
import BirthdayBoard from "./components/BirthdayBoard/BirthdayBoard";
import CurrentDate from "./components/CurrentDate/CurrentDate";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home/Home";
import HRPage from "./pages/HRPage/HRPage";
import DocPg from "./pages/Doc/DocPg.js";
import LoginPage from "./pages/LoginPage/LoginPage";
import { AuthProvider } from "./context/AuthContext";
import ProtectedRoute from "./components/ProtectedRoute/ProtectedRoute";

const Layout = ({ children }) => {
  const location = useLocation(); // Hook agora está dentro do Router

  const isLoginPage = location.pathname === "/login"; // Verifica se é a rota de login

  return (
    <>
      {!isLoginPage && <Header />}
      {!isLoginPage && <NavBar />}
      <div className="container-fluid mt-4 mb-4">
        <div className="row">
          <div className="col-lg-2">
            {!isLoginPage && <CurrentDate />}
            {!isLoginPage && <BirthdayBoard />}
          </div>
          <div className="col-lg-7">
            {children} {/* Renderiza os componentes dentro do Layout */}
          </div>
          <div className="col-lg-3">
          {!isLoginPage && <Chat />}
          </div>
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
            <Route path="/Documentos" element={<ProtectedRoute><DocPg /></ProtectedRoute>} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;

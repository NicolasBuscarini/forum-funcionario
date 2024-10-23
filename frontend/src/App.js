import {
  BrowserRouter as Router,
  Routes,
  Route,
} from "react-router-dom";
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
import ResetPassword from "./pages/ResetPassword/ResetPassword.js";
import Layout from "./Layout.js";
import ChatPage from "./pages/Chat/ChatPage.js";

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
             <Route
              path="/chat"
              element={
                <ProtectedRoute>
                  <ChatPage />
                </ProtectedRoute>
              }
            />

            <Route path="/reset-password" element={<ResetPassword />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
};

export default App;

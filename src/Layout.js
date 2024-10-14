import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Footer from "./components/Footer/Footer";
import { useLocation } from "react-router-dom";
import "./App.css";

const Layout = ({ children }) => {
    const location = useLocation();

    // Verifica se a rota atual é "/autenticacao" ou "/reset-password"
    const isSpecialPage =
        location.pathname === "/autenticacao" ||
        location.pathname.startsWith("/reset-password");

    // Se for uma página especial, não carrega o layout completo
    if (isSpecialPage) {
        return <>{children}</>;
    }

    return (
        <>
            <Header />
            <NavBar />

            <div className="container-fluid mt-4 mb-4">
                {children} {/* Renderiza os componentes dentro do Layout */}
            </div>

            <Footer />
        </>
    );
};

export default Layout;

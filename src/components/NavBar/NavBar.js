import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faQuestionCircle, faInfoCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import './NavBar.css';
import { faBong, faFileText, faFolderOpen, faHome, faPeopleArrows, faCalendarAlt, faPhone } from '@fortawesome/free-solid-svg-icons';
import SearchResults from '../SearchResults/SearchResults';


const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showAboutModal, setShowAboutModal] = useState(false);
  const [showHelpModal, setShowHelpModal] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const menuRef = useRef(null); // Referência para o menu popup
  const [searchTerm, setSearchTerm] = useState(""); // Estado para o termo de pesquisa
  const [searchResults, setSearchResults] = useState([]); // Estado para armazenar os resultados da pesquisa

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleCloseAbout = () => setShowAboutModal(false);
  const handleShowAbout = () => setShowAboutModal(true);
  const handleCloseHelp = () => setShowHelpModal(false);
  const handleShowHelp = () => setShowHelpModal(true);

  // Fecha o menu popup ao clicar fora dele
  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
    }
  };

  useEffect(() => {
    // Adiciona o listener ao clicar fora do menu
    document.addEventListener('mousedown', handleClickOutside);

    // Remove o listener ao desmontar o componente
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Função para lidar com a pesquisa
  const handleSearch = () => {
    // Lógica para realizar a pesquisa
    const data = [
      // Exemplo de dados; substitua isso pelos dados reais do seu portal
      { id: 1, title: 'Home', content: 'Bem-vindo ao portal' },
      { id: 2, title: 'Recursos Humanos', content: 'Informações sobre RH' },
      { id: 3, title: 'Qualidade', content: 'Informações sobre qualidade' },
      { id: 4, title: 'Documentos', content: 'Documentos importantes' },
      // Adicione mais itens conforme necessário
    ];

    const results = data.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
    setShowSearchResults(true); // Exibe o modal com os resultados
  };

  return (
    <>
      <nav className="custom-navbar">
        <div className="navbar-container">
          <div className="navbar-links">
            <NavLink className="nav-link" exact to="/">
              <span className="icon"><FontAwesomeIcon icon={faHome} /></span>
              <span className="text">Home</span>
            </NavLink>
            <NavLink className="nav-link" exact to="/rh">
              <span className="icon"><FontAwesomeIcon icon={faPeopleArrows} /></span>
              <span className="text">Recursos Humanos</span>
            </NavLink>
            <NavLink className="nav-link" exact to="/qualidade">
              <span className="icon"><FontAwesomeIcon icon={faBong} /></span>
              <span className="text">Qualidade</span>
            </NavLink>
            <NavLink className="nav-link" exact to="/documentos">
              <span className="icon"><FontAwesomeIcon icon={faFolderOpen} /></span>
              <span className="text">Documentos</span>
            </NavLink>
            <NavLink className="nav-link" exact to="/fique-por-dentro">
              <span className="icon"><FontAwesomeIcon icon={faCalendarAlt} /></span>
              <span className="text">Fique por Dentro</span>
            </NavLink>
            <NavLink className="nav-link" to="/suporte">
              <span className="icon"><FontAwesomeIcon icon={faPhone} /></span>
              <span className="text">Suporte</span>
            </NavLink>
            <NavLink className="nav-link" to="/postar">
              <span className="icon"><FontAwesomeIcon icon={faFileText} /></span>
              <span className="text">Postar</span>
            </NavLink>
          </div>

          {/* Campo de pesquisa posicionado antes do ícone hamburger */}
          <div className="navbar-search">
            <input
              type="text"
              className="search-input"
              placeholder="Pesquisar..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button className="search-button" onClick={handleSearch}>
              <FontAwesomeIcon icon={faSearch} />
            </button>
          </div>

          <div className="hamburger-icon" onClick={toggleMenu}>
            <FontAwesomeIcon icon={faBars} />
          </div>
          
          {/* Menu popup exibido ao clicar no ícone "hamburger" */}
          {isMenuOpen && (
            <div className="menu-popup" ref={menuRef}>
              <ul className="menu-list">
                <li>
                  <a href="#" onClick={handleShowHelp}>
                    <FontAwesomeIcon icon={faQuestionCircle} /> Ajuda
                  </a>
                </li>
                <li>
                  <a href="#" onClick={handleShowAbout}>
                    <FontAwesomeIcon icon={faInfoCircle} /> Sobre
                  </a>
                </li>
              </ul>
            </div>
          )}
        </div>
      </nav>

      {/* Modal "Sobre" */}
      <Modal show={showAboutModal} onHide={handleCloseAbout}>
        <Modal.Header closeButton>
          <Modal.Title>Sobre</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Esta é uma intranet desenvolvida para facilitar a comunicação interna.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseAbout}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal "Ajuda" */}
      <Modal show={showHelpModal} onHide={handleCloseHelp}>
        <Modal.Header closeButton>
          <Modal.Title>Ajuda</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Esta seção oferece informações e suporte.</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseHelp}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Componente de Resultados da Pesquisa */}
      <SearchResults
        show={showSearchResults}
        results={searchResults}
        onClose={() => setShowSearchResults(false)} // Fecha o modal ao clicar no botão de fechar
      />
    </>
  );
};

export default NavBar;

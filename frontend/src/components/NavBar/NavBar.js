import React, { useState, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faHome, faUsers, faBong, faDollarSign, faBullhorn, faDesktop, faNewspaper, faInfoCircle } from '@fortawesome/free-solid-svg-icons';
import SearchResults from '../SearchResults/SearchResults';
import './NavBar.css';

const NavBar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [showInfoModal, setShowInfoModal] = useState(false); // Estado para o modal de informações
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState([]);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleSearch = () => {
    // Dados de exemplo para pesquisa
    const data = [
      { id: 1, title: 'Home', content: 'Bem-vindo ao portal' },
      { id: 2, title: 'Recursos Humanos', content: 'Informações sobre RH' },
      { id: 3, title: 'Qualidade', content: 'Informações sobre qualidade' },
      { id: 4, title: 'Documentos', content: 'Documentos importantes' },
    ];

    const results = data.filter(item =>
      item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      item.content.toLowerCase().includes(searchTerm.toLowerCase())
    );

    setSearchResults(results);
    setShowSearchResults(true);
  };

  const openInfoModal = () => {
    setShowInfoModal(true);
  };

  const closeInfoModal = () => {
    setShowInfoModal(false);
  };

  return (
    <>
      <nav className="navbar navbar-dark navbar-expand-lg bg-dark">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <div className="collapse navbar-collapse" id="navbarSupportedContent">
            <ul className="navbar-nav me-auto mb-2 mb-lg-0">
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/">
                  <FontAwesomeIcon icon={faHome} /> Home
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/rh">
                  <FontAwesomeIcon icon={faUsers} /> Recursos Humanos
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/qualidade">
                  <FontAwesomeIcon icon={faBong} /> Qualidade
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/documents">
                  <FontAwesomeIcon icon={faDollarSign} /> Financeiro
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/fique-por-dentro">
                  <FontAwesomeIcon icon={faBullhorn} /> Marketing
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/postar">
                  <FontAwesomeIcon icon={faNewspaper} /> Postar
                </NavLink>
              </li>
              <li className="nav-item">
                <NavLink className="nav-link" exact to="/chat">
                  <FontAwesomeIcon icon={faDesktop} /> Chat
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Ícone de Hamburger no lado direito */}
          <div className="d-flex align-items-center">
            <FontAwesomeIcon icon={faBars} className="text-white me-2" onClick={openInfoModal} style={{ cursor: 'pointer' }} />
          </div>
        </div>
      </nav>

      {/* Modal com informações sobre o sistema */}
      {showInfoModal && (
        <div className="modal d-block" tabIndex="-1">
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Informações sobre o Sistema</h5>
                <button type="button" className="btn-close" onClick={closeInfoModal}></button>
              </div>
              <div className="modal-body">
                <p>Este sistema foi desenvolvido para facilitar o acesso às informações internas da empresa.</p>
                <ul>
                  <li>Versão: 1.0.0</li>
                  <li>Desenvolvido por: Equipe de TI</li>
                  <li>Contato: suporte@empresa.com</li>
                </ul>
              </div>
              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" onClick={closeInfoModal}>Fechar</button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Modal de Resultados da Pesquisa */}
      <SearchResults show={showSearchResults} onHide={() => setShowSearchResults(false)} results={searchResults} />
    </>
  );
};

export default NavBar;

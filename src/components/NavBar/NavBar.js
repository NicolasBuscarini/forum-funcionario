import React, { useState, useRef, useEffect } from 'react';
import { NavLink } from 'react-router-dom';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faQuestionCircle, faInfoCircle, faSearch } from '@fortawesome/free-solid-svg-icons';
import { Modal, Button } from 'react-bootstrap';
import './NavBar.css';
import { faBong, faFileText, faFolderOpen, faHome, faUsers, faCalendarAlt, faPhone, faDesktop, faNewspaper,faDollarSign, faBullhorn } from '@fortawesome/free-solid-svg-icons';
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
              <span className="text">Pagina Inicial</span>
            </NavLink>
            <NavLink className="nav-link" exact to="/rh">
              <span className="icon"><FontAwesomeIcon icon={faUsers} /></span>
              <span className="text">Recursos Humanos (RH)</span>
            </NavLink>
            <NavLink className="nav-link" exact to="/qualidade">
              <span className="icon"><FontAwesomeIcon icon={faBong} /></span>
              <span className="text">Qualidade</span>
            </NavLink>
            <NavLink className="nav-link" exact to="/documentos">
              <span className="icon"><FontAwesomeIcon icon={faDollarSign} /></span>
              <span className="text">Financeiro</span>
            </NavLink>
            <NavLink className="nav-link" exact to="/fique-por-dentro">
              <span className="icon"><FontAwesomeIcon icon={faBullhorn} /></span>
              <span className="text">Marketing</span>
            </NavLink>
            <NavLink className="nav-link" to="/suporte">
              <span className="icon"><FontAwesomeIcon icon={faDesktop} /></span>
              <span className="text">TI</span>
            </NavLink>
            <NavLink className="nav-link" to="/postar">
              <span className="icon"><FontAwesomeIcon icon={faNewspaper} /></span>
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
          <h5>Autor: Ronaldo Buscarini</h5>
          <p>Versão: 1.0</p>
          <h6>Tecnologias Utilizadas:</h6>
          <ul>
            <li>
              <strong>React</strong> - Linguagem: JavaScript <br />
              Descrição: React é utilizado para criar a interface de usuário (UI) da aplicação. Componentes reutilizáveis e gerenciamento de estado via useState e useEffect são fundamentais para a estrutura do projeto.
            </li>
            <li>
              <strong>Axios</strong> - Biblioteca: axios <br />
              Descrição: Axios é usado para fazer requisições HTTP assíncronas, buscando dados da API REST no back-end.
            </li>
            <li>
              <strong>Context API (React)</strong> <br />
              Descrição: A Context API do React gerencia o estado de autenticação e outros dados globais entre componentes sem necessidade de props.
            </li>
            <li>
              <strong>Bootstrap</strong> - Biblioteca: bootstrap <br />
              Descrição: Bootstrap é utilizado para estilização e layout da interface de maneira responsiva.
            </li>
            <li>
              <strong>CSS</strong> - Arquivo: ./Home.css <br />
              Descrição: Arquivo de estilo customizado que define a aparência e espaçamento específico dos componentes.
            </li>
            <li>
              <strong>Componentes Customizados</strong> <br />
              Descrição: Componentes React específicos criados para encapsular funcionalidades e apresentar diferentes partes da interface.
            </li>
            <li>
              <strong>Autenticação JWT</strong> <br />
              Descrição: Tokens JWT são usados para proteger as rotas da API, enviando o token no cabeçalho Authorization: Bearer.
            </li>
            <li>
              <strong>API REST (Back-end em .NET)</strong> - Tecnologia: .NET Core/ASP.NET <br />
              Descrição: O back-end que expõe as APIs REST é feito em .NET, lidando com rotas de autenticação e gestão de dados.
            </li>
            <li>
              <strong>RabbitMQ</strong> <br />
              Descrição: RabbitMQ é utilizado para gerenciamento de filas assíncronas, como envio de notificações.
            </li>
            <li>
              <strong>Node.js (Microserviço ou Middleware)</strong> <br />
              Descrição: Node.js pode ser utilizado como middleware para operações de entrada e saída rápidas.
            </li>
            <li>
              <strong>Docker</strong> <br />
              Descrição: Docker é utilizado para criar ambientes isolados para execução do front-end, back-end e serviços de mensageria.
            </li>
            <li>
              <strong>Configuração via Docker Compose</strong> <br />
              Descrição: Docker Compose é usado para orquestrar os containers necessários, facilitando o deploy.
            </li>
            <li>
              <strong>Variáveis de Configuração</strong> - Arquivo: ../../config <br />
              Descrição: As variáveis como apiBaseUrl centralizam a configuração de endpoints.
            </li>
            <li>
              <strong>.NET Core/ASP.NET para Back-End</strong> - Linguagem: C# <br />
              Descrição: O back-end é implementado em .NET Core ou ASP.NET, responsável por lidar com as requisições de autenticação.
            </li>
          </ul>
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
          <h5>Bem-vindo à seção de Ajuda!</h5>
          <p>Aqui estão algumas informações úteis para ajudá-lo a navegar e utilizar o portal:</p>
          
          <h6>Como Navegar no Portal</h6>
          <p>Use a barra de navegação para acessar diferentes seções, como Recursos Humanos e Documentos.</p>
          
          <h6>Funcionalidades Principais</h6>
          <ul>
            <li>Acesse documentos importantes na seção de Documentos.</li>
            <li>Participe das discussões na seção de Postagens.</li>
            <li>Consulte informações sobre Recursos Humanos na seção específica.</li>
          </ul>
          
          <h6>Problemas Comuns e Soluções</h6>
          <ul>
            <li>Se você tiver problemas para fazer login, verifique suas credenciais ou use a opção de redefinir senha.</li>
            <li>Para dúvidas sobre como utilizar uma funcionalidade específica, consulte a seção correspondente do portal.</li>
          </ul>
          
          <h6>Suporte</h6>
          <p>Entre em contato com nossa equipe de suporte pelo e-mail suporte@exemplo.com ou ligue para (XX) XXXX-XXXX.</p>
          
          <h6>Segurança e Privacidade</h6>
          <p>Seus dados são protegidos por medidas de segurança rigorosas. Certifique-se de usar senhas fortes e não compartilhar suas credenciais.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseHelp}>
            Fechar
          </Button>
        </Modal.Footer>
      </Modal>

      {/* Modal de Resultados da Pesquisa */}
      <SearchResults 
        show={showSearchResults} 
        onHide={() => setShowSearchResults(false)} 
        results={searchResults} 
      />
    </>
  );
};

export default NavBar;

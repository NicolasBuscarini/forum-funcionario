// App.js
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Section from './components/Section/Section';
import Chat from './components/Chat/Chat';
import Footer from './components/Footer/Footer';
import BirthdayBoard from './components/BirthdayBoard/BirthdayBoard';
import CurrentDate from './components/CurrentDate/CurrentDate';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

// Página principal
const Home = () => (
  <div className="container mt-4">
    <div className="row">
      {/* Primeira Coluna (Esquerda) com CurrentDate e BirthdayBoard */}
      <div className="col-md-3">
        <CurrentDate />
        <BirthdayBoard />
      </div>

      {/* Segunda Coluna (Centro) com as Seções Principais */}
      <div className="col-md-6">
        <Section id="rh" title="Recursos Humanos" content="Informações sobre políticas, benefícios e formulários." />
        <Section 
          id="documentos" 
          title="Documentos" 
          content="Acesso a manuais e procedimentos internos." 
          link="/etiqueta-bruto.pdf" 
          linkText="Download do arquivo PDF"
        />
        <Section id="treinamentos" title="Treinamentos" content="Cursos e materiais disponíveis para os funcionários." />
        <Section id="suporte" title="Suporte" content="Informações de suporte técnico e FAQs." />
        <Section id="saude" title="Saúde e Bem-estar" content="Dicas e programas de bem-estar para funcionários." />
        <Section id="comunicacao" title="Comunicação Interna" content="Últimos boletins e comunicados da empresa." />
      </div>

      {/* Terceira Coluna (Direita) com Chat */}
      <div className="col-md-3">
        <Chat />
      </div>
    </div>
  </div>
);

// Página adicional
const NewPage = () => (
  <div className="container mt-4">
    <h2>Nova Página</h2>
    <p>Conteúdo específico desta nova página.</p>
    <Link to="/" className="btn btn-primary mt-3">Voltar para a Página Principal</Link>
  </div>
);

const App = () => {
  return (
    <Router>
      <Header />
      <NavBar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/new-page" element={<NewPage />} />
      </Routes>
      <Footer />
    </Router>
  );
};

export default App;

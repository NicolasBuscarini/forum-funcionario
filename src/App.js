// App.js
import React from 'react';
import Header from './components/Header/Header';
import NavBar from './components/NavBar/NavBar';
import Section from './components/Section/Section';
import Chat from './components/Chat/Chat';
import Footer from './components/Footer/Footer';
import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';

const App = () => {
  return (
    <div className="App">
      <Header />
      <NavBar />
      <div className="container mt-4">
        <div className="row">
          <div className="col-md-8">
            <Section id="rh" title="Recursos Humanos" content="Informações sobre políticas, benefícios e formulários." />
            <Section id="documentos" title="Documentos" content="Acesso a manuais e procedimentos internos." />
            <Section id="treinamentos" title="Treinamentos" content="Cursos e materiais disponíveis para os funcionários." />
            <Section id="suporte" title="Suporte" content="Informações de suporte técnico e FAQs." />
            <Section id="saude" title="Saúde e Bem-estar" content="Dicas e programas de bem-estar para funcionários." />
            <Section id="comunicacao" title="Comunicação Interna" content="Últimos boletins e comunicados da empresa." />
          </div>

          <div className="col-md-4">
            <Chat />
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
};

export default App;

import React, { useContext, useEffect, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import BirthdayBoard from "../../components/BirthdayBoard/BirthdayBoard"; 
import PhoneList from "../../components/PhoneList/PhoneList";
import Chat from "../Chat/ChatPage";
import { AuthContext } from "../../context/AuthContext";
import { Card, Button, Row, Col } from "react-bootstrap";
import { apiBaseUrl } from "../../config";
import { Link } from "react-router-dom";

const Home = () => {
  const { authData } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!authData || !authData.token) {
          throw new Error('Você precisa estar autenticado para ver os posts.');
        }

        const response = await fetch(`http://${apiBaseUrl}:5011/api/Post/recentes`, {
          headers: {
            Authorization: `Bearer ${authData.token}`,
          },
        });

        if (!response.ok) {
          throw new Error('Erro ao buscar postagens');
        }

        const data = await response.json();
        setPosts(data.data);
      } catch (error) {
        console.error("Erro ao buscar postagens:", error);
        setError(error.message);
      }
    };

    fetchPosts();
  }, [authData]);

  return (
    <div className="container my-4">
      <h2 className="text-center">Bem-vindo à Intranet</h2>
      
      {/* Seção de cards principais */}
      <Row>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Dashboard</Card.Title>
              <Card.Text>Visualize suas atividades e metas.</Card.Text>
              <Button variant="primary">Acessar Dashboard</Button>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Recursos Humanos</Card.Title>
              <Card.Text>Fique por dentro das últimas atualizações.</Card.Text>
              <Link to="/rh" className="btn btn-primary">Ver Notícias</Link>
            </Card.Body>
          </Card>
        </Col>
        <Col md={4}>
          <Card className="mb-4 shadow-sm">
            <Card.Body>
              <Card.Title>Documentos Importantes</Card.Title>
              <Card.Text>Acesse documentos essenciais para sua rotina.</Card.Text>
              <Button variant="primary">Acessar Documentos</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Seção de Últimas Notícias */}
      <Row>
        <Col md={12}>
          <h4>Últimas Notícias</h4>
          {error && <p>Erro: {error}</p>}
          {posts.length > 0 ? (
            posts.map((post) => (
              <Card key={post.id} className="mb-3 shadow-sm">
                <Card.Body>
                  <Card.Title>{post.titulo}</Card.Title>
                  <h6 className="text-info">{post.categoria}</h6> {/* Subtítulo da categoria */}
                  <Card.Text>{post.conteudo}</Card.Text>
                  <Card.Text className="text-muted">
                    Autor: {post.autor} | Criado em: {new Date(post.dataCriacao).toLocaleString()}
                  </Card.Text>
                </Card.Body>
              </Card>
            ))
          ) : (
            <p>Nenhuma postagem encontrada.</p>
          )}
        </Col>
      </Row>

      {/* Seção de aniversariantes e ramais */}
      <Row>
        <Col md={6}>
          <BirthdayBoard /> {/* Calendário de aniversariantes */}
        </Col>
        <Col md={6}>
          <PhoneList /> {/* Lista de ramais */}
        </Col>
      </Row>

      {/* Seção de Chat */}
      <div className="my-4 text-center">
        <h4>Converse com sua equipe</h4>
        <Link to="/chat" className="btn btn-success">Acessar Chat</Link>
      </div>
    </div>
  );
};

export default Home;

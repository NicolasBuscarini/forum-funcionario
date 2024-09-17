// Home.js
import React from "react";
import Announcements from "../../components/Home/Announcements";
import PopularTopics from "../../components/Home/PopularTopics";
import ActivityFeed from "../../components/Home/ActivityFeed";
import { Container, Row, Col, Card } from "react-bootstrap";


const Home = () => {
  return (
    <div>
      {/* Banner de boas-vindas */}
      <Card className="text-center bg-primary text-white mb-4">
        <Card.Body>
          <Card.Title>Bem-vindo ao Portal do Colaborador!</Card.Title>
          <Card.Text>Acompanhe as últimas novidades e interaja com seus colegas.</Card.Text>
        </Card.Body>
      </Card>

      <Row>
        {/* Anúncios recentes */}
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header as="h5">Anúncios Recentes</Card.Header>
            <Card.Body>
              <Announcements />
            </Card.Body>
          </Card>
        </Col>

        {/* Tópicos populares no fórum */}
        <Col md={6} className="mb-4">
          <Card>
            <Card.Header as="h5">Tópicos Populares</Card.Header>
            <Card.Body>
              <PopularTopics />
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Feed de atividades */}
      <Row>
        <Col>
          <Card>
            <Card.Header as="h5">Feed de Atividades</Card.Header>
            <Card.Body>
              <ActivityFeed />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default Home;

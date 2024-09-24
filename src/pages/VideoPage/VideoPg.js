// VideoPg.js
import React from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import "./VideoPg.css";




const VideoPg = () => {
  return (
    <div>
      {/* Título principal da página */}
      <Row className="mb-4">
        <Col>
          <Card className="text-center bg-info text-white">
            <Card.Body>
              <Card.Title>Treinamento em Vídeo</Card.Title>
              <Card.Text>Assista ao vídeo abaixo para obter mais informações.</Card.Text>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      {/* Seção de Vídeo */}
      <iframe width="560" height="315" src="https://www.youtube.com/embed/1S7WnR2HgJw?si=FTXwNodE8bdnQsYp" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>
    </div>
  );
};

export default VideoPg;

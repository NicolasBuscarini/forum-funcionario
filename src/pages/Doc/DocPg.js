import React from "react";
import { Col, Card, ListGroup } from "react-bootstrap";
import "./DocPg.css";

const DocPg = () => {
  return (
    <div>
      {/* Título principal da página */}
      <Card className="text-center bg-info text-white mb-4">
        <Card.Body>
          <Card.Title>Documentos</Card.Title>
          <Card.Text>Aqui você pode fazer o download dos documentos.</Card.Text>
        </Card.Body>
      </Card>

      {/* Seção de Documentos Importantes */}
      <Col md={4} className="mb-4">
        <Card>
          <Card.Header as="h5">Documentos Importantes</Card.Header>
          <Card.Body>
            <ListGroup>
              <ListGroup.Item>
                <a href="/docs/politica-beneficios.pdf" download>Política de Benefícios</a>
              </ListGroup.Item>
              <ListGroup.Item>
                <a href="/docs/manual-colaborador.pdf" download>Manual do Colaborador</a>
              </ListGroup.Item>
              <ListGroup.Item>
                <a href="/docs/regulamento-interno.pdf" download>Regulamento Interno</a>
              </ListGroup.Item>
              <ListGroup.Item>
                <a href="/docs/ferias-2024.pdf" download>Calendário de Férias 2024</a>
              </ListGroup.Item>
            </ListGroup>
          </Card.Body>
        </Card>
      </Col>
    </div>
  );
};

export default DocPg;

// HRPage.js
import React from "react";
import { Container, Row, Col, Card, Button, ListGroup } from "react-bootstrap";
import "./HRPage.css";

const HRPage = () => {
  return (
    <div>
      {/* Título principal da página */}
      <Card className="text-center bg-info text-white mb-4">
        <Card.Body>
          <Card.Title>Recursos Humanos</Card.Title>
          <Card.Text>Informações importantes sobre benefícios, documentos e contato com a equipe de RH</Card.Text>
        </Card.Body>
      </Card>

      <Row>
        {/* Seção de Benefícios */}
        <Col md={4} className="mb-4">
          <Card>
            <Card.Header as="h5">Benefícios</Card.Header>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  <strong>Vale Alimentação:</strong> Até R$ 500,00/mês
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Plano de Saúde:</strong> Cobertura total
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Vale Transporte:</strong> Subsídio integral
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Seguro de Vida:</strong> Cobertura para acidentes e invalidez
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>

        
        {/* Seção de Contato do RH */}
        <Col md={4} className="mb-4">
          <Card>
            <Card.Header as="h5">Contato do RH</Card.Header>
            <Card.Body>
              <p><strong>Email:</strong> rh@empresa.com.br</p>
              <p><strong>Telefone:</strong> (11) 1234-5678</p>
              <p><strong>Horário de Atendimento:</strong> Seg-Sex, 9h - 17h</p>
              <Button variant="primary" href="mailto:rh@empresa.com.br">Enviar Email</Button>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row>
        {/* Seção de Perguntas Frequentes */}
        <Col>
          <Card>
            <Card.Header as="h5">Perguntas Frequentes (FAQ)</Card.Header>
            <Card.Body>
              <ListGroup>
                <ListGroup.Item>
                  <strong>Como solicito minhas férias?</strong> Envie um email para rh@empresa.com.br com suas datas preferidas.
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Como faço para atualizar meus dados cadastrais?</strong> Entre em contato com o RH por email ou telefone.
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Posso solicitar adiantamento do 13º salário?</strong> Sim, verifique o regulamento interno para mais informações.
                </ListGroup.Item>
                <ListGroup.Item>
                  <strong>Como consultar meus holerites?</strong> Utilize o sistema de gestão de pessoas ou contate o RH.
                </ListGroup.Item>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default HRPage;

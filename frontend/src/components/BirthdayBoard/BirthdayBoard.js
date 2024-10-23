import React, { useEffect, useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import { Card, ListGroup, Row, Col, Alert } from 'react-bootstrap';
import { apiBaseUrl } from '../../config';
import './BirthdayBoard.css'; // Custom CSS

const BirthdayBoard = () => {
  const [birthdays, setBirthdays] = useState([]);
  const [selectedDate, setSelectedDate] = useState(new Date());

  const mockBirthdays = [
    { nome: 'João Silva', dia: 5, mes: 9, filial: 'Filial 1', descricao: 'CTT1' },
    { nome: 'Nicolas', dia: 5, mes: 9, filial: 'Filial 2', descricao: 'CTT2' },
    { nome: 'Ronaldo', dia: 5, mes: 9, filial: 'Filial 3', descricao: 'CTT3' },
    { nome: 'Maria Santos', dia: 12, mes: 9, filial: 'Filial 1', descricao: 'CTT1' },
    { nome: 'Carlos Souza', dia: 20, mes: 9, filial: 'Filial 2', descricao: 'CTT2' },
    { nome: 'Ana Pereira', dia: 25, mes: 9, filial: 'Filial 3', descricao: 'CTT3' },
  ];

  const fetchBirthdays = async () => {
    try {
      const response = await fetch(`http://${apiBaseUrl}:5011/api/Employee/current-month`);
      const jsonResponse = await response.json();
      setBirthdays(jsonResponse.data);
    } catch (error) {
      console.error('Erro ao buscar aniversariantes:', error);
      setBirthdays(mockBirthdays);
    }
  };

  useEffect(() => {
    fetchBirthdays();
  }, []);

  const tileContent = ({ date, view }) => {
    if (view === 'month') {
      const day = date.getDate();
      const month = date.getMonth() + 1;
      const hasBirthday = birthdays.some(birthday => birthday.dia === day && birthday.mes === month);
      if (hasBirthday) {
        return <span role="img" aria-label="birthday">🎂</span>;
      }
    }
    return null;
  };

  const getBirthdaysForSelectedDate = () => {
    return birthdays.filter(birthday => birthday.dia === selectedDate.getDate() && birthday.mes === selectedDate.getMonth() + 1);
  };

  return (
    <Card className="mb-4 shadow-lg same-height-card">
      <Card.Header className="bg-primary text-white">
        <Row>
          <Col><h5>Aniversariantes</h5></Col>
        </Row>
      </Card.Header>
      <Card.Body>
        <Row>
          <Col md={6} className="calendar-column">
            <Calendar
              onChange={setSelectedDate}
              value={selectedDate}
              tileContent={tileContent}
            />
          </Col>
          <Col md={6} className="birthday-list-column">
            <h6>Aniversariantes do dia {selectedDate.toLocaleDateString()}:</h6>
            <ListGroup className="mt-3 birthday-list">
              {getBirthdaysForSelectedDate().length > 0 ? (
                getBirthdaysForSelectedDate().map((birthday, index) => (
                  <ListGroup.Item key={index} className="d-flex justify-content-between align-items-center">
                    <div>
                      <strong>{birthday.nome}</strong> - {birthday.descricao}
                    </div>
                    <small className="text-muted">{birthday.filial}</small>
                  </ListGroup.Item>
                ))
              ) : (
                <Alert variant="info" className="mt-3">Nenhum aniversariante neste dia.</Alert>
              )}
            </ListGroup>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default BirthdayBoard;

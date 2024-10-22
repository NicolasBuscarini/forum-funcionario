import React from "react";
import { Card, ListGroup } from "react-bootstrap";
import './PhoneList.css'; // Custom CSS

const PhoneList = () => {
  const extensions = [
    { name: "João Silva", extension: "101", department: "Suporte", location: "Filial 1" },
    { name: "Ana Pereira", extension: "108", department: "Desenvolvimento", location: "Filial 1" },
    { name: "Paulo Martins", extension: "107", department: "Operações", location: "Filial 1" },
    { name: "Pedro Soares", extension: "110", department: "Administração", location: "Filial 1" },
    { name: "Maria Souza", extension: "102", department: "Financeiro", location: "Filial 2" },
    { name: "Ricardo Oliveira", extension: "105", department: "TI", location: "Filial 2" },
    { name: "Fernanda Lima", extension: "112", department: "Logística", location: "Filial 2" },
    { name: "Carlos Pereira", extension: "103", department: "Recursos Humanos", location: "Filial 3" },
    { name: "Sandra Gomes", extension: "106", department: "Vendas", location: "Filial 3" },
    { name: "Rodrigo Medeiros", extension: "113", department: "Compras", location: "Filial 3" },
  ];

  const groupedByLocation = extensions.reduce((acc, person) => {
    const { location } = person;
    if (!acc[location]) {
      acc[location] = [];
    }
    acc[location].push(person);
    return acc;
  }, {});

  return (
    <Card className="mb-4 shadow-lg same-height-card">
      <Card.Header className="bg-primary text-white">
        <h5>Lista de Ramais</h5>
      </Card.Header>
      <Card.Body className="phone-list-body">
        {Object.keys(groupedByLocation).map((location, index) => (
          <div key={index} className="mb-3">
            <h6>{location}</h6>
            <ListGroup variant="flush" className="phone-list">
              {groupedByLocation[location].map((person, idx) => (
                <ListGroup.Item key={idx} className="d-flex justify-content-between align-items-center">
                  <div>
                    <strong>{person.name}</strong> - {person.department}
                  </div>
                  <span className="badge bg-secondary">{person.extension}</span>
                </ListGroup.Item>
              ))}
            </ListGroup>
          </div>
        ))}
      </Card.Body>
    </Card>
  );
};

export default PhoneList;

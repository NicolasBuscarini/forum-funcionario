// Announcements.js
import React from "react";
import { ListGroup } from "react-bootstrap";

const Announcements = () => {
  const announcements = [
    { id: 1, title: "Feriado prolongado em outubro", date: "15/09/2024" },
    { id: 2, title: "Nova política de home office", date: "10/09/2024" },
    { id: 3, title: "Reunião geral da empresa", date: "08/09/2024" },
  ];

  return (
    <ListGroup>
      {announcements.map((announcement) => (
        <ListGroup.Item key={announcement.id}>
          <strong>{announcement.title}</strong>
          <span className="text-muted float-end">({announcement.date})</span>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Announcements;

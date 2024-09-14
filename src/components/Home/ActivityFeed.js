// ActivityFeed.js
import React from "react";
import { ListGroup } from "react-bootstrap";

const ActivityFeed = () => {
  const activities = [
    {
      id: 1,
      user: "João",
      action:
        "postou um novo tópico: 'Sugestões para o próximo evento da empresa'",
      time: "há 2 horas",
    },
    {
      id: 2,
      user: "Maria",
      action:
        "respondeu ao tópico: 'Benefícios de utilizar Kanban no trabalho'",
      time: "há 3 horas",
    },
    {
      id: 3,
      user: "Pedro",
      action: "curtiu a postagem de Ana",
      time: "há 5 horas",
    },
  ];

  return (
    <ListGroup>
      {activities.map((activity) => (
        <ListGroup.Item key={activity.id}>
          <strong>{activity.user}</strong> {activity.action}
          <span className="text-muted float-end">{activity.time}</span>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default ActivityFeed;

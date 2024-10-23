// PopularTopics.js
import React from "react";
import { ListGroup, Badge } from "react-bootstrap";

const PopularTopics = () => {
  const topics = [
    { id: 1, title: "Dicas de produtividade no home office", replies: 15 },
    { id: 2, title: "Treinamento: novas ferramentas de gestão", replies: 8 },
    { id: 3, title: "Ajuda com projetos colaborativos", replies: 20 },
  ];

  return (
    <ListGroup>
      {topics.map((topic) => (
        <ListGroup.Item key={topic.id}>
          {topic.title}
          <Badge bg="secondary" className="float-end">
            {topic.replies} respostas
          </Badge>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default PopularTopics;

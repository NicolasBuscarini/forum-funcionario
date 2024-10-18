// SearchResults.js
import React from 'react';
import { Modal } from 'react-bootstrap';

const SearchResults = ({ show, results, onClose }) => {
  return (
    <Modal show={show} onHide={onClose} size="lg">
      <Modal.Header closeButton>
        <Modal.Title>Resultados da Pesquisa</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {results.length > 0 ? (
          <ul>
            {results.map((result) => (
              <li key={result.id}>
                <strong>{result.title}</strong>: {result.content}
              </li>
            ))}
          </ul>
        ) : (
          <p>Nenhum resultado encontrado.</p>
        )}
      </Modal.Body>
    </Modal>
  );
};

export default SearchResults;

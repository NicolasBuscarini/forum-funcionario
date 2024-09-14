// Section.js
import React from 'react';

const Section = ({ id, title, content, link, linkText }) => {
  return (
    <section id={id} className="mb-4">
      <h2>{title}</h2>
      <p>{content}</p>
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer">
          {linkText || 'Clique aqui para acessar'}
        </a>
      )}
    </section>
  );
};

export default Section;

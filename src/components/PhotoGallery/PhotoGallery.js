// PhotoGallery.js
import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import 'bootstrap-icons/font/bootstrap-icons.css';

const imageFolderPath = "/Imagens"; // Caminho relativo para a pasta de imagens

const PhotoGallery = () => {
  const photos = [
    `${imageFolderPath}/capa.jpg`,
    `${imageFolderPath}/livros.jpg`,
    `${imageFolderPath}/marketing.jpg`,
    `${imageFolderPath}/rede.jpg`,
    // Adicione mais fotos conforme necessário
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  const handleNext = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === photos.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handlePrev = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? photos.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="photo-gallery">
         
      <h2 className="photo-gallery-title text-center">
      <i className="bi bi-card-image"></i> {/* Ícone de bolo com margem direita */}
        Galeria de Fotos
      </h2>
      <div className="text-center">
        <img
          src={photos[currentIndex]}
          alt={`Foto ${currentIndex + 1}`}
          className="img-fluid mb-3" // Use mb-3 para margem inferior
          style={{ height: "300px", width: "400px", objectFit: "cover" }} // Defina altura e largura fixas
        />
        <div>
          <button className="btn btn-outline-primary me-2" onClick={handlePrev}>
            <i className="bi bi-arrow-left"></i> Anterior
          </button>
          <button className="btn btn-outline-primary" onClick={handleNext}>
            Próximo <i className="bi bi-arrow-right"></i>
          </button>
        </div>
      </div>
    </div>
  );
};

export default PhotoGallery;

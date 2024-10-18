import React, { useContext } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import BirthdayBoard from "../../components/BirthdayBoard/BirthdayBoard";
import PhoneList from "../../components/PhoneList/PhoneList";
import Chat from "../../components/Chat/Chat";
import PhotoGallery from "../../components/PhotoGallery/PhotoGallery";
import Posts from "../../components/Posts/Posts"; 
import { AuthContext } from "../../context/AuthContext";
import { Card } from "react-bootstrap"; // Certifique-se de importar o Card

const Home = () => {
  const { authData } = useContext(AuthContext);

  return (
    <div className="home-container container-fluid mt-4">
      {/* Faixa com o card */}
      <Card className="text-center home-card mb-4">
        <Card.Body>
          <Card.Title as="h1">Conectando pessoas e informações: a intranet que transforma a nossa comunicação.</Card.Title>
          <Card.Text as="h4">Fazendo da nossa empresa um ótimo lugar para trabalhar, todos os dias!</Card.Text>
        </Card.Body>
      </Card>

      <div className="row g-3">
        {/* Primeira coluna: BirthdayBoard, PhotoGallery e PhoneList */}
        <div className="home-left-col col-xl-3 col-md-3 mb-2">
          <BirthdayBoard />
          <PhotoGallery className="mt-3" />
          <PhoneList />
        </div>

        {/* Segunda coluna: Posts */}
        <div className="home-center-col col-xl-6 col-md-6 mb-2">
          <Posts />
        </div>

        {/* Terceira coluna: Chat */}
        <div className="home-right-col col-xl-3 col-md-3 mb-2">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Home;

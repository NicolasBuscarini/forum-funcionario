// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header/Header";
import NavBar from "./components/NavBar/NavBar";
import Chat from "./components/Chat/Chat";
import Footer from "./components/Footer/Footer";
import BirthdayBoard from "./components/BirthdayBoard/BirthdayBoard";
import CurrentDate from "./components/CurrentDate/CurrentDate";
import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import Home from "./pages/Home/Home";
import HRPage from "./pages/HRPage/HRPage";
import DocPg from "./pages/Doc/DocPg.js";



const App = () => {
  return (
    <Router>
      <Header />
      <NavBar />

      <div className="container-fluid mt-4 mb-4">
        <div className="row">
          <div className="col-lg-2">
            <CurrentDate />
            <BirthdayBoard />
          </div>

          <div className="col-lg-7">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/rh" element={<HRPage />} />
              <Route path="/Documentos" element={<DocPg />} />
            </Routes>
          </div>

          <div className="col-lg-3">
            <Chat />
          </div>
        </div>
      </div>

      <Footer />
    </Router>
  );
};

export default App;

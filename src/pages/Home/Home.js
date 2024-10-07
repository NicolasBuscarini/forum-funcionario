// Home.js
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import BirthdayBoard from "../../components/BirthdayBoard/BirthdayBoard";
import PhoneList from "../../components/PhoneList/PhoneList"; // Importe o novo componente
import Chat from "../../components/Chat/Chat";
import { apiBaseUrl } from '../../config';

const Home = () => {
  const { authData, logout } = useContext(AuthContext);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        if (!authData || !authData.token) {
          throw new Error("Você precisa estar autenticado para ver os posts.");
        }

        const response = await axios.get(
          `http://${apiBaseUrl}:5011/api/Post/recentes`,
          {
            headers: {
              Authorization: `Bearer ${authData.token}`,
            },
          }
        );
        setPosts(response.data);
      } catch (err) {
        if (err.response && err.response.status === 401) {
          logout(); // Log out if unauthorized
        }
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, [authData, logout]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-danger">Error: {error}</p>;

  return (
    <div className="container-fluid mt-4">
      <div className="row g-3">
        {/* Primeira coluna: BirthdayBoard */}
        <div className="col-xl-3 col-md-3 mb-2">
          <BirthdayBoard />
          <PhoneList /> {/* Adicione o novo componente aqui */}
        </div>

        {/* Segunda coluna: Posts */}
        <div className="col-xl-6 col-md-6 mb-2">
          <h2 className="home-title text-center">
            <i className="bi bi-file-post"></i>
            Aqui você pode acompanhar as últimas postagens
          </h2>

          <div className="list-group">
            {posts.data.map((post) => (
              <div key={post.id} className="list-group-item">
                <h4>{post.categoria}</h4>
                <h5 className="mb-1">{post.titulo}</h5>
                <p className="mb-1">{post.conteudo}</p>
                <small>
                  Autor: {post.autor} | Criado em:{" "}
                  {new Date(post.dataCriacao).toLocaleString()}
                </small>
              </div>
            ))}
          </div>
        </div>

        {/* Terceira coluna: Chat */}
        <div className="col-xl-3 col-md-3 mb-2">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Home;

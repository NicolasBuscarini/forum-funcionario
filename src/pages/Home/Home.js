// Home.js
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import "bootstrap/dist/css/bootstrap.min.css";
import "./Home.css";
import BirthdayBoard from "../../components/BirthdayBoard/BirthdayBoard";
import Chat from "../../components/Chat/Chat";

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
          "http://localhost:5011/api/Post/recentes",
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
    <div className="row">
      <div className="col-xl-3 mb-2">
        <BirthdayBoard />
      </div>

      <div className="container-custom">
        <h2>Aqui você pode acompanhar as últimas postagens</h2>
        <div className="list-group">
          {posts.map((post) => (
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
        <div className="col-xl-3 mb-2">
          <Chat />
        </div>
      </div>
    </div>
  );
};

export default Home;

// src/components/Posts/Posts.js
import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import { AuthContext } from "../../context/AuthContext";
import { apiBaseUrl } from "../../config";
import './Posts.css'; // Importando o CSS exclusivo

const Posts = () => {
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
          logout();
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
    <div className="posts-container">
      <h2 className="posts-title text-center">
        <i className="bi bi-file-post"></i>
        Acompanhe as últimas postagens
      </h2>
      {posts.data.map((post) => (
        <div key={post.id} className="post-item">
          <h4 className="post-category">{post.categoria}</h4>
          <h5 className="post-title mb-1">{post.titulo}</h5>
          <p className="post-content mb-1">{post.conteudo}</p>
          <small className="post-meta">
            Autor: {post.autor} | Criado em:{" "}
            {new Date(post.dataCriacao).toLocaleString()}
          </small>
        </div>
      ))}
    </div>
  );
};

export default Posts;


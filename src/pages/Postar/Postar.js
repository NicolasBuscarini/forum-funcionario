import React, { useState, useContext } from 'react';
import { AuthContext } from '../../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { apiBaseUrl } from '../../config';


const Postar = () => {
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [categoria, setCategoria] = useState('Qualidade'); 
  const [tags, setTags] = useState('');
  const [response, setResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const { authData, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    if (!authData || !authData.token) {
      setError('Você precisa estar autenticado para criar um post.');
      setLoading(false);
      return;
    }

    try {
      const result = await fetch(`http://${apiBaseUrl}:5011/api/Post`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${authData.token}`,
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
        body: JSON.stringify({
          title,
          body,
          categoria,
          tags: tags.split(',').map(tag => tag.trim())
        })
      });

      if (result.status === 401) {
        logout();
        navigate('/login');
        return;
      }

      const data = await result.json();
      setResponse(data);
      console.log('Response:', data);
    } catch (error) {
      console.error('Error:', error);
      setError('Erro ao criar o post. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Criar Novo Post</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label htmlFor="title" className="form-label">Título</label>
          <input
            type="text"
            className="form-control"
            id="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="mb-3">
          <label htmlFor="body" className="form-label">Corpo</label>
          <textarea
            className="form-control"
            id="body"
            rows="3"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            required
          ></textarea>
        </div>
        <div className="mb-3">
          <label htmlFor="categoria" className="form-label">Categoria</label>
          <select
            className="form-control"
            id="categoria"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          >
            <option value="Qualidade">Qualidade</option>
            <option value="Rh">Recursos Humanos</option>
            <option value="Outros">Outros</option>
          </select>
        </div>
        <div className="mb-3">
          <label htmlFor="tags" className="form-label">Tags (separadas por vírgulas)</label>
          <input
            type="text"
            className="form-control"
            id="tags"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <button type="submit" className="btn btn-primary" disabled={loading}>
          {loading ? 'Enviando...' : 'Criar Post'}
        </button>
      </form>

      {error && <p className="text-danger mt-3">{error}</p>}
      {response && (
        <div className="mt-4 alert alert-success">
          <h4 className="alert-heading">Post Criado com Sucesso</h4>
          <pre>{JSON.stringify(response, null, 2)}</pre>
        </div>
      )}
    </div>
  );
};

export default Postar;

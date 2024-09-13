// src/pages/LoginPage/LoginPage.js
import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom'; // Importa useNavigate
import { AuthContext } from '../../context/AuthContext';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Spinner, Alert, Button, Form } from 'react-bootstrap';

const LoginPage = () => {
  const { login } = useContext(AuthContext);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const navigate = useNavigate(); // Cria a função de navegação

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await login(username, password);
      // Redireciona para a página inicial após o login bem-sucedido
      navigate('/');
    } catch (err) {
      console.error('Erro de login:', err); // Para depuração
      const errorMessage = err.response?.data?.mensagem || 'Algo deu errado. Contate o administrador';
      setError(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="mb-4">Login</h2>
      <Form onSubmit={handleSubmit}>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form.Group className="mb-3">
          <Form.Label>Nome de Usuário</Form.Label>
          <Form.Control
            type="text"
            placeholder="Nome de Usuário"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </Form.Group>
        <Form.Group className="mb-3">
          <Form.Label>Senha</Form.Label>
          <Form.Control
            type="password"
            placeholder="Senha"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </Form.Group>
        <Button
          variant="primary"
          type="submit"
          disabled={loading}
        >
          {loading ? (
            <>
              <Spinner animation="border" size="sm" /> Carregando...
            </>
          ) : (
            'Entrar'
          )}
        </Button>
      </Form>
    </div>
  );
};

export default LoginPage;

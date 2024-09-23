// Qualidade.js
import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Card, Col, ListGroup } from 'react-bootstrap'; // Importação dos componentes necessários do Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

const Qualidade = () => {
    const { authData, logout } = useContext(AuthContext);
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                if (!authData || !authData.token) {
                    throw new Error('Você precisa estar autenticado para ver os posts.');
                }

                const response = await axios.get('http://localhost:5011/api/Post/categoria/qualidade', {
                    headers: {
                        Authorization: `Bearer ${authData.token}`
                    }
                });
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
        <div className="container mt-4">
            <div className="row">
                {/* Coluna antes do conteúdo principal */}
                <div className="col-md-2">
                    <div>
                        {/* Título principal da página */}
                        <Card className="text-center bg-info text-white mb-4">
                            <Card.Body>
                                <Card.Title>Documentos</Card.Title>
                                <Card.Text>Aqui você pode fazer o download dos documentos.</Card.Text>
                            </Card.Body>
                        </Card>

                        {/* Seção de Documentos Importantes */}
                        <Col md={12} className="mb-4">
                            <Card>
                                <Card.Header as="h5">Documentos Importantes</Card.Header>
                                <Card.Body>
                                    <ListGroup>
                                        <ListGroup.Item>
                                            <a href="/docs/politica-beneficios.pdf" download>Política de Benefícios</a>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <a href="/docs/manual-colaborador.pdf" download>Manual do Colaborador</a>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <a href="/docs/regulamento-interno.pdf" download>Regulamento Interno</a>
                                        </ListGroup.Item>
                                        <ListGroup.Item>
                                            <a href="/docs/ferias-2024.pdf" download>Calendário de Férias 2024</a>
                                        </ListGroup.Item>
                                    </ListGroup>
                                </Card.Body>
                            </Card>
                        </Col>
                    </div>
                </div>

                {/* Conteúdo principal */}
                <div className="col-md-8">
                    <h2>Posts da Categoria "Qualidade"</h2>
                    <div className="list-group">
                        {posts.map(post => (
                            <div key={post.id} className="list-group-item">
                                <h5 className="mb-1">{post.titulo}</h5>
                                <p className="mb-1">{post.conteudo}</p>
                                <small>Autor: {post.autor} | Criado em: {new Date(post.dataCriacao).toLocaleString()}</small>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Coluna depois do conteúdo principal */}
                <div className="col-md-2">
                    <p>Coluna à direita.</p>
                </div>
            </div>
        </div>
    );
};

export default Qualidade;

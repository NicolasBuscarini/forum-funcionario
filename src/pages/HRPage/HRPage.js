import React, { useEffect, useState, useContext } from 'react';
import axios from 'axios';
import { AuthContext } from '../../context/AuthContext';
import { Card, Col, ListGroup } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import './HRPage.css';
import { Button } from "react-bootstrap";
import { apiBaseUrl } from '../../config';

const HRPage = () => {
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

                const response = await axios.get(`http://${apiBaseUrl}:5011/api/Post/categoria/qualidade`, {
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
    if (error) return <p className="hr-error">Error: {error}</p>;

    return (
        <div className="hr-container mt-1">      
            <div>
                <Card className="text-center hr-card mb-4">
                    <Card.Body>
                        <Card.Title as="h1">Recursos Humanos e Departamento Pessoal</Card.Title>
                        <Card.Text as="h4">Gestão integrada de RH: completa, ágil e automatizada.</Card.Text>
                    </Card.Body>
                </Card>
            </div>

            <div className="row no-gutters">
                {/* Coluna antes do conteúdo principal, agora ocupando 25% da largura */}
                <div className="col-lg-3 col-md-3">
                    <div>
                        {/* Seção de Documentos Importantes */}
                        <Col md={12} className="mb-4 hr-documents">
                            <Card>
                                <Card.Header className="hr-doc-header">Documentos Importantes</Card.Header>
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

                {/* Conteúdo principal ocupando 50% da largura */}
                <div className="col-lg-6 col-md-6 hr-posts">
                    <h2>Posts da Categoria "Recursos Humanos"</h2>
                    <div className="list-group">
                        {posts.data.map(post => (
                            <div key={post.id} className="list-group-item hr-post-item">
                                <h5 className="mb-1">{post.titulo}</h5>
                                <p className="mb-1">{post.conteudo}</p>
                                <small>Autor: {post.autor} | Criado em: {new Date(post.dataCriacao).toLocaleString()}</small>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Coluna depois do conteúdo principal ocupando 25% da largura */}
                <div className="col-lg-3 col-md-3 hr-contact">
                    <div className='mb-3'>
                        <Card>
                            <Card.Header className="hr-doc-header">Contato do RH</Card.Header>
                            <Card.Body>
                                <p><strong>Email:</strong> rh@empresa.com.br</p>
                                <p><strong>Telefone:</strong> (11) 1234-5678</p>
                                <p><strong>Horário de Atendimento:</strong> Seg-Sex, 9h - 17h</p>
                                <Button variant="primary" href="mailto:rh@empresa.com.br">Enviar Email</Button>
                            </Card.Body>
                        </Card>
                    </div>  

                    <Card>
                        <Card.Header className="hr-doc-header">Perguntas Frequentes (FAQ)</Card.Header>
                        <Card.Body>
                            <ListGroup>
                                <ListGroup.Item>
                                    <strong>Como solicito minhas férias?</strong> Envie um email para rh@empresa.com.br com suas datas preferidas.
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Como faço para atualizar meus dados cadastrais?</strong> Entre em contato com o RH por email ou telefone.
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Posso solicitar adiantamento do 13º salário?</strong> Sim, verifique o regulamento interno para mais informações.
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    <strong>Como consultar meus holerites?</strong> Utilize o sistema de gestão de pessoas ou contate o RH.
                                </ListGroup.Item>
                            </ListGroup>
                        </Card.Body>
                    </Card>
                </div>
            </div>
        </div>
    );
};

export default HRPage;

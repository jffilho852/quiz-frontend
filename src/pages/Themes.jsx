// src/pages/Themes.jsx
import { useEffect, useState } from 'react';
import {
  Container,
  Row,
  Col,
  Card,
  Badge,
  Modal,
  Button as BsButton,
  Spinner,
  ListGroup
} from 'react-bootstrap';
import { Pencil, Trash } from 'react-bootstrap-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API_PERGUNTAS = 'http://localhost:3001/api/perguntas';
const CARD_COLORS = ['#6f42c1', '#dc3545', '#198754', '#ffc107', '#0d6efd'];

export default function Themes() {
  const [temasMap, setTemasMap] = useState({});
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [selectedTema, setSelectedTema] = useState('');
  const navigate = useNavigate();

  // carrega e agrupa perguntas por tema
  const fetchTemas = async () => {
    try {
      const res = await axios.get(API_PERGUNTAS);
      const temas = {};
      res.data.forEach((q) => {
        const t = q.tema || 'Sem Tema';
        if (!temas[t]) temas[t] = [];
        temas[t].push(q);
      });
      setTemasMap(temas);
    } catch (err) {
      console.error('Erro ao carregar temas:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchTemas();
  }, []);

  const handleEditQuestion = (question) => {
    // Navega para a página de criar/editar questão passando o objeto
    navigate('/admin/create', { state: { question } });
  };

  const handleDeleteQuestion = async (id) => {
    if (!window.confirm('Excluir esta questão?')) return;
    try {
      await axios.delete(`${API_PERGUNTAS}/${id}`);

      // Limpa cache do quiz quando uma questão é excluída
     localStorage.removeItem('perguntasSorteadas');
     localStorage.removeItem('quizStartTime');
     
      fetchTemas();
    } catch (err) {
      console.error('Erro ao deletar questão:', err);
    }
  };

  const openModal = (tema) => {
    setSelectedTema(tema);
    setShowModal(true);
  };
  const closeModal = () => {
    setShowModal(false);
    setSelectedTema('');
  };

  if (loading) {
    return (
      <Container className="mt-4 text-center">
        <Spinner animation="border" />
      </Container>
    );
  }

  const temas = Object.entries(temasMap);

  return (
    <Container className="mt-4">
      <h3 className="mb-4">Temas Disponíveis ({temas.length})</h3>
      <Row xs={1} sm={2} lg={3} className="g-4">
        {temas.map(([tema, lista], idx) => {
          const color = CARD_COLORS[idx % CARD_COLORS.length];
          return (
            <Col key={tema}>
              <Card
                style={{ borderLeft: `4px solid ${color}` }}
                className="h-100 shadow-sm"
              >
                <Card.Body className="d-flex flex-column">
                  <div className="d-flex justify-content-between align-items-start mb-2">
                    <Card.Title>{tema}</Card.Title>
                  </div>
                  <Card.Text className="flex-grow-1 text-muted">
                    Questões sobre {tema}
                  </Card.Text>
                  <div className="d-flex justify-content-between align-items-center">
                    <Badge
                      bg="light"
                      text="dark"
                      style={{ backgroundColor: color, color: '#fff' }}
                    >
                      {lista.length} pergunta{lista.length > 1 ? 's' : ''}
                    </Badge>
                    <BsButton
                      size="sm"
                      variant="outline-primary"
                      onClick={() => openModal(tema)}
                    >
                      Ver questões
                    </BsButton>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          );
        })}
      </Row>

      {/* Modal de Questões */}
      <Modal show={showModal} onHide={closeModal} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Questões de {selectedTema}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <ListGroup variant="flush">
            {(temasMap[selectedTema] || []).map((q) => (
              <ListGroup.Item
                key={q.id}
                className="d-flex justify-content-between align-items-center"
              >
                <div>{q.pergunta}</div>
                <div>
                  <Pencil
                    role="button"
                    className="me-3 text-secondary"
                    onClick={() => handleEditQuestion(q)}
                  />
                  <Trash
                    role="button"
                    className="text-danger"
                    onClick={() => handleDeleteQuestion(q.id)}
                  />
                </div>
              </ListGroup.Item>
            ))}
            {(!temasMap[selectedTema] ||
              temasMap[selectedTema].length === 0) && (
              <p className="text-muted">Nenhuma questão cadastrada.</p>
            )}
          </ListGroup>
        </Modal.Body>
        <Modal.Footer>
          <BsButton variant="secondary" onClick={closeModal}>
            Fechar
          </BsButton>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

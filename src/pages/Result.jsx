// src/paginas/Result.jsx
import { useEffect, useState } from 'react';
import { Container, Card, Button, ProgressBar, Row, Col, Spinner } from 'react-bootstrap';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { Trophy } from 'react-bootstrap-icons';

const API_RANKING = 'http://localhost:3001/api/respostas/ranking';

export default function Result() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { score, total, startTime, endTime } = state || {};
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);
  const [position, setPosition] = useState(null);
  const [percentile, setPercentile] = useState(null);

  // Busca o ranking para calcular posição e percentil
  useEffect(() => {
    async function fetchRanking() {
      try {
        const res = await axios.get(API_RANKING);
        setRanking(res.data);
      } catch (err) {
        console.error('Erro ao carregar ranking:', err);
      } finally {
        setLoading(false);
      }
    }
    fetchRanking();
  }, []);

  // Calcula posição e percentil após carregar o ranking
  useEffect(() => {
    if (!loading && ranking.length) {
      const participante = JSON.parse(localStorage.getItem('participante'));
      const idx = ranking.findIndex(r => r.email === participante.email);
      const pos = idx >= 0 ? idx + 1 : ranking.length + 1;
      setPosition(pos);

      const abaixo = ranking.filter((_, i) => i > idx).length;
      const perc = Math.round((abaixo / ranking.length) * 100);
      setPercentile(perc);
    }
  }, [loading, ranking]);

  // Se acionarem diretamente sem state, redireciona ao início
  if (!state) {
    navigate('/');
    return null;
  }

  if (loading) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Carregando resultados...</p>
      </Container>
    );
  }

  const timeSec = Math.floor((endTime - startTime) / 1000);
  const percentScore = Math.round((score / total) * 100);

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow-sm text-center">
        {/* Ícone e título */}
        <Trophy size={48} className="text-warning mb-3" />
        <h4>Parabéns!</h4>
        <p className="text-muted">Você completou o quiz</p>

        {/* Resumo de acertos */}
        <div className="bg-light p-3 rounded mb-3">
          <h2>{score}/{total}</h2>
          <small className="text-muted">Respostas corretas</small>
        </div>

        {/* Posição e tempo */}
        <Row className="mb-3">
          <Col>
            <div className="bg-light p-2 rounded">
              <strong>{position}°</strong><br />
              <small className="text-muted">Sua posição</small>
            </div>
          </Col>
          <Col>
            <div className="bg-light p-2 rounded">
              <strong>{timeSec}s</strong><br />
              <small className="text-muted">Tempo total</small>
            </div>
          </Col>
        </Row>

        {/* Estatísticas */}
        <h6 className="text-start">Estatísticas</h6>
        <ProgressBar now={percentScore} label={`${percentScore}%`} className="mb-3" />
        <p className="text-start mb-1"><small>Pontuação</small></p>
        <p className="text-start mb-3">
          <small>Classificação: Melhor que {percentile}% dos participantes</small>
        </p>

        {/* Botão para ir ao Ranking */}
        <Button
          variant="primary"
          className="w-100"
          onClick={() => navigate('/ranking')}
        >
          Ver Ranking
        </Button>

        {/* Mensagem de confirmação */}
        <div className="alert alert-success mt-3 mb-0">
          Resposta salva com sucesso!
        </div>
      </Card>
    </Container>
  );
}

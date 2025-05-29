// src/pages/Ranking.jsx
import { useEffect, useState } from 'react';
import { Container, Table, Spinner, Button } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

export default function Ranking() {
  const [ranking, setRanking] = useState([]);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchRanking() {
      try {
        const res = await axios.get('http://localhost:3001/api/respostas/ranking');
        setRanking(res.data);
      } catch (err) {
        console.error('Erro ao carregar ranking:', err);
      } finally {
        setCarregando(false);
      }
    }
    fetchRanking();
  }, []);

  const handleExit = () => {
    // Limpa dados de participante e pontuação
    localStorage.removeItem('participante');
    localStorage.removeItem('pontuacao');
    navigate('/thankyou');
  };

  if (carregando) {
    return (
      <Container className="mt-5 text-center">
        <Spinner animation="border" />
        <p>Carregando ranking...</p>
      </Container>
    );
  }

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Ranking dos Participantes</h2>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Nome</th>
            <th>Email</th>
            <th>Pontuação</th>
          </tr>
        </thead>
        <tbody>
          {ranking.map((p, index) => (
            <tr key={p.email}>
              <td>{index + 1}</td>
              <td>{p.nome}</td>
              <td>{p.email}</td>
              <td>{p.pontuacao}</td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Botão para sair */}
      <Button
        variant="outline-secondary"
        className="w-100 mt-4"
        onClick={handleExit}
      >
        Sair
      </Button>
    </Container>
  );
}

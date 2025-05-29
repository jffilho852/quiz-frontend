import { useEffect, useState } from 'react';
import { Container, Table, Spinner } from 'react-bootstrap';
import axios from 'axios';

export default function Participants() {
  const [participants, setParticipants] = useState([]);
  const [ranking, setRanking] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.all([
      axios.get('http://localhost:3001/api/participantes'),
      axios.get('http://localhost:3001/api/respostas/ranking')
    ]).then(([pRes, rRes]) => {
      setParticipants(pRes.data);
      setRanking(rRes.data);
    }).catch(console.error)
      .finally(() => setLoading(false));
  }, []);

  if (loading) {
    return <Container className="mt-4 text-center"><Spinner animation="border" /></Container>;
  }

  return (
    <Container className="mt-4">
      <h3>Participantes</h3>
      <Table striped bordered hover>
        <thead>
          <tr><th>Nome</th><th>Email</th><th>Pontuação</th></tr>
        </thead>
        <tbody>
          {participants.map(p => {
            const rank = ranking.find(r => r.email === p.email);
            return (
              <tr key={p.id}>
                <td>{p.nome}</td>
                <td>{p.email}</td>
                <td>{rank?.pontuacao ?? 0}</td>
              </tr>
            );
          })}
        </tbody>
      </Table>
    </Container>
  );
}

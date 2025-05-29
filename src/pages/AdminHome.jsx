import { useEffect, useState } from 'react';
import { Container, Badge, Spinner } from 'react-bootstrap';
import axios from 'axios';

export default function AdminHome() {
  const [total, setTotal] = useState(null);

  useEffect(() => {
    axios.get('http://localhost:3001/api/participantes/count')
      .then(res => setTotal(res.data.total))
      .catch(console.error);
  }, []);

  return (
    <Container className="mt-4 text-center">
      <h3>Dashboard</h3>
      <p>
        Participantes que já jogaram:{' '}
        {total === null
          ? <Spinner animation="border" size="sm" />
          : <Badge bg="info">{total}</Badge>
        }
      </p>
    </Container>
  );
}

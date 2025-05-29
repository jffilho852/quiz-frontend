import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import LogoBemol from '../assets/bemolLogo.svg'

export default function Login() {
  const navigate = useNavigate();

  const handleIniciar = () => {
    navigate('/login');
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        
        <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow-sm text-center">
          <Card.Body>

            {/* LOGO DENTRO DO CARD */}
            <img
              src = {LogoBemol}
              alt="Logo Bemol"
              style={{ width: '100px', marginBottom: '1rem' }}
            />

            <Card.Title className="fw-bold text-primary">Quiz Interativo Bemol</Card.Title>
            <Card.Text>
              Teste seus conhecimentos e concorra a prêmios!
            </Card.Text>

            <Button onClick={handleIniciar} className="w-100 mt-3" variant="primary">
              Iniciar Quiz
            </Button>

          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

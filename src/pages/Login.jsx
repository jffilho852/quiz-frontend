// src/paginas/Login.jsx
import { Container, Card, Form, Button } from 'react-bootstrap';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Login() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const navigate = useNavigate();

  // Carrega credenciais de admin do env
  const ADMIN_EMAIL = import.meta.env.VITE_ADMIN_EMAIL;
  const ADMIN_NAME = import.meta.env.VITE_ADMIN_NAME;

  console.log('⏱️ Admin credenciais do .env:', { ADMIN_EMAIL, ADMIN_NAME });

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Normalize inputs
    const inputEmail = email.trim().toLowerCase();
    const inputNome  = nome.trim();

    console.log('✏️ Credenciais digitadas:', { inputNome, inputEmail });

    // Verifica se é Admin
    if (
      inputEmail === ADMIN_EMAIL.trim().toLowerCase() &&
      inputNome  === ADMIN_NAME.trim()
    ) {
      console.log('🔐 Login de ADMIN reconhecido — redirecionando para /admin');
      localStorage.setItem('isAdmin', 'true');
      navigate('/admin');
      return;  // importantíssimo: impede que continue pra quiz
    }

    // Fluxo normal de participante
    try {
      const res = await axios.post('http://localhost:3001/api/participantes', {
        nome,
        email
      });

      localStorage.setItem('participante', JSON.stringify(res.data));
      localStorage.removeItem('isAdmin');
      navigate('/quiz');
    } catch (err) {
      console.error('❌ Erro ao registrar participante:', err);
      alert('Erro ao registrar. Tente novamente.');
    }
  };

  return (
    <div style={{ backgroundColor: '#f8f9fa', minHeight: '100vh' }}>
      <Container className="d-flex flex-column align-items-center justify-content-center" style={{ minHeight: '100vh' }}>
        <Card style={{ width: '100%', maxWidth: '400px' }} className="p-4 shadow-sm text-center">
          <Card.Body>
            <Card.Title className="fw-bold text-primary">Bem-vindo ao Quiz Bemol</Card.Title>
            <Card.Text className="mb-4">Preencha seus dados para começar</Card.Text>

            <Form onSubmit={handleSubmit}>
              <Form.Group controlId="formNome" className="mb-3 text-start">
                <Form.Label>Nome</Form.Label>
                <Form.Control
                  type="text"
                  placeholder="Digite seu nome"
                  value={nome}
                  onChange={(e) => setNome(e.target.value)}
                  required
                />
              </Form.Group>

              <Form.Group controlId="formEmail" className="mb-3 text-start">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  placeholder="Digite seu email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </Form.Group>

              <Button type="submit" className="w-100" variant="primary">
                Entrar
              </Button>
            </Form>
          </Card.Body>
        </Card>
      </Container>
    </div>
  );
}

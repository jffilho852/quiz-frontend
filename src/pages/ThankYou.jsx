// src/pages/ThankYou.jsx
import React from 'react';
import { Container, Card, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';

export default function ThankYou() {
  const navigate = useNavigate();

  return (
    <Container className="mt-5 d-flex justify-content-center">
      <Card style={{ width: '100%', maxWidth: '500px' }} className="p-4 shadow-sm text-center">
        <h2 className="mb-3">Obrigado por participar!</h2>
        <p className="mb-4">Confira alguns links úteis:</p>

        <div className="d-grid gap-2 mb-3">
          <Button
            variant="link"
            href="https://www.bemol.com.br"
            target="_blank"
          >
            Site Bemol
          </Button>
          <Button
            variant="link"
            href="https://www.linkedin.com/company/bemol"
            target="_blank"
          >
            LinkedIn Bemol
          </Button>
          <Button
            variant="link"
            href="https://www.bemol.com.br/suporte"
            target="_blank"
          >
            Suporte Bemol
          </Button>
        </div>

        <Button variant="primary" onClick={() => navigate('/')}>
          Voltar ao Início
        </Button>
      </Card>
    </Container>
  );
}

import React, { useEffect } from 'react';
import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

export default function AdminLayout() {
  const navigate = useNavigate();

  // Limpa cache do quiz sempre que o Admin entra no painel
  useEffect(() => {
    localStorage.removeItem('perguntasSorteadas');
    localStorage.removeItem('quizStartTime');
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  return (
    <>
      {/* ... seu Navbar já configurado ... */}
      <Navbar bg="light" expand="lg">
        <Container>
          {/* Logo e título */}
          <Navbar.Brand as={NavLink} to="/admin">
            <img src="/bemol-logo.png" alt="Bemol" height="30" className="me-2" />
            Painel Admin
          </Navbar.Brand>
          <Navbar.Toggle />
          <Navbar.Collapse>
            <Nav className="me-auto">
              <Nav.Link as={NavLink} to="themes">Temas</Nav.Link>
              <Nav.Link as={NavLink} to="create">Criar Questão</Nav.Link>
              <Nav.Link as={NavLink} to="participants">Participantes</Nav.Link>
            </Nav>
            <Button variant="outline-danger" onClick={handleLogout}>
              Sair
            </Button>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <Outlet />
    </>
  );
}

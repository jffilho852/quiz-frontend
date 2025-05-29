import { Outlet, useNavigate, NavLink } from 'react-router-dom';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';

export default function AdminLayout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('isAdmin');
    navigate('/login');
  };

  return (
    <>
      <Navbar bg="light" expand="lg">
        <Container>
          {/* Logo e título */}
          <Navbar.Brand as={NavLink} to="/admin">
            <img src="/bemol-logo.png" alt="Bemol" height="30" className="d-inline-block align-top" />
            {' '}Painel Admin
          </Navbar.Brand>

          {/* Sessões */}
          <Nav className="me-auto">
            <Nav.Link as={NavLink} to="themes">Temas</Nav.Link>
            <Nav.Link as={NavLink} to="create">Criar Questão</Nav.Link>
            <Nav.Link as={NavLink} to="participants">Participantes</Nav.Link>
          </Nav>

          {/* Botão Sair */}
          <Button variant="outline-danger" onClick={handleLogout}>
            Sair
          </Button>
        </Container>
      </Navbar>

      {/* Aqui vão renderizar as páginas filhas */}
      <Outlet />
    </>
  );
}

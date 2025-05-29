import { useEffect, useState } from 'react';
import { Container, Table, Button, Modal, Form } from 'react-bootstrap';
import axios from 'axios';

const API = 'http://localhost:3001/api/perguntas';

export default function Admin() {
  const [perguntas, setPerguntas] = useState([]);
  const [modalAberta, setModalAberta] = useState(false);
  const [modoEdicao, setModoEdicao] = useState(false);
  const [form, setForm] = useState({
    id: null,
    pergunta: '',
    opcao_a: '',
    opcao_b: '',
    opcao_c: '',
    opcao_d: '',
    correta: '',
  });

  useEffect(() => {
    carregarPerguntas();
  }, []);

  const carregarPerguntas = async () => {
    const res = await axios.get(API);
    setPerguntas(res.data);
  };

  const abrirModal = (pergunta = null) => {
    if (pergunta) {
      setModoEdicao(true);
      setForm(pergunta);
    } else {
      setModoEdicao(false);
      setForm({
        id: null,
        pergunta: '',
        opcao_a: '',
        opcao_b: '',
        opcao_c: '',
        opcao_d: '',
        correta: '',
      });
    }
    setModalAberta(true);
  };

  const fecharModal = () => {
    setModalAberta(false);
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const salvarPergunta = async () => {
    if (modoEdicao) {
      await axios.put(`${API}/${form.id}`, form);
    } else {
      await axios.post(API, form);
    }
    fecharModal();
    carregarPerguntas();
  };

  const deletarPergunta = async (id) => {
    if (window.confirm('Tem certeza que deseja deletar esta pergunta?')) {
      await axios.delete(`${API}/${id}`);
      carregarPerguntas();
    }
  };

  return (
    <Container className="mt-5">
      <h2 className="mb-4">Admin - Gerenciar Perguntas</h2>
      <Button onClick={() => abrirModal()} variant="primary" className="mb-3">
        Nova Pergunta
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>#</th>
            <th>Pergunta</th>
            <th>Correta</th>
            <th>Ações</th>
          </tr>
        </thead>
        <tbody>
          {perguntas.map((p) => (
            <tr key={p.id}>
              <td>{p.id}</td>
              <td>{p.pergunta}</td>
              <td>{p.correta.toUpperCase()}</td>
              <td>
                <Button size="sm" variant="warning" onClick={() => abrirModal(p)}>
                  Editar
                </Button>{' '}
                <Button size="sm" variant="danger" onClick={() => deletarPergunta(p.id)}>
                  Deletar
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal de Edição */}
      <Modal show={modalAberta} onHide={fecharModal}>
        <Modal.Header closeButton>
          <Modal.Title>{modoEdicao ? 'Editar Pergunta' : 'Nova Pergunta'}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Pergunta</Form.Label>
              <Form.Control name="pergunta" value={form.pergunta} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Opção A</Form.Label>
              <Form.Control name="opcao_a" value={form.opcao_a} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Opção B</Form.Label>
              <Form.Control name="opcao_b" value={form.opcao_b} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Opção C</Form.Label>
              <Form.Control name="opcao_c" value={form.opcao_c} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Opção D</Form.Label>
              <Form.Control name="opcao_d" value={form.opcao_d} onChange={handleChange} />
            </Form.Group>
            <Form.Group>
              <Form.Label>Alternativa Correta</Form.Label>
              <Form.Control
                name="correta"
                value={form.correta}
                onChange={handleChange}
                placeholder="a, b, c ou d"
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={fecharModal}>
            Cancelar
          </Button>
          <Button variant="success" onClick={salvarPergunta}>
            Salvar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

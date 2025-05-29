// src/pages/QuestionForm.jsx
import { useState, useEffect } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import axios from 'axios';
import { useLocation, useNavigate } from 'react-router-dom';

const TEMAS = [
  'NVIDIA',
  'MICROSOFT',
  'BEMOL',
  'RH',
  'INTELIGENCIA ARTIFICIAL (IA)',
  'DATABRICKS'
];

const initialFormState = {
  tema: TEMAS[0],
  pergunta: '',
  opcao_a: '',
  opcao_b: '',
  opcao_c: '',
  opcao_d: '',
  correta: ''
};

export default function QuestionForm() {
  const { state } = useLocation();
  const navigate = useNavigate();
  const isEdit = Boolean(state?.question);
  const [form, setForm] = useState({ ...initialFormState });
  const [salvo, setSalvo] = useState(false);

  // Se vier com uma questão no state, preenche o form
  useEffect(() => {
    if (isEdit) {
      const { question } = state;
      setForm({
        tema: question.tema,
        pergunta: question.pergunta,
        opcao_a: question.opcao_a,
        opcao_b: question.opcao_b,
        opcao_c: question.opcao_c,
        opcao_d: question.opcao_d,
        correta: question.correta
      });
    }
  }, [isEdit, state]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isEdit) {
        // PUT para atualizar
        await axios.put(
          `http://localhost:3001/api/perguntas/${state.question.id}`,
          form
        );
      } else {
        // POST para criar nova
        await axios.post('http://localhost:3001/api/perguntas', form);
      }

    // Limpa cache do quiz para incluir as novas alterações
     localStorage.removeItem('perguntasSorteadas');
     localStorage.removeItem('quizStartTime');



      setSalvo(true);
      // após salvar, volta ao dashboard de temas
      setTimeout(() => {
        navigate('/admin/themes');
      }, 1000);
    } catch (err) {
      console.error('Erro ao salvar questão:', err);
      alert('Falha ao salvar. Tente novamente.');
    }
  };

  return (
    <Container className="mt-4">
      <h3>{isEdit ? 'Editar Questão' : 'Criar Questão'}</h3>
      <Form onSubmit={handleSubmit}>
        <Form.Group className="mb-3">
          <Form.Label>Tema</Form.Label>
          <Form.Select
            name="tema"
            value={form.tema}
            onChange={handleChange}
            required
          >
            {TEMAS.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Pergunta</Form.Label>
          <Form.Control
            name="pergunta"
            value={form.pergunta}
            onChange={handleChange}
            required
          />
        </Form.Group>

        {['opcao_a', 'opcao_b', 'opcao_c', 'opcao_d'].map((opt) => (
          <Form.Group className="mb-3" key={opt}>
            <Form.Label>Opção {opt.split('_')[1].toUpperCase()}</Form.Label>
            <Form.Control
              name={opt}
              value={form[opt]}
              onChange={handleChange}
              required
            />
          </Form.Group>
        ))}

        <Form.Group className="mb-3">
          <Form.Label>Letra Correta (a, b, c ou d)</Form.Label>
          <Form.Control
            name="correta"
            value={form.correta}
            onChange={handleChange}
            placeholder="a, b, c ou d"
            required
          />
        </Form.Group>

        <Button type="submit" variant="primary">
          {isEdit ? 'Atualizar Questão' : 'Salvar Questão'}
        </Button>
        {salvo && (
          <span className="ms-2 text-success">
            {isEdit ? 'Questão atualizada!' : 'Questão criada!'}
          </span>
        )}
      </Form>
    </Container>
  );
}

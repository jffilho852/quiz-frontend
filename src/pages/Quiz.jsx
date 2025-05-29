// src/paginas/Quiz.jsx
import { useEffect, useState, useRef } from 'react';
import { Container, Card, Button, Spinner } from 'react-bootstrap';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const API = 'http://localhost:3001/api/perguntas';

export default function Quiz() {
  const [perguntas, setPerguntas] = useState([]);
  const [indiceAtual, setIndiceAtual] = useState(0);
  const [pontuacao, setPontuacao] = useState(0);
  const [carregando, setCarregando] = useState(true);
  const navigate = useNavigate();
  const startTimeRef = useRef(null);

  // Função para sortear perguntas aleatórias
  function sortearPerguntas(array, limite = 10) {
    const embaralhado = [...array].sort(() => 0.5 - Math.random());
    return embaralhado.slice(0, limite);
  }

  // Carrega e sorteia as perguntas (uma só vez)
  useEffect(() => {
    const armazenadas = JSON.parse(localStorage.getItem('perguntasSorteadas'));
    if (armazenadas) {
      setPerguntas(armazenadas);
      startTimeRef.current = Number(localStorage.getItem('quizStartTime'));
      setCarregando(false);
    } else {
      (async () => {
        try {
          const res = await axios.get(API);
          const sorteadas = sortearPerguntas(res.data, 10);
          setPerguntas(sorteadas);

          // inicia o timer e salva no localStorage
          const now = Date.now();
          startTimeRef.current = now;
          localStorage.setItem('quizStartTime', now);
          localStorage.setItem('perguntasSorteadas', JSON.stringify(sorteadas));

          setCarregando(false);
        } catch (err) {
          console.error('Erro ao carregar perguntas', err);
        }
      })();
    }
  }, []);

  const handleResposta = async (respostaSelecionada) => {
    const perguntaAtual = perguntas[indiceAtual];
    const correta = perguntaAtual.correta.toLowerCase() === respostaSelecionada.toLowerCase();

    if (correta) {
      setPontuacao((p) => p + 1);
    }

    const participante = JSON.parse(localStorage.getItem('participante')) || {};

    // Salva cada resposta no backend
    try {
      await axios.post('http://localhost:3001/api/respostas', {
        nome: participante.nome,
        email: participante.email,
        pergunta_id: perguntaAtual.id,
        resposta: respostaSelecionada,
        correta,
      });
    } catch (err) {
      console.error('Falha ao enviar resposta:', err);
    }

    const proxima = indiceAtual + 1;
    if (proxima < perguntas.length) {
      setIndiceAtual(proxima);
    } else {
      // Fim do quiz: calcula dados e vai para /result
      const endTime = Date.now();
      const startTime = startTimeRef.current;
      const finalScore = pontuacao + (correta ? 1 : 0);

      // Limpeza de dados temporários
      localStorage.removeItem('perguntasSorteadas');
      localStorage.removeItem('quizStartTime');

      navigate('/result', {
        state: {
          score: finalScore,
          total: perguntas.length,
          startTime,
          endTime,
        }
      });
    }
  };

  if (carregando) {
    return (
      <Container className="text-center mt-5">
        <Spinner animation="border" />
        <p>Carregando perguntas...</p>
      </Container>
    );
  }

  const pergunta = perguntas[indiceAtual];

  return (
    <Container className="mt-5">
      <Card className="p-4 shadow-sm">
        <Card.Title className="fw-bold mb-3">
          Pergunta {indiceAtual + 1} de {perguntas.length}
        </Card.Title>
        <Card.Text className="mb-4">
          {pergunta.pergunta}
        </Card.Text>

        <div className="d-grid gap-2">
          <Button variant="outline-primary" onClick={() => handleResposta('a')}>
            A) {pergunta.opcao_a}
          </Button>
          <Button variant="outline-primary" onClick={() => handleResposta('b')}>
            B) {pergunta.opcao_b}
          </Button>
          <Button variant="outline-primary" onClick={() => handleResposta('c')}>
            C) {pergunta.opcao_c}
          </Button>
          <Button variant="outline-primary" onClick={() => handleResposta('d')}>
            D) {pergunta.opcao_d}
          </Button>
        </div>
      </Card>
    </Container>
  );
}

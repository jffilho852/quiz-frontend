import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';

// Importa o CSS do Bootstrap (essencial)
import 'bootstrap/dist/css/bootstrap.min.css';

// (Opcional) Importa seu CSS global se quiser, senão comente essa linha
// import './index.css';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

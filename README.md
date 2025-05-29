# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Babel](https://babeljs.io/) for Fast Refresh
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/) for Fast Refresh

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.

# Quiz Bemol Frontend

Aplicação web em React + Vite para o quiz interativo da Bemol.

## 🛠️ Tecnologias

* Vite
* React
* React-Bootstrap
* React Router DOM
* Axios
* dotenv

## 🚀 Instalação

1. Clone o repositório:

   ```bash
   git clone https://github.com/seu-usuario/quiz-frontend.git
   cd quiz-frontend
   ```
2. Instale as dependências:

   ```bash
   npm install
   ```
3. Crie um arquivo `.env` na raiz:

   ```dotenv
   VITE_ADMIN_EMAIL=<EMAIL_ADMIN>
   VITE_ADMIN_NAME="<NOME_ADMIN>"
   ```
4. Inicie o servidor de desenvolvimento:

   ```bash
   npm run dev
   ```

## 📂 Estrutura de Pastas

```
quiz-frontend/
├─ public/
|  └── bemol-logo.png
├─ src/
|  ├── components/
|  |  └── ProtectedRoute.jsx
|  |  └── AdminLayout.jsx
|  ├── pages/
|  |  ├── Home.jsx
|  |  ├── Login.jsx
|  |  ├── Quiz.jsx
|  |  ├── Result.jsx
|  |  ├── Ranking.jsx
|  |  ├── ThankYou.jsx
|  |  ├── AdminHome.jsx
|  |  ├── Themes.jsx
|  |  ├── QuestionForm.jsx
|  |  └── Participants.jsx
|  ├── App.jsx
|  └── main.jsx
└─ package.json
```

## 🌐 Rotas

* **`/`** — Home
* **`/login`** — Registro de participante (ou Admin)
* **`/quiz`** — Quiz (10 perguntas aleatórias)
* **`/result`** — Tela de resultado
* **`/ranking`** — Ranking geral
* **`/thankyou`** — Página de agradecimento
* **Admin (protegido)**

  * `/admin` — Dashboard
  * `/admin/themes` — Visão por temas
  * `/admin/create` — Criar/Editar questão
  * `/admin/participants` — Lista de participantes e pontuações

## 📈 Scripts

* **`npm run dev`** — inicia em modo dev
* **`npm run build`** — gera build para produção
* **`npm run preview`** — pré-visualiza build

## 💡 Observações

* As credenciais de Admin são definidas em `.env` e usadas para liberar a área de edição.
* O frontend limpa o cache (`localStorage`) sempre que novas questões são criadas/alteradas/excluídas.

## 🚀 Deploy

* Para produção, use Netlify, Vercel ou Surge:

  ```bash
  npm run build
  npx serve -s dist
  ```

---

*Bemol SA © 2025*

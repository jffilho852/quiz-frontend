// src/App.jsx
import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Login from './pages/Login';
import Quiz from './pages/Quiz';
import Result from './pages/Result';
import Ranking from './pages/Ranking';
import ThankYou from './pages/ThankYou';


import ProtectedRoute from './componentes/ProtectedRoute';
import AdminLayout from './componentes/AdminLayout';
import AdminHome from './pages/AdminHome';
import Themes from './pages/Themes';
import QuestionForm from './pages/QuestionForm';
import Participants from './pages/Participants';

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Rotas públicas */}
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/result" element={<Result />} />
        <Route path="/ranking" element={<Ranking />} />
        <Route path="/thankyou" element={<ThankYou />} />

        {/* Rotas do Admin, protegidas */}
        <Route
          path="/admin"
          element={
            <ProtectedRoute>
              <AdminLayout />
            </ProtectedRoute>
          }
        >
          <Route index element={<AdminHome />} />
          <Route path="themes" element={<Themes />} />
          <Route path="create" element={<QuestionForm />} />
          <Route path="participants" element={<Participants />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CadastroAutorLivro from './pages/CadastroAutorLivro';
import SobreNos from './pages/SobreNos';
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/home" element={<Home />} />
        <Route path="/cadastro-autor-livro" element={<CadastroAutorLivro />} />
        <Route path="/sobre-nos" element={<SobreNos />} />
        <Route path="/" element={<Navigate to="/home" />} /> {/* Redireciona para /home */}
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;

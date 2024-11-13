import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Home from './pages/Home';
import CadastroAutorLivro from './pages/CadastroAutorLivro';
import SobreNos from './pages/SobreNos';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Login from './pages/Login';
import Cadastro from './pages/Cadastro';
import { AuthProvider, useAuth } from './AuthContext';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Routes>
          {/* Rota pública de login e cadastro */}
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Cadastro />} />

          {/* Rota privada que só pode ser acessada por usuários autenticados */}
          <Route path="/" element={<PrivateRoute />}>
            <Route path="/home" element={<Home />} />
            <Route path="/cadastro-autor-livro" element={<CadastroAutorLivro />} />
            <Route path="/sobre-nos" element={<SobreNos />} />
          </Route>

          {/* Redirecionamento para a home se a rota não existir */}
          <Route path="*" element={<Navigate to="/home" />} />
        </Routes>
      </Router>
    </AuthProvider>
  );
}

const PrivateRoute = () => {
  const { isAuthenticated } = useAuth();

  // Se o usuário não estiver autenticado, redireciona para a página de login
  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  // Se estiver autenticado, renderiza a barra de navegação e o conteúdo protegido
  return (
    <>
      <Navbar />
      <div className="content">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/cadastro-autor-livro" element={<CadastroAutorLivro />} />
          <Route path="/sobre-nos" element={<SobreNos />} />
        </Routes>
      </div>
      <Footer />
    </>
  );
};

export default App;

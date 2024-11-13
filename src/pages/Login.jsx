import React, { useState } from 'react';
import { useAuth } from '../AuthContext'; 
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { login } = useAuth(); // Usando o login do contexto
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    const usuario = { usuario: email, senha: password };

    try {
      const response = await fetch('http://localhost:8080/usuarios/login', { 
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(usuario),
      });

      if (response.ok) {
        const data = await response.json();
        login(data); // Envia o objeto `data` para `login`, que contém a foto e outras informações
        navigate('/home');
      } else {
        alert('Credenciais inválidas');
      }
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      alert('Ocorreu um erro ao tentar fazer login');
    }
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
        <button type="submit">Login</button>
      </form>
      <div className="signup-link">
        <span>Ainda não tem uma conta? </span>
        <a href="/signup">Cadastre-se aqui</a>
      </div>
    </div>
  );
}

export default Login;

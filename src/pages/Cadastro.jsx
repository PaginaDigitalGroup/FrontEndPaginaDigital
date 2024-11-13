import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cadastro.css'; // Importe o arquivo CSS

function Cadastro() {
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [foto, setFoto] = useState(null);
  const navigate = useNavigate();

  const handleCadastro = async (e) => {
    e.preventDefault();

    const novoUsuario = {
      nome,
      usuario: email,
      senha,
      foto,
    };

    try {
      const response = await fetch('http://localhost:8080/usuarios/cadastro', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(novoUsuario),
      });

      if (response.ok) {
        alert('Cadastro bem-sucedido! Agora, você pode fazer login.');
        navigate('/login'); // Redireciona para a página de login após cadastro
      } else {
        alert('Erro no cadastro. Tente novamente.');
      }
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      alert('Ocorreu um erro ao tentar se cadastrar.');
    }
  };

  return (
    <div className="cadastro-container">
      <h2>Cadastrar</h2>
      <form onSubmit={handleCadastro}>
        <input
          type="text"
          value={nome}
          onChange={(e) => setNome(e.target.value)}
          placeholder="Nome"
          required
        />
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
        <input
          type="password"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          placeholder="Senha"
          required
        />
        <input
          type="text"
          onChange={(e) => setFoto(e.target.value)}
          placeholder="Foto (opcional)"
        />
        <div className="buttons-container">
          <button type="submit">Cadastrar</button>
          <button type="button" onClick={() => navigate('/login')} className="back-to-login">
            Voltar
          </button>
        </div>
      </form>
    </div>
  );
}

export default Cadastro;

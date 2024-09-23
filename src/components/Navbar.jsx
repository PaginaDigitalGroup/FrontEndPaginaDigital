// src/components/Navbar.jsx
import React from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css'; // Importando o arquivo CSS

function Navbar() {
  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/home" className="navbar-link">Home</Link></li>
        <li className="navbar-item"><Link to="/cadastro-autor-livro" className="navbar-link">Cadastrar</Link></li>
        <li className="navbar-item"><Link to="/sobre-nos" className="navbar-link">Sobre Nós</Link></li>
      </ul>
    </nav>
  );
}

export default Navbar;

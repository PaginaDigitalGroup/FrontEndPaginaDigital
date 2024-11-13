import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../AuthContext';
import './Navbar.css';

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li className="navbar-item"><Link to="/home" className="navbar-link">Home</Link></li>
        <li className="navbar-item"><Link to="/cadastro-autor-livro" className="navbar-link">Cadastrar</Link></li>
        <li className="navbar-item"><Link to="/sobre-nos" className="navbar-link">Sobre Nós</Link></li>
      </ul>
      {isAuthenticated && (
        <div className="user-container">
              {user.foto ? (
                <img src={user.foto} alt="Foto do usuário" className="user-photo" />
              ) : (
                <span className="user-photo-placeholder">👤</span> // Placeholder caso não tenha foto
              )}

          <button onClick={logout} className="navbar-item">Logout</button>
        </div>
      )}
    </nav>
  );
}

export default Navbar;

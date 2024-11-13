import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => {
  return useContext(AuthContext);
};

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null); // Inicializa como null ou {}

  const login = (userData) => {
    setIsAuthenticated(true);
    setUser(userData); // Define o usuário com todos os dados passados
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUser(null); // Limpa o estado do usuário
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

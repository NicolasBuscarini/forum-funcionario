// src/context/AuthContext.js
import React, { createContext, useState } from 'react';
import axios from 'axios';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const storedData = localStorage.getItem('authData');
    return storedData ? JSON.parse(storedData) : null;
  });

  const login = async (username, password) => {
    try {
      const response = await axios.post('http://localhost:5011/api/Auth/signin', {
        username,
        password
      });
      const { token, detalhesDoUsuario } = response.data;
      setAuthData({ token, username: detalhesDoUsuario.username });
      localStorage.setItem('authData', JSON.stringify({ token, username: detalhesDoUsuario.username }));
    } catch (error) {
      console.error('Authentication failed:', error);
      throw error; // Re-throw the error to be caught in LoginPage
    }
  };

  const logout = () => {
    setAuthData(null);
    localStorage.removeItem('authData');
  };

  return (
    <AuthContext.Provider value={{ authData, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

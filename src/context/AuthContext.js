// src/context/AuthContext.js
import React, { createContext, useState } from 'react';
import axios from 'axios';
import { apiBaseUrl } from '../config';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authData, setAuthData] = useState(() => {
    const storedData = localStorage.getItem('authData');
    return storedData ? JSON.parse(storedData) : null;
  });

  const login = async (username, password) => {
    try {
      const response = await axios.post(`http://${apiBaseUrl}:5011/api/Auth/sign-in`, {
        username,
        password,
      });
      const { token, expiration, roles, clientIp } = response.data.data; // Atualizado para corresponder à resposta
      setAuthData({ token, username, expiration, roles, clientIp });
      localStorage.setItem('authData', JSON.stringify({ token, username, expiration, roles, clientIp }));
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

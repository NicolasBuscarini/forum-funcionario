// src/components/PrivateRoute/PrivateRoute.js
import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const PrivateRoute = ({ element }) => {
  const { authData } = useContext(AuthContext);

  return authData ? element : <Navigate to="/login" />;
};

export default PrivateRoute;

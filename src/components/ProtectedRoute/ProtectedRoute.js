// src/components/ProtectedRoute/ProtectedRoute.js
import React, { useContext } from 'react';
import { Route, Navigate } from 'react-router-dom';
import { AuthContext } from '../../context/AuthContext';

const ProtectedRoute = ({ element, ...rest }) => {
  const { authData } = useContext(AuthContext);

  return (
    <Route
      {...rest}
      element={authData ? element : <Navigate to="/login" />}
    />
  );
};

export default ProtectedRoute;

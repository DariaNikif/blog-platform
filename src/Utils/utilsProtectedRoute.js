import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { selectIsAuthenticated } from '../Redux/slice/authSlice';

const ProtectedRoute = ({ element }) => {
  const isAuthenticated = useSelector(selectIsAuthenticated);

  return isAuthenticated ? element : <Navigate to='/sign-in' />;
};

export default ProtectedRoute;

import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const ProtectedRoute = ({ children }) => {
  const { authenticated, loading } = useContext(AuthContext);

  if (loading) {
    return <div>Cargando...</div>; // Indicador de carga
  }

  if (!authenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

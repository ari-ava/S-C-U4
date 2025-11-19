import React from "react";
import { Navigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const ProtectedRoute = ({ children, allowedRoles }) => {
  const { user, role, loading } = useAuth();

  if (loading) return <p className="text-center p-10">Cargando...</p>;

  if (!user) return <Navigate to="/" replace />;

  if (!allowedRoles.includes(role)) {
    return <Navigate to="/no-authorized" replace />;
  }

  return children;
};

export default ProtectedRoute;

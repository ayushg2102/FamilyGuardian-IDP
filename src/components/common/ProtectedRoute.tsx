import React, { ReactNode } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../../contexts/AuthContext';

type ProtectedRouteProps = {
  children: ReactNode;
  allowedRoles?: string[];
  redirectTo?: string;
};

type ProtectedRouteComponent = React.FC<ProtectedRouteProps> & {
  defaultProps: {
    allowedRoles: string[];
    redirectTo: string;
  };
};

const ProtectedRoute: ProtectedRouteComponent = ({
  children,
  allowedRoles = [],
  redirectTo = '/',
}) => {
  const { user, isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role || '')) {
    return <Navigate to={redirectTo} replace />;
  }

  return <>{children}</>;
};

ProtectedRoute.defaultProps = {
  allowedRoles: [],
  redirectTo: '/',
};

export default ProtectedRoute;

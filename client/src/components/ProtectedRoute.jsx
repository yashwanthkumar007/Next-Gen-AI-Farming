import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children, allowedRoles }) => {
const token = localStorage.getItem('token');
const user = JSON.parse(localStorage.getItem('user'));
const role = localStorage.getItem('userRole');

if (!token || !user) {
return <Navigate to="/" replace />;
}

if (allowedRoles && !allowedRoles.includes(role)) {
return <Navigate to="/unauthorized" replace />;
}

return children;
};

export default ProtectedRoute;
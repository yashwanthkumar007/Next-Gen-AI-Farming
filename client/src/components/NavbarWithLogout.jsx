import React from 'react';
import { useNavigate } from 'react-router-dom';

const NavbarWithLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-light bg-light px-4 mb-3 shadow-sm">
      <span className="navbar-brand fw-bold">🌾 NextGen AI Farming</span>
      <button className="btn btn-outline-danger btn-sm" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default NavbarWithLogout;

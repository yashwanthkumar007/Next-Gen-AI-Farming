import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/NavbarWithLogout.css'; // Import CSS

const NavbarWithLogout = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    localStorage.removeItem('userRole');
    navigate('/');
  };

  return (
    <nav className="navbar navbar-custom d-flex justify-content-between align-items-center mb-3">
      <span className="navbar-brand">🌾 NextGen AI Farming</span>
      <button className="btn btn-logout" onClick={handleLogout}>
        Logout
      </button>
    </nav>
  );
};

export default NavbarWithLogout;

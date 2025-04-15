import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import {Link } from 'react-router-dom';

const Login = () => {
  const [role, setRole] = useState('farmer');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: username, password })
      });
  
      const data = await response.json();
      if (response.ok) {
        localStorage.setItem('token', data.token);
        localStorage.setItem('userRole', data.user.role);
  
        if (data.user.role === 'farmer') navigate('/farmer-dashboard');
        else if (data.user.role === 'buyer') navigate('/buyer-dashboard');
        else if (data.user.role === 'admin') navigate('/admin-dashboard');
      } else {
        alert(data.error || 'Login failed');
      }
    } catch (err) {
      console.error(err);
      alert('Something went wrong');
    }
  };
  

  return (
    <div
      className="d-flex align-items-center justify-content-center vh-100"
      style={{
        background: 'linear-gradient(135deg, #e9f5ec 0%, #d4f2e3 100%)',
        fontFamily: 'Segoe UI, sans-serif',
      }}
    >
      <div
        className="card shadow-lg p-4 border-0 animate__animated animate__fadeInDown"
        style={{ width: '100%', maxWidth: 430, borderRadius: '16px' }}
      >
        <h3 className="text-center text-success mb-4">🌱 Smart Farming Login</h3>

        <form onSubmit={handleLogin}>
          <div className="mb-3">
            <label className="form-label">Select Role</label>
            <select
              className="form-select shadow-sm"
              value={role}
              onChange={(e) => setRole(e.target.value)}
            >
              <option value="farmer">👨‍🌾 Farmer</option>
              <option value="buyer">🛒 Buyer</option>
              <option value="admin">🧑‍💼 Admin</option>
            </select>
          </div>

          <div className="mb-3">
            <label className="form-label">Username</label>
            <input
              type="text"
              className="form-control shadow-sm"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter your username"
              required
            />
          </div>

          <div className="mb-3">
            <label className="form-label">Password</label>
            <input
              type="password"
              className="form-control shadow-sm"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              required
            />
          </div>

          <button className="btn btn-success w-100 mt-2 shadow-sm">Login</button>
        </form>

        <div className="text-center mt-3">
  <small className="text-muted">
    Don't have an account?{' '}
    <Link to="/register" className="text-decoration-none">
      Register here
    </Link>
  </small>
</div>

      </div>
    </div>
  );
};

export default Login;

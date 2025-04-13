import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

const Login = () => {
  const [role, setRole] = useState('farmer');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    if (username && password) {
      if (role === 'farmer') navigate('/farmer-dashboard');
      else if (role === 'admin') navigate('/admin-dashboard');
      else navigate('/buyer-dashboard');
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
          <small className="text-muted">Don't have an account? Register coming soon.</small>
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import '../styles/Login.css';

const roleBackgrounds = {
  farmer: "url('/images/farmer-bg.jpg')",
  buyer: "url('/images/buyer-bg.jpg')",
  admin: "url('/images/admin-bg.jpg')",
};

const Login = () => {
  const [role, setRole] = useState('farmer');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch('http://localhost:5000/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password, role }),
      });

      const data = await response.json();

      if (response.status === 403) {
        alert(data.message || 'Account deactivated');
        return;
      }

      if (!response.ok) {
        alert(data.message || 'Login failed');
        return;
      }

      if (data.user.role !== role && data.user.role !== 'admin') {
        alert(`❌ Role mismatch. You selected ${role} but your account is ${data.user.role}`);
        return;
      }

      localStorage.setItem('token', data.token);
      localStorage.setItem('userRole', data.user.role);
      localStorage.setItem('user', JSON.stringify(data.user));

      if (data.user.role === 'farmer') navigate('/farmer-dashboard');
      else if (data.user.role === 'buyer') navigate('/buyer-dashboard');
      else if (data.user.role === 'admin') navigate('/admin-dashboard');

      setTimeout(() => window.location.reload(), 100);
    } catch (err) {
      console.error('Login error:', err);
      alert('Something went wrong. Try again.');
    }
  };

  return (
    <div
      className="login-background d-flex align-items-center justify-content-center vh-100"
      style={{
        backgroundImage: roleBackgrounds[role],
        transition: 'background-image 0.5s ease-in-out',
      }}
    >
      <div className="card login-card shadow-lg p-4 border-0 animate__animated animate__fadeInDown">
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
            <label className="form-label">Email</label>
            <input
              type="email"
              className="form-control shadow-sm"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
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
            Don&apos;t have an account?{' '}
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

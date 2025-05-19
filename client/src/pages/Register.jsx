import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';

const Register = () => {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    name: '',
    email: '',
    password: '',
    role: 'farmer',
    phone: '',
    location: '',
    bio: '',
    razorpayAccountId: ''
  });
  const [error, setError] = useState('');

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      name: form.name,
      email: form.email,
      password: form.password,
      role: form.role
    };

    // Include farmer-specific fields if role is farmer
    if (form.role === 'farmer') {
      payload.phone = form.phone;
      payload.location = form.location;
      payload.bio = form.bio;
      payload.razorpayAccountId = form.razorpayAccountId;
    }

    try {
      const res = await fetch('http://localhost:5000/api/auth/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Registration failed');
        return;
      }

      alert('✅ Registration successful!');
      navigate('/');
    } catch (err) {
      console.error('Registration error:', err);
      setError('Server error. Please try again.');
    }
  };

  return (
    <div className="d-flex align-items-center justify-content-center vh-100 bg-light">
      <div className="card shadow-lg p-4 border-0 animate__animated animate__fadeInDown" style={{ width: '100%', maxWidth: 500, borderRadius: '16px' }}>
        <h3 className="text-center text-success mb-3">🌿 Smart Farming Register</h3>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="mb-2">
            <label className="form-label">Full Name</label>
            <input type="text" className="form-control" name="name" value={form.name} onChange={handleChange} required />
          </div>

          <div className="mb-2">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" name="email" value={form.email} onChange={handleChange} required />
          </div>

          <div className="mb-2">
            <label className="form-label">Password</label>
            <input type="password" className="form-control" name="password" value={form.password} onChange={handleChange} required />
          </div>

          <div className="mb-2">
            <label className="form-label">Role</label>
            <select className="form-select" name="role" value={form.role} onChange={handleChange}>
              <option value="farmer">👨‍🌾 Farmer</option>
              <option value="buyer">🛒 Buyer</option>
            </select>
          </div>

          {form.role === 'farmer' && (
            <>
              <div className="mb-2">
                <label className="form-label">Phone</label>
                <input type="text" className="form-control" name="phone" value={form.phone} onChange={handleChange} required />
              </div>
              <div className="mb-2">
                <label className="form-label">Location</label>
                <input type="text" className="form-control" name="location" value={form.location} onChange={handleChange} required />
              </div>
              <div className="mb-2">
                <label className="form-label">Short Bio</label>
                <textarea className="form-control" name="bio" rows="2" value={form.bio} onChange={handleChange} required />
              </div>
              <div className="mb-2">
                <label className="form-label">Razorpay Linked Account ID</label>
                <input type="text" className="form-control" name="razorpayAccountId" value={form.razorpayAccountId} onChange={handleChange} required />
              </div>
            </>
          )}

          <button className="btn btn-success w-100 mt-3">Register</button>
        </form>

        <div className="text-center mt-3">
          <small className="text-muted">
            Already registered?{' '}
            <Link to="/" className="text-decoration-none">
              Login
            </Link>
          </small>
        </div>
      </div>
    </div>
  );
};

export default Register;

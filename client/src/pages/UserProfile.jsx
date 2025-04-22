import React, { useEffect, useState } from 'react';
import axios from 'axios';
import NavbarWithLogout from '../components/NavbarWithLogout';
import { useNavigate } from 'react-router-dom';

const UserProfile = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    location: '',
    bio: '',
    role: ''
  });
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');
  const token = localStorage.getItem('token');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get('http://localhost:5000/api/profile', {
          headers: { Authorization: `Bearer ${token}` },
        });
        setFormData(res.data);
      } catch (err) {
        setMessage('❌ Failed to load profile');
      }
    };

    fetchProfile();
  }, [token]);

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSave = async () => {
    try {
      const res = await axios.put('http://localhost:5000/api/profile', formData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setFormData(res.data);
      setMessage('✅ Profile updated');
      setEditMode(false);
    } catch (err) {
      setMessage('❌ Failed to update');
    }
  };

  return (
    <div className="bg-light min-vh-100 px-3 py-5">
      <div className="container">
        <div className="card shadow p-4 mx-auto" style={{ maxWidth: 550 }}>
          <h3 className="text-center text-success mb-3">👤 My Profile</h3>

          {message && (
            <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-danger'}`}>
              {message}
            </div>
          )}

          <div className="mb-3">
            <label>Name</label>
            {editMode ? (
              <input name="name" value={formData.name} onChange={handleChange} className="form-control" />
            ) : (
              <div className="form-control-plaintext">{formData.name}</div>
            )}
          </div>

          <div className="mb-3">
            <label>Email (read-only)</label>
            <div className="form-control-plaintext">{formData.email}</div>
          </div>

          <div className="mb-3">
            <label>Role</label>
            <div className="form-control-plaintext text-capitalize">{formData.role}</div>
          </div>

          <div className="mb-3">
            <label>Phone</label>
            {editMode ? (
              <input name="phone" value={formData.phone} onChange={handleChange} className="form-control" />
            ) : (
              <div className="form-control-plaintext">{formData.phone || 'N/A'}</div>
            )}
          </div>

          <div className="mb-3">
            <label>Location</label>
            {editMode ? (
              <input name="location" value={formData.location} onChange={handleChange} className="form-control" />
            ) : (
              <div className="form-control-plaintext">{formData.location || 'N/A'}</div>
            )}
          </div>

          <div className="mb-3">
            <label>Bio</label>
            {editMode ? (
              <textarea name="bio" rows={3} value={formData.bio} onChange={handleChange} className="form-control" />
            ) : (
              <div className="form-control-plaintext">{formData.bio || 'N/A'}</div>
            )}
          </div>

          {editMode ? (
            <div className="d-flex justify-content-between">
              <button className="btn btn-secondary" onClick={() => setEditMode(false)}>Cancel</button>
              <button className="btn btn-success" onClick={handleSave}>Save</button>
            </div>
          ) : (
            <div className="d-flex justify-content-between">
              <button className="btn btn-outline-primary" onClick={() => setEditMode(true)}>
                ✏️ Edit Profile
              </button>
              <button className="btn btn-link" onClick={() => navigate(-1)}>
                ⬅️ Back
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

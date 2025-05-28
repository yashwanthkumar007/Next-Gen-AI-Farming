import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../styles/UserProfile.css';

const UserProfile = () => {
  const [formData, setFormData] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(true);
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
        if (err.response?.status === 401) {
          navigate('/login');
        } else {
          setMessage('❌ Failed to load profile');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchProfile();
  }, [token, navigate]);

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
      setMessage('❌ Failed to update profile');
    }
  };

  if (loading) return <div className="text-center mt-5 text-white">Loading profile...</div>;
  if (!formData) return <div className="text-danger text-center mt-5">Unable to load profile.</div>;

  return (
    <div className="user-profile-wrapper d-flex align-items-center justify-content-center min-vh-100">
      <div className="profile-card animate__animated animate__fadeInUp shadow-lg p-4 rounded-4 glass-card">
        <h3 className="text-center text-success mb-3">👤 My Profile</h3>

        {message && (
          <div className={`alert ${message.includes('✅') ? 'alert-success' : 'alert-danger'}`} role="alert">
            {message}
          </div>
        )}

        <div className="form-group mb-3">
          <label>Name</label>
          {editMode ? (
            <input
              name="name"
              value={formData.name || ''}
              onChange={handleChange}
              className="form-control"
            />
          ) : (
            <div className="form-control-plaintext">{formData.name}</div>
          )}
        </div>

        <div className="form-group mb-3">
          <label>Email (read-only)</label>
          <div className="form-control-plaintext">{formData.email}</div>
        </div>

        <div className="form-group mb-3">
          <label>Role</label>
          <div className="form-control-plaintext text-capitalize">{formData.role}</div>
        </div>

        <div className="form-group mb-3">
          <label>Phone</label>
          {editMode ? (
            <input
              name="phone"
              value={formData.phone || ''}
              onChange={handleChange}
              className="form-control"
            />
          ) : (
            <div className="form-control-plaintext">{formData.phone || 'N/A'}</div>
          )}
        </div>

        <div className="form-group mb-3">
          <label>Location</label>
          {editMode ? (
            <input
              name="location"
              value={formData.location || ''}
              onChange={handleChange}
              className="form-control"
            />
          ) : (
            <div className="form-control-plaintext">{formData.location || 'N/A'}</div>
          )}
        </div>

        <div className="form-group mb-3">
          <label>Bio</label>
          {editMode ? (
            <textarea
              name="bio"
              rows={3}
              value={formData.bio || ''}
              onChange={handleChange}
              className="form-control"
            />
          ) : (
            <div className="form-control-plaintext">{formData.bio || 'N/A'}</div>
          )}
        </div>

        {formData.role === 'farmer' && (
          <div className="form-group mb-3">
            <label>Razorpay Account ID</label>
            {editMode ? (
              <input
                name="razorpayAccountId"
                value={formData.razorpayAccountId || ''}
                onChange={handleChange}
                className="form-control"
              />
            ) : (
              <div className="form-control-plaintext">
                {formData.razorpayAccountId || 'Not Provided'}
              </div>
            )}
          </div>
        )}

        <div className="d-flex justify-content-between mt-4">
          {editMode ? (
            <>
              <button className="btn btn-secondary px-4" onClick={() => setEditMode(false)}>
                Cancel
              </button>
              <button className="btn btn-success px-4" onClick={handleSave}>
                Save
              </button>
            </>
          ) : (
            <>
              <button className="btn btn-outline-darkgreen px-4" onClick={() => setEditMode(true)}>
  ✏️ Edit Profile
</button>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserProfile;

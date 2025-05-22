import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavbarWithLogout from '../components/NavbarWithLogout';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import '../styles/FarmerPublicProfile.css';

const FarmerPublicProfile = () => {
  const { id } = useParams();
  const [farmer, setFarmer] = useState(null);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchFarmer = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${id}`);
        if (!res.ok) throw new Error('Farmer not found');
        const data = await res.json();
        setFarmer(data);
      } catch (err) {
        console.error(err);
        setError('❌ Farmer not found or unavailable.');
      }
    };
    fetchFarmer();
  }, [id]);

  return (
    <div className="farmer-profile-bg min-vh-100 d-flex flex-column">
      <div className="container d-flex flex-grow-1 align-items-center justify-content-center">
        <div className="profile-card card p-4 shadow-lg animate__animated animate__fadeIn">
          <h3 className="text-center text-success mb-4">👨‍🌾 Farmer Profile</h3>
          {error ? (
            <div className="alert alert-danger text-center">{error}</div>
          ) : farmer ? (
            <ul className="list-group list-group-flush">
              <li className="list-group-item bg-transparent">
                <strong>Name:</strong> {farmer.name || 'N/A'}
              </li>
              <li className="list-group-item bg-transparent">
                <strong>Email:</strong> {farmer.email || 'N/A'}
              </li>
              <li className="list-group-item bg-transparent">
                <strong>Phone:</strong> {farmer.phone || 'N/A'}
              </li>
              <li className="list-group-item bg-transparent">
                <strong>Location:</strong> {farmer.location || 'N/A'}
              </li>
              <li className="list-group-item bg-transparent">
                <strong>Bio:</strong> {farmer.bio || 'N/A'}
              </li>
            </ul>
          ) : (
            <p className="text-center text-white">Loading...</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default FarmerPublicProfile;

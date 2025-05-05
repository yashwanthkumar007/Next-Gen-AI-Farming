import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import NavbarWithLogout from '../components/NavbarWithLogout';

const FarmerPublicProfile = () => {
  const { id } = useParams(); // farmerId from URL
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
    <div className="bg-light min-vh-100 px-3 py-5 animate__animated animate__fadeIn">
      
      <div className="container">
        <h3 className="text-center text-success mb-4">👨‍🌾 Farmer Profile</h3>
        {error ? (
          <div className="alert alert-danger text-center">{error}</div>
        ) : farmer ? (
          <div className="card p-4 shadow-sm mx-auto" style={{ maxWidth: 500 }}>
            <ul className="list-unstyled mb-0">
              <li><strong>Name:</strong> {farmer.name || 'N/A'}</li>
              <li><strong>Email:</strong> {farmer.email || 'N/A'}</li>
              <li><strong>Phone:</strong> {farmer.phone || 'N/A'}</li>
              <li><strong>Location:</strong> {farmer.location || 'N/A'}</li>
              <li><strong>Bio:</strong> {farmer.bio || 'N/A'}</li>
            </ul>
          </div>
        ) : (
          <p className="text-center">Loading...</p>
        )}
      </div>
    </div>
  );
};

export default FarmerPublicProfile;

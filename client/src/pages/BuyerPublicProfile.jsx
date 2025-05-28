import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/BuyerPublicProfile.css';

const BuyerPublicProfile = () => {
  const { id } = useParams();
  const [buyer, setBuyer] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBuyer = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/users/${id}`);
        const data = await res.json();
        setBuyer(data);
      } catch (err) {
        console.error('Error fetching buyer:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchBuyer();
  }, [id]);

  if (loading) {
    return (
      <div className="bpp-loading-container text-center mt-5">
        <div className="spinner-border bpp-spinner" role="status" />
        <p className="text-muted mt-2 bpp-loading-text">Loading buyer profile...</p>
      </div>
    );
  }

  if (!buyer) {
    return (
      <div className="bpp-error-container text-center text-danger mt-5">
        ❌ Buyer not found
      </div>
    );
  }

  return (
    <div className="bpp-wrapper container py-5">
      <div className="bpp-card card shadow-sm p-4 animate-fadein">
        <h4 className="bpp-title text-success mb-4">👤 Buyer Profile</h4>
        <p><strong>Name:</strong> <span className="bpp-info">{buyer.name}</span></p>
        <p><strong>Email:</strong> <span className="bpp-info">{buyer.email}</span></p>
        <p><strong>Phone:</strong> <span className="bpp-info">{buyer.phone || 'N/A'}</span></p>
        <p><strong>Location:</strong> <span className="bpp-info">{buyer.location || 'N/A'}</span></p>
        <p><strong>Bio:</strong> <span className="bpp-info">{buyer.bio || 'N/A'}</span></p>
      </div>
    </div>
  );
};

export default BuyerPublicProfile;

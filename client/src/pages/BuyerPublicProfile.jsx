import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const BuyerPublicProfile = () => {
  const { id } = useParams(); // buyerId from route param
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
      <div className="text-center mt-5">
        <div className="spinner-border text-primary" role="status" />
        <p className="text-muted mt-2">Loading buyer profile...</p>
      </div>
    );
  }

  if (!buyer) {
    return <p className="text-center text-danger">❌ Buyer not found</p>;
  }

  return (
    <div className="container py-5">
      <div className="card shadow-sm p-4">
        <h4 className="text-primary mb-3">👤 Buyer Profile</h4>
        <p><strong>Name:</strong> {buyer.name}</p>
        <p><strong>Email:</strong> {buyer.email}</p>
        <p><strong>Phone:</strong> {buyer.phone || 'N/A'}</p>
        <p><strong>Location:</strong> {buyer.location || 'N/A'}</p>
        <p><strong>Bio:</strong> {buyer.bio || 'N/A'}</p>
      </div>
    </div>
  );
};

export default BuyerPublicProfile;

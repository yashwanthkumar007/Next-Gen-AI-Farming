import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const PaymentPage = () => {
  const { cropId, quantity } = useParams();
  const navigate = useNavigate();
  const [crop, setCrop] = useState(null);
  const [loading, setLoading] = useState(true);
  const [processing, setProcessing] = useState(false);

  useEffect(() => {
    const fetchCrop = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/crops/${cropId}`);
        const data = await res.json();
        setCrop(data);
      } catch (err) {
        console.error('Error fetching crop details:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCrop();
  }, [cropId]);

  const handlePayment = async () => {
    setProcessing(true);
    try {
      const res = await fetch('http://localhost:5000/api/payment/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cropId, quantity: parseInt(quantity) })
      });

      const data = await res.json();
      if (res.ok) {
        alert('✅ Payment successful!');
        navigate('/buyer-dashboard');
      } else {
        alert(`❌ ${data.error}`);
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('❌ Something went wrong during payment');
    } finally {
      setProcessing(false);
    }
  };

  if (loading) return <div className="text-center p-5">Loading...</div>;

  return (
    <div className="container py-5">
      <div className="card p-4 shadow-sm">
        <h4 className="mb-3 text-success">Payment Summary</h4>
        <ul className="list-unstyled">
          <li><strong>Crop:</strong> {crop.name}</li>
          <li><strong>Farmer:</strong> {crop.farmer}</li>
          <li><strong>Price per kg:</strong> ₹{crop.price}</li>
          <li><strong>Quantity:</strong> {quantity} kg</li>
          <li><strong>Total Amount:</strong> ₹{crop.price * quantity}</li>
        </ul>

        <button
          className="btn btn-success mt-3"
          onClick={handlePayment}
          disabled={processing}
        >
          {processing ? 'Processing...' : 'Pay Now'}
        </button>
      </div>
    </div>
  );
};

export default PaymentPage;

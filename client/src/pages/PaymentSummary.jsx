import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';

const PaymentSummary = () => {
  const { cropId } = useParams();
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const quantity = parseInt(searchParams.get('quantity'));
  const buyerId = searchParams.get('buyerId');

  const [crop, setCrop] = useState(null);
  const [paying, setPaying] = useState(false);

  useEffect(() => {
    const fetchCrop = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/crops');
        const data = await res.json();
        const match = data.find(c => c._id === cropId);
        setCrop(match);
      } catch (err) {
        console.error('Error fetching crop:', err);
      }
    };
    fetchCrop();
  }, [cropId]);

  const handleSimulatePayment = async () => {
    setPaying(true);
    try {
      const payload = {
        cropId,
        quantity,
        buyerId,
        orderId: 'simulated_order_' + Date.now(), // mock order ID
      };

      console.log('Sending payload:', payload);

      const res = await fetch('http://localhost:5000/api/payment/simulate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload),
      });

      const data = await res.json();
      if (res.ok) {
        alert('✅ Payment successful & quantity updated!');
        navigate('/buyer-dashboard');
      } else {
        alert(`❌ ${data.error || 'Payment failed'}`);
      }
    } catch (err) {
      console.error('Simulate error:', err);
      alert('❌ Something went wrong');
    } finally {
      setPaying(false);
    }
  };

  if (!crop) return <div className="text-center mt-5">Loading crop details...</div>;

  const total = quantity * parseFloat(crop.price || 0);

  return (
    <div className="container py-5">
      <h4 className="mb-4 text-success">💳 Payment Summary</h4>
      <div className="card shadow-sm p-4">
        <p><strong>Crop:</strong> {crop.name}</p>
        <p><strong>Farmer:</strong> {crop.farmerId?.name || 'Unknown'}</p>
        <p><strong>Quantity:</strong> {quantity} kg</p>
        <p><strong>Rate:</strong> ₹{crop.price} / kg</p>
        <h5 className="mt-3">Total Amount: ₹{total}</h5>
        <button
          className="btn btn-success mt-4"
          onClick={handleSimulatePayment}
          disabled={paying}
        >
          {paying ? 'Processing...' : 'Confirm & Pay'}
        </button>
      </div>
    </div>
  );
};

export default PaymentSummary;

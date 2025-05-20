import React, { useEffect, useState } from 'react';
import { useParams, useSearchParams, useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const CardPayment = () => {
const { cropId } = useParams();
const [searchParams] = useSearchParams();
const navigate = useNavigate();

const quantity = parseInt(searchParams.get('quantity'));
const buyerId = searchParams.get('buyerId');

const [crop, setCrop] = useState(null);
const [paying, setPaying] = useState(false);
const [cardDetails, setCardDetails] = useState({
cardNumber: '',
expiry: '',
cvv: '',
});

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

const handleChange = e => {
setCardDetails(prev => ({
...prev,
[e.target.name]: e.target.value,
}));
};

const handleSimulatedPayment = async () => {
if (!cardDetails.cardNumber || !cardDetails.expiry || !cardDetails.cvv) {
alert('Please enter all card details');
return;
}

setPaying(true);
try {
  const res = await fetch('http://localhost:5000/api/payment/simulate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      cropId,
      quantity,
      buyerId,
      orderId: 'mock_order_' + Date.now(),
    }),
  });

  const data = await res.json();
  if (res.ok) {
    alert('✅ payment successful!');
    navigate('/buyer-dashboard');
  } else {
    alert(`❌ ${data.error || 'Payment failed'}`);
  }
} catch (err) {
  console.error('payment error:', err);
  alert('Something went wrong');
} finally {
  setPaying(false);
}
};

if (!crop) return <div className="text-center mt-5">Loading crop info...</div>;

const total = quantity * parseFloat(crop.price);

return (
<div className="container py-5">
<h4 className="mb-4 text-success">💳 Card Payment</h4>
<div className="card shadow-sm p-4">
<p><strong>Crop:</strong> {crop.name}</p>
<p><strong>Farmer:</strong> {crop.farmerId?.name || 'Unknown'}</p>
<p><strong>Quantity:</strong> {quantity} kg</p>
<p><strong>Price per kg:</strong> ₹{crop.price}</p>
<h5 className="mt-3">Total: ₹{total}</h5>

    <hr />
    <div className="mb-3">
      <label>Card Number</label>
      <input type="text" name="cardNumber" className="form-control" value={cardDetails.cardNumber} onChange={handleChange} placeholder="1234 5678 9012 3456" />
    </div>
    <div className="row">
      <div className="col-md-6 mb-3">
        <label>Expiry</label>
        <input type="text" name="expiry" className="form-control" value={cardDetails.expiry} onChange={handleChange} placeholder="MM/YY" />
      </div>
      <div className="col-md-6 mb-3">
        <label>CVV</label>
        <input type="password" name="cvv" className="form-control" value={cardDetails.cvv} onChange={handleChange} placeholder="123" />
      </div>
    </div>

    <button
      className="btn btn-success mt-3"
      onClick={handleSimulatedPayment}
      disabled={paying}
    >
      {paying ? 'Processing...' : 'Pay & Confirm'}
    </button>
  </div>
</div>
);
};

export default CardPayment;
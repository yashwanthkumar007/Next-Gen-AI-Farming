import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import '../styles/DashboardBuyer.css';

const DashboardBuyer = () => {
const navigate = useNavigate();
const [crops, setCrops] = useState([]);
const [loading, setLoading] = useState(true);
const [showModal, setShowModal] = useState(false);
const [selectedCrop, setSelectedCrop] = useState(null);
const [interestQuantity, setInterestQuantity] = useState('');
const [locationFilter, setLocationFilter] = useState('');
const [minPrice, setMinPrice] = useState('');
const [maxPrice, setMaxPrice] = useState('');
const [cropNameFilter, setCropNameFilter] = useState('');

useEffect(() => {
const fetchCrops = async () => {
try {
const res = await fetch('http://localhost:5000/api/crops');
const data = await res.json();
setCrops(data);
} catch (err) {
console.error('Error fetching crops:', err);
setCrops([]);
} finally {
setLoading(false);
}
};
fetchCrops();
}, []);

const handleInterestClick = (crop) => {
setSelectedCrop(crop);
setShowModal(true);
};

const handleSubmitInterest = () => {
const quantity = parseInt(interestQuantity);
if (!selectedCrop || !quantity || quantity <= 0) return;

const total = quantity * parseFloat(selectedCrop.price);
const confirm = window.confirm(`Pay ₹${total} to ${selectedCrop.farmerId?.name}?`);
if (!confirm) return;

const buyer = JSON.parse(localStorage.getItem('user'));
navigate(`/payment/${selectedCrop._id}?quantity=${quantity}&buyerId=${buyer.id}`);
};

const filteredCrops = crops.filter((crop) => {
const matchesName = crop.name.toLowerCase().includes(cropNameFilter.toLowerCase());
const matchesLocation = crop.location.toLowerCase().includes(locationFilter.toLowerCase());
const price = parseFloat(crop.price);
const matchesMin = minPrice === '' || price >= parseFloat(minPrice);
const matchesMax = maxPrice === '' || price <= parseFloat(maxPrice);
return matchesName && matchesLocation && matchesMin && matchesMax;
});

return (
<div className="dashboard-container animate__animated animate__fadeIn">
<div className="container">
<div className="d-flex justify-content-between align-items-center mb-4">
<h3 className="text-warning">🛒 Buyer Dashboard</h3>
<button className="btn btn-outline-primary btn-sm" onClick={() => navigate('/profile')}>
👤 My Profile
</button>
</div>


    <div className="row mb-4 filter-row">
      <div className="col-md-2">
        <input type="text" className="form-control form-control-sm" placeholder="Crop Name" value={cropNameFilter} onChange={(e) => setCropNameFilter(e.target.value)} />
      </div>
      <div className="col-md-2">
        <input type="text" className="form-control form-control-sm" placeholder="Location" value={locationFilter} onChange={(e) => setLocationFilter(e.target.value)} />
      </div>
      <div className="col-md-2">
        <input type="number" className="form-control form-control-sm" placeholder="Min. Price" value={minPrice} onChange={(e) => setMinPrice(e.target.value)} />
      </div>
      <div className="col-md-2">
        <input type="number" className="form-control form-control-sm" placeholder="Max. Price" value={maxPrice} onChange={(e) => setMaxPrice(e.target.value)} />
      </div>
    </div>

    {loading ? (
      <div className="text-center mt-5">
        <div className="spinner-border text-warning" role="status" />
        <p className="text-muted mt-2">Loading crop listings...</p>
      </div>
    ) : filteredCrops.length === 0 ? (
      <div className="text-center mt-5 text-muted">🚫 No crops match your filter criteria.</div>
    ) : (
      <div className="row g-4">
        {filteredCrops.map((crop, index) => (
          <div className="col-md-4" key={index}>
            <div className="card crop-card p-3">
              <h5>{crop.name}</h5>
              <ul className="list-unstyled small">
                <li>📍 {crop.location}</li>
                <li>🧺 Quantity: {crop.quantity} kg</li>
                <li>💰 Price: ₹{crop.price}</li>
                <li>
                  👨‍🌾 Farmer:{' '}
                  <button className="btn btn-link p-0" onClick={() => navigate(`/farmer/${crop.farmerId._id}`)}>
                    {crop.farmerId?.name || 'Unknown'}
                  </button>
                </li>
              </ul>
              <button className="btn btn-sm btn-outline-warning w-100" onClick={() => handleInterestClick(crop)}>
                Express Interest
              </button>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>

  {showModal && (
    <div className="modal show fade d-block modal-backdrop-custom">
      <div className="modal-dialog">
        <div className="modal-content p-4">
          <h5 className="mb-3">Express Interest</h5>
          <p>
            How much quantity (kg) you want to buy for crop <b>{selectedCrop?.name}</b>?
          </p>
          <input
            type="number"
            className="form-control"
            value={interestQuantity}
            onChange={(e) => setInterestQuantity(e.target.value)}
            min={1}
          />
          {interestQuantity && selectedCrop?.price && (
            <p className="mt-3">💰 Total: ₹{parseInt(interestQuantity) * parseFloat(selectedCrop.price)}</p>
          )}
          <div className="d-flex justify-content-end gap-2 mt-4">
            <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
            <button className="btn btn-success" onClick={handleSubmitInterest}>
              Pay & Proceed
            </button>
          </div>
        </div>
      </div>
    </div>
  )}
</div>
);
};

export default DashboardBuyer;
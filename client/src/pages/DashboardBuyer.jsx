import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import { useNavigate } from 'react-router-dom';

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
  const [cropNameFilter, setCropNameFilter] = useState(''); // New state for crop name filter

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

  const handleSubmitInterest = async () => {
    if (!selectedCrop || !interestQuantity) return;

    try {
      const res = await fetch('http://localhost:5000/api/crops/express-interest', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cropId: selectedCrop._id, buyQuantity: parseInt(interestQuantity) })
      });

      const data = await res.json();

      if (res.ok) {
        alert('✅ Interest submitted successfully!');
        setShowModal(false);
        setInterestQuantity('');
        window.location.reload();
      } else {
        alert(`❌ ${data.error}`);
      }
    } catch (err) {
      console.error('❌ Error submitting interest:', err);
      alert('❌ Something went wrong. Try again.');
    }
  };

  // Filtering crops based on name, location, and price range
  const filteredCrops = crops.filter((crop) => {
    const matchesName = crop.name.toLowerCase().includes(cropNameFilter.toLowerCase());
    const matchesLocation = locationFilter === '' || crop.location.toLowerCase().includes(locationFilter.toLowerCase());
    const cropPrice = parseFloat(crop.price);
    const matchesMin = minPrice === '' || cropPrice >= parseFloat(minPrice);
    const matchesMax = maxPrice === '' || cropPrice <= parseFloat(maxPrice);
    return matchesName && matchesLocation && matchesMin && matchesMax;
  });

  return (
    <div className="bg-light min-vh-100 px-3 py-5 animate__animated animate__fadeIn">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h3 className="text-warning">🛒 Buyer Dashboard</h3>
          <button
            className="btn btn-outline-primary btn-sm"
            onClick={() => navigate('/profile')}
          >
            👤 My Profile
          </button>
        </div>

        {/* Filters */}
        <div className="row mb-4 align-items-center">
          <div className="col-md-2">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Crop Name"
              value={cropNameFilter}
              onChange={(e) => setCropNameFilter(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input
              type="text"
              className="form-control form-control-sm"
              placeholder="Location"
              value={locationFilter}
              onChange={(e) => setLocationFilter(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control form-control-sm"
              placeholder="Min. Price"
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input
              type="number"
              className="form-control form-control-sm"
              placeholder="Max. Price"
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
            />
          </div>
        </div>

        {/* Crop Listings */}
        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-warning" role="status" />
            <p className="text-muted mt-2">Loading crop listings...</p>
          </div>
        ) : filteredCrops.length === 0 ? (
          <div className="text-center mt-5 text-muted">
            🚫 No crops match your filter criteria.
          </div>
        ) : (
          <div className="row g-4">
            {filteredCrops.map((crop, index) => (
              <div className="col-md-4" key={index}>
                <div className="card shadow-sm border-0 p-3">
                  <h5 className="text-success">{crop.name}</h5>
                  <ul className="list-unstyled small text-muted mb-2">
                    <li>📍 {crop.location}</li>
                    <li>🧺 Quantity: {crop.quantity} kg</li>
                    <li>💰 Price: {crop.price}</li>
                    <li>
                      👨‍🌾 Farmer:{' '}
                      <button
                        className="btn btn-link p-0"
                        onClick={() => navigate(`/farmer/${crop.farmerId}`)}
                      >
                        {crop.farmer || 'Unknown'}
                      </button>
                    </li>
                  </ul>
                  <button
                    className="btn btn-sm btn-outline-warning w-100"
                    onClick={() => handleInterestClick(crop)}
                  >
                    Express Interest
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Modal for Express Interest */}
      {showModal && (
        <div className="modal show fade d-block" tabIndex="-1" style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}>
          <div className="modal-dialog">
            <div className="modal-content p-4">
              <h5 className="mb-3">Express Interest</h5>
              <p>How much quantity (kg) you want to buy?</p>
              <input
                type="number"
                className="form-control"
                value={interestQuantity}
                onChange={(e) => setInterestQuantity(e.target.value)}
                min={1}
              />
              <div className="d-flex justify-content-end gap-2 mt-4">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>Cancel</button>
                <button className="btn btn-success" onClick={handleSubmitInterest}>Submit</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default DashboardBuyer;

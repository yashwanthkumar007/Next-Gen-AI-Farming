import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import '../styles/DashboardBuyer.css';

const DashboardBuyer = () => {
  const navigate = useNavigate();
  const [paying, setPaying] = useState(false);
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

  const handleSubmitInterest = async () => {
    if (!selectedCrop || !interestQuantity) return;

    const quantity = parseInt(interestQuantity);
    const amount = quantity * parseFloat(selectedCrop.price);

    if (quantity <= 0) {
      alert('Please enter a valid quantity');
      return;
    }

    const confirm = window.confirm(`Confirm to pay ₹${amount} to ${selectedCrop.farmer}?`);
    if (!confirm) return;

    setPaying(true);

    try {
      const res = await fetch('http://localhost:5000/api/payment/process', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          cropId: selectedCrop._id,
          quantity,
          amount,
        }),
      });

      const data = await res.json();
     if (res.ok) {
  const buyer = JSON.parse(localStorage.getItem('user'));
  setShowModal(false);
  navigate(`/payment/${selectedCrop._id}?quantity=${interestQuantity}&buyerId=${buyer.id}`);
}
 else {
        alert(`❌ ${data.error}`);
      }
    } catch (err) {
      console.error('Payment error:', err);
      alert('❌ Something went wrong');
    } finally {
      setPaying(false);
    }
  };

  const filteredCrops = crops.filter((crop) => {
    const matchesName = crop.name.toLowerCase().includes(cropNameFilter.toLowerCase());
    const matchesLocation = locationFilter === '' || crop.location.toLowerCase().includes(locationFilter.toLowerCase());
    const cropPrice = parseFloat(crop.price);
    const matchesMin = minPrice === '' || cropPrice >= parseFloat(minPrice);
    const matchesMax = maxPrice === '' || cropPrice <= parseFloat(maxPrice);
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

        <div className="row mb-4 align-items-center filter-row">
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
                <div className="card crop-card">
                  <h5>{crop.name}</h5>
                  <ul>
                    <li>📍 {crop.location}</li>
                    <li>🧺 Quantity: {crop.quantity} kg</li>
                    <li>💰 Price: ₹{crop.price}</li>
                    <li>
                      👨‍🌾 Farmer:{' '}
                      <button
                        className="btn btn-link p-0"
                        onClick={() => navigate(`/farmer/${crop.farmerId._id}`)}
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

      {/* Modal */}
      {showModal && (
        <div className="modal show fade d-block modal-backdrop-custom">
          <div className="modal-dialog">
            <div className="modal-content p-4">
              <h5 className="mb-3">Express Interest</h5>
              <p>How much quantity (kg) you want to buy for crop <b>{selectedCrop?.name}</b>?</p>
              <input
                type="number"
                className="form-control"
                value={interestQuantity}
                onChange={(e) => setInterestQuantity(e.target.value)}
                min={1}
              />
              {interestQuantity && selectedCrop?.price && (
                <p className="mt-3">
                  💰 Total: ₹{parseInt(interestQuantity) * parseFloat(selectedCrop.price)}
                </p>
              )}
              <div className="d-flex justify-content-end gap-2 mt-4">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-success" onClick={handleSubmitInterest} disabled={paying}>
                  {paying ? 'Processing...' : 'Pay & Submit'}
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

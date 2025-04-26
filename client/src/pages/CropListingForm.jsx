import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import NavbarWithLogout from '../components/NavbarWithLogout';

const CropListingForm = () => {
  const user = JSON.parse(localStorage.getItem('user')); // Assuming user is stored on login
  const farmerId = user?._id;
  const farmerName = user?.name || 'Unknown';

  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    price: '',
    location: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };



const handleSubmit = async (e) => {
  e.preventDefault();

  const cropData = {
    ...formData,
    farmer: user?.name || 'Unknown',
    farmerId: user?._id || null,  // 👈 ensure this is passed
  };

  try {
    const res = await fetch('http://localhost:5000/api/crops/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cropData),
    });

    const data = await res.json();
    console.log('✅ Submitted crop:', data);
    alert('✅ Crop listed successfully!');
  } catch (err) {
    console.error('❌ Failed to submit crop:', err);
    alert('❌ Failed to list crop');
  }
};


  return (
    <div className="bg-light min-vh-100 px-3 py-5 animate__animated animate__fadeIn">
      <NavbarWithLogout />
      <div className="container">
        <div className="card shadow p-4 mx-auto" style={{ maxWidth: 550 }}>
          <h3 className="text-success text-center mb-3">🌾 List a Crop for Sale</h3>
          <p className="text-muted text-center mb-4">
            Please fill in the details below to make your crop available on the market.
          </p>

          <form onSubmit={handleSubmit}>
            <div className="mb-3">
              <label className="form-label">Crop Name</label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. Tomato"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Quantity (in kg)</label>
              <input
                type="number"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. 200"
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Price (per unit)</label>
              <input
                type="text"
                name="price"
                value={formData.price}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. ₹25/kg"
                required
              />
            </div>

            <div className="mb-4">
              <label className="form-label">Location</label>
              <input
                type="text"
                name="location"
                value={formData.location}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. Erode"
                required
              />
            </div>

            <button className="btn btn-success w-100">Submit Crop</button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CropListingForm;

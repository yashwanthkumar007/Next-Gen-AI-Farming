import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'animate.css';
import NavbarWithLogout from '../components/NavbarWithLogout';


const CropListingForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    quantity: '',
    price: '',
    location: '',
    farmer: '',
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    alert('✅ Crop listed successfully (simulated)');
  };

  return (
    <div className="bg-light min-vh-100 px-3 py-5 animate__animated animate__fadeIn">
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
              <label className="form-label">Quantity</label>
              <input
                type="text"
                name="quantity"
                value={formData.quantity}
                onChange={handleChange}
                className="form-control"
                placeholder="e.g. 200kg"
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

            <div className="mb-3">
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

            <div className="mb-4">
              <label className="form-label">Your Name</label>
              <input
                type="text"
                name="farmer"
                value={formData.farmer}
                onChange={handleChange}
                className="form-control"
                placeholder="Farmer's Name"
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

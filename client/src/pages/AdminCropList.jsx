import React, { useEffect, useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminCropList = () => {
  const [crops, setCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cropFilter, setCropFilter] = useState('');
  const [locationFilter, setLocationFilter] = useState('');
  const [farmerFilter, setFarmerFilter] = useState('');
  const [minPrice, setMinPrice] = useState('');
  const [maxPrice, setMaxPrice] = useState('');

  useEffect(() => {
    const fetchCrops = async () => {
      try {
        const res = await fetch('http://localhost:5000/api/admin/crops');
        const data = await res.json();
        setCrops(data);
      } catch (err) {
        console.error('Error fetching crops:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchCrops();
  }, []);

  const handleDelete = async (cropId) => {
    if (!window.confirm('Are you sure you want to delete this crop listing?')) return;
    try {
      const res = await fetch(`http://localhost:5000/api/crops/delete/${cropId}`, {
        method: 'DELETE',
      });
      const data = await res.json();
      alert(data.message || 'Crop deleted');
      setCrops(prev => prev.filter(c => c._id !== cropId)); // Remove from UI
    } catch (err) {
      console.error('Error deleting crop:', err);
    }
  };

  // Apply filters here
  const filteredCrops = crops.filter(crop => {
    const matchesCrop = crop.name.toLowerCase().includes(cropFilter.toLowerCase());
    const matchesLocation = crop.location.toLowerCase().includes(locationFilter.toLowerCase());
    const matchesFarmer = (crop.farmerId?.name || '').toLowerCase().includes(farmerFilter.toLowerCase());
    const cropPrice = parseFloat(crop.price);
    const matchesMin = minPrice === '' || cropPrice >= parseFloat(minPrice);
    const matchesMax = maxPrice === '' || cropPrice <= parseFloat(maxPrice);

    return matchesCrop && matchesLocation && matchesFarmer && matchesMin && matchesMax;
  });

  return (
    <div className="container py-5">
      <h4 className="mb-4 text-primary">🌾 All Crop Listings (Admin View)</h4>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-primary" role="status" />
        </div>
      ) : crops.length === 0 ? (
        <p className="text-muted">No crop listings available.</p>
      ) : (
        <>
          <div className="row mb-4">
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Filter by Crop"
                value={cropFilter}
                onChange={(e) => setCropFilter(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Filter by Location"
                value={locationFilter}
                onChange={(e) => setLocationFilter(e.target.value)}
              />
            </div>
            <div className="col-md-3">
              <input
                type="text"
                className="form-control"
                placeholder="Filter by Farmer"
                value={farmerFilter}
                onChange={(e) => setFarmerFilter(e.target.value)}
              />
            </div>
            <div className="col-md-1">
              <input
                type="number"
                className="form-control"
                placeholder="Min ₹"
                value={minPrice}
                onChange={(e) => setMinPrice(e.target.value)}
              />
            </div>
            <div className="col-md-1">
              <input
                type="number"
                className="form-control"
                placeholder="Max ₹"
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
              />
            </div>
          </div>

          <div className="table-responsive">
            <table className="table table-bordered table-hover shadow-sm">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Crop</th>
                  <th>Quantity</th>
                  <th>Price</th>
                  <th>Location</th>
                  <th>Farmer</th>
                  <th>Email</th>
                  <th>Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredCrops.map((crop, index) => (
                  <tr key={crop._id}>
                    <td>{index + 1}</td>
                    <td>{crop.name}</td>
                    <td>{crop.quantity} kg</td>
                    <td>{crop.price}</td>
                    <td>{crop.location}</td>
                    <td>{crop.farmerId?.name || 'Unknown'}</td>
                    <td>{crop.farmerId?.email || '-'}</td>
                    <td>
                      <button
                        className="btn btn-sm btn-outline-danger"
                        onClick={() => handleDelete(crop._id)}
                      >
                        🗑️ Delete
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default AdminCropList;

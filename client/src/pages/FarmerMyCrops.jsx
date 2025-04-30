import React, { useState, useEffect } from 'react';
import NavbarWithLogout from '../components/NavbarWithLogout';

const FarmerMyCrops = () => {
  const [myCrops, setMyCrops] = useState([]);
  const [loading, setLoading] = useState(true);
  const [toastMessage, setToastMessage] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [editCrop, setEditCrop] = useState({});
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [cropToDelete, setCropToDelete] = useState(null);

  const user = JSON.parse(localStorage.getItem('user'));
  const farmerId = user?.id;

  useEffect(() => {
    fetchMyCrops();
  }, [farmerId]);

  const fetchMyCrops = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/crops/my-crops/${farmerId}`);
      const data = await res.json();
      setMyCrops(data);
    } catch (err) {
      console.error('Error fetching my crops:', err);
      setMyCrops([]);
    } finally {
      setLoading(false);
    }
  };

  const showToast = (message) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(''), 2500);
  };

  const handleDelete = (cropId) => {
    setCropToDelete(cropId);
    setShowDeleteModal(true);
  };

  const confirmDeleteCrop = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/crops/${cropToDelete}`, {
        method: 'DELETE',
      });
      if (res.ok) {
        showToast('✅ Crop deleted successfully');
        fetchMyCrops();
      } else {
        showToast('❌ Failed to delete crop');
      }
    } catch (err) {
      console.error(err);
      showToast('❌ Error deleting crop');
    } finally {
      setShowDeleteModal(false);
      setCropToDelete(null);
    }
  };

  const openEditModal = (crop) => {
    setEditCrop(crop);
    setShowModal(true);
  };

  const handleModalChange = (e) => {
    setEditCrop({ ...editCrop, [e.target.name]: e.target.value });
  };

  const handleModalSave = async () => {
    if (!editCrop.price || !editCrop.quantity) {
      showToast('❌ Both price and quantity are required.');
      return;
    }

    try {
      const res = await fetch(`http://localhost:5000/api/crops/${editCrop._id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          price: editCrop.price,
          quantity: editCrop.quantity,
        }),
      });

      if (res.ok) {
        showToast('✅ Crop updated successfully');
        fetchMyCrops();
        setShowModal(false);
      } else {
        showToast('❌ Failed to update crop');
      }
    } catch (err) {
      console.error(err);
      showToast('❌ Error updating crop');
    }
  };

  return (
    <div className="bg-light min-vh-100 px-3 py-5">
      <div className="container">
        <NavbarWithLogout />
        <h3 className="text-success mb-4 text-center">🌾 My Crops</h3>

        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-success" role="status" />
            <p className="text-muted mt-2">Loading your crops...</p>
          </div>
        ) : myCrops.length === 0 ? (
          <div className="text-center text-muted mt-5">🚫 No crops listed yet.</div>
        ) : (
          <div className="row g-4">
            {myCrops.map((crop) => (
              <div className="col-md-4" key={crop._id}>
                <div className="card p-3 shadow-sm border-0">
                  <h5 className="text-success">{crop.name}</h5>
                  <ul className="list-unstyled small text-muted">
                    <li>📍 {crop.location}</li>
                    <li>🧺 {crop.quantity} kg</li>
                    <li>💰 {crop.price} per kg</li>
                  </ul>
                  <div className="d-flex justify-content-between">
                    <button
                      className="btn btn-sm btn-outline-primary"
                      onClick={() => openEditModal(crop)}
                    >
                      ✏️ Update
                    </button>
                    <button
                      className="btn btn-sm btn-outline-danger"
                      onClick={() => handleDelete(crop._id)}
                    >
                      🗑️ Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Toast Popup */}
      {toastMessage && (
        <div
          className="toast align-items-center text-white bg-success position-fixed bottom-0 end-0 m-4 show"
          role="alert"
          style={{ zIndex: 9999, minWidth: '250px' }}
        >
          <div className="d-flex">
            <div className="toast-body">{toastMessage}</div>
          </div>
        </div>
      )}

      {/* Edit Modal */}
      {showModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">✏️ Update Crop</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <div className="mb-3">
                  <label className="form-label">New Price (per kg)</label>
                  <input
                    type="text"
                    className="form-control"
                    name="price"
                    value={editCrop.price}
                    onChange={handleModalChange}
                  />
                </div>
                <div className="mb-3">
                  <label className="form-label">New Quantity (kg)</label>
                  <input
                    type="number"
                    className="form-control"
                    name="quantity"
                    value={editCrop.quantity}
                    onChange={handleModalChange}
                  />
                </div>
              </div>
              <div className="modal-footer">
                <button className="btn btn-secondary" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button className="btn btn-primary" onClick={handleModalSave}>
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {showDeleteModal && (
        <div
          className="modal fade show d-block"
          style={{ backgroundColor: 'rgba(0,0,0,0.5)' }}
          tabIndex="-1"
        >
          <div className="modal-dialog">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title text-danger">🗑️ Confirm Delete</h5>
                <button
                  type="button"
                  className="btn-close"
                  onClick={() => setShowDeleteModal(false)}
                ></button>
              </div>
              <div className="modal-body">
                <p>Are you sure you want to delete this crop?</p>
              </div>
              <div className="modal-footer">
                <button
                  className="btn btn-secondary"
                  onClick={() => setShowDeleteModal(false)}
                >
                  Cancel
                </button>
                <button className="btn btn-danger" onClick={confirmDeleteCrop}>
                  Yes, Delete
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FarmerMyCrops;

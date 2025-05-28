import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/BuyerTransactionHistory.css';

const BuyerTransactionHistory = () => {
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filterCrop, setFilterCrop] = useState('');
  const [filterLocation, setFilterLocation] = useState('');
  const [minAmount, setMinAmount] = useState('');
  const [maxAmount, setMaxAmount] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  const navigate = useNavigate();
  const buyer = JSON.parse(localStorage.getItem('user'));

  useEffect(() => {
    const fetchMyTransactions = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/transactions/buyer/${buyer.id}`);
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error('Error fetching transactions:', err);
        alert("Failed to load transaction history. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    if (buyer?.id) {
      fetchMyTransactions();
    }
  }, [buyer?.id]);

  const filtered = transactions.filter(txn => {
    const matchesCrop = txn.cropName?.toLowerCase().includes(filterCrop.toLowerCase());
    const matchesLocation = txn.farmerId?.location?.toLowerCase().includes(filterLocation.toLowerCase());
    const total = parseFloat(txn.totalAmount);
    const matchesMin = minAmount === '' || total >= parseFloat(minAmount);
    const matchesMax = maxAmount === '' || total <= parseFloat(maxAmount);

    const txnDate = new Date(txn.createdAt);
    const matchesFrom = fromDate === '' || txnDate >= new Date(fromDate);
    const matchesTo = toDate === '' || txnDate <= new Date(toDate);

    return matchesCrop && matchesLocation && matchesMin && matchesMax && matchesFrom && matchesTo;
  });

  const handleResetFilters = () => {
    setFilterCrop('');
    setFilterLocation('');
    setMinAmount('');
    setMaxAmount('');
    setFromDate('');
    setToDate('');
  };

  return (
    <div className="buyer-history-container">
      <div className="glass-card animated fade-in container py-5">
        <h4 className="mb-4 text-success">🧾 My Purchase History</h4>

        <div className="row mb-3 g-2">
          <div className="col-md-2">
            <input
              className="form-control form-control-sm"
              placeholder="Crop"
              value={filterCrop}
              onChange={(e) => setFilterCrop(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input
              className="form-control form-control-sm"
              placeholder="Location"
              value={filterLocation}
              onChange={(e) => setFilterLocation(e.target.value)}
            />
          </div>
          <div className="col-md-1">
            <input
              type="number"
              className="form-control form-control-sm"
              placeholder="Min ₹"
              value={minAmount}
              onChange={(e) => setMinAmount(e.target.value)}
            />
          </div>
          <div className="col-md-1">
            <input
              type="number"
              className="form-control form-control-sm"
              placeholder="Max ₹"
              value={maxAmount}
              onChange={(e) => setMaxAmount(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input
              type="date"
              className="form-control form-control-sm"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <input
              type="date"
              className="form-control form-control-sm"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
            />
          </div>
          <div className="col-md-2">
            <button className="btn btn-outline-secondary btn-sm w-100" onClick={handleResetFilters}>
              Reset Filters
            </button>
          </div>
        </div>

        {loading ? (
          <div className="text-center mt-5">
            <div className="spinner-border text-success" role="status" />
          </div>
        ) : filtered.length === 0 ? (
          <p className="text-muted mt-4">No transactions found.</p>
        ) : (
          <div className="table-responsive">
            <table className="table table-bordered table-hover shadow-sm">
              <thead className="table-light">
                <tr>
                  <th>#</th>
                  <th>Crop</th>
                  <th>Farmer</th>
                  <th>Location</th>
                  <th>Qty (kg)</th>
                  <th>Price</th>
                  <th>Total</th>
                  <th>Date</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map((txn, idx) => (
                  <tr key={txn._id}>
                    <td>{idx + 1}</td>
                    <td>{txn.cropName}</td>
                    <td>
                      <button
                        className="btn btn-link p-0"
                        onClick={() => navigate(`/farmer/${txn.farmerId?._id}`)}
                      >
                        {txn.farmerId?.name || 'Unknown'}
                      </button>
                    </td>
                    <td>{txn.farmerId?.location || '-'}</td>
                    <td>{txn.quantity}</td>
                    <td>₹{txn.pricePerKg}</td>
                    <td>₹{parseFloat(txn.totalAmount).toLocaleString()}</td>
                    <td>{new Date(txn.createdAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default BuyerTransactionHistory;

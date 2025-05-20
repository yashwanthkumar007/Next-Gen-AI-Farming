import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const FarmerTransactions = () => {
  const navigate = useNavigate();
  const farmer = JSON.parse(localStorage.getItem('user'));
  const farmerId = farmer?.id;

  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [cropFilter, setCropFilter] = useState('');
  const [buyerFilter, setBuyerFilter] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');

  useEffect(() => {
    if (!farmerId) {
      navigate('/login');
      return;
    }

    const fetchTransactions = async () => {
      try {
        const res = await fetch(`http://localhost:5000/api/transactions/farmer/${farmerId}`);
        const data = await res.json();
        setTransactions(data);
      } catch (err) {
        console.error('Error fetching transactions:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchTransactions();
  }, [farmerId, navigate]);

  const formatDate = (dateStr) => {
    const date = new Date(dateStr);
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1)
      .toString()
      .padStart(2, '0')}-${date.getFullYear()}`;
  };

  const filtered = transactions.filter((tx) => {
    const matchesCrop = tx.cropName?.toLowerCase().includes(cropFilter.toLowerCase());
    const matchesBuyer = tx.buyerId?.name?.toLowerCase().includes(buyerFilter.toLowerCase());
    const txDate = new Date(tx.createdAt).toISOString().split('T')[0]; // yyyy-mm-dd
    const from = fromDate || null;
    const to = toDate || null;

    const inRange =
      (!from || txDate >= from) &&
      (!to || txDate <= to);

    return matchesCrop && matchesBuyer && inRange;
  });

  const sorted = [...filtered].sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  return (
    <div className="container py-5">
      <h4 className="mb-4 text-success">📦 My Crop Transactions</h4>

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
            placeholder="Filter by Buyer"
            value={buyerFilter}
            onChange={(e) => setBuyerFilter(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={fromDate}
            onChange={(e) => setFromDate(e.target.value)}
          />
        </div>
        <div className="col-md-3">
          <input
            type="date"
            className="form-control"
            value={toDate}
            onChange={(e) => setToDate(e.target.value)}
          />
        </div>
      </div>

      {loading ? (
        <div className="text-center mt-5">
          <div className="spinner-border text-success" />
        </div>
      ) : sorted.length === 0 ? (
        <p className="text-muted">No transactions found.</p>
      ) : (
        <div className="table-responsive" role="region" aria-label="Transactions Table">
          <table className="table table-bordered table-striped shadow-sm">
            <thead className="table-light">
              <tr>
                <th>Crop</th>
                <th>Buyer</th>
                <th>Quantity</th>
                <th>Rate (₹)</th>
                <th>Total (₹)</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map((tx, index) => (
                <tr key={index}>
                  <td>{tx.cropName}</td>
                  <td>
                    <button
                      className="btn btn-link p-0"
                      onClick={() => navigate(`/buyer/${tx.buyerId?._id}`)}
                    >
                      {tx.buyerId?.name || 'Unknown'}
                    </button>
                  </td>
                  <td>{tx.quantity} kg</td>
                  <td>₹{tx.pricePerKg}</td>
                  <td>₹{tx.totalAmount.toFixed(2)}</td>
                  <td>{formatDate(tx.createdAt)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default FarmerTransactions;

import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

const AdminTransactionList = () => {
const [transactions, setTransactions] = useState([]);
const [loading, setLoading] = useState(true);
const navigate = useNavigate();

// Filter states
const [cropFilter, setCropFilter] = useState('');
const [farmerFilter, setFarmerFilter] = useState('');
const [buyerFilter, setBuyerFilter] = useState('');
const [fromDate, setFromDate] = useState('');
const [toDate, setToDate] = useState('');

useEffect(() => {
const fetchTransactions = async () => {
try {
const res = await fetch('http://localhost:5000/api/transactions/all');
const data = await res.json();
setTransactions(data);
} catch (err) {
console.error('Error fetching transactions:', err);
} finally {
setLoading(false);
}
};
fetchTransactions();
}, []);

const filtered = transactions.filter((txn) => {
const cropMatch = txn.cropName?.toLowerCase().includes(cropFilter.toLowerCase());
const farmerMatch = txn.farmerId?.name?.toLowerCase().includes(farmerFilter.toLowerCase());
const buyerMatch = txn.buyerId?.name?.toLowerCase().includes(buyerFilter.toLowerCase());

const txDate = new Date(txn.createdAt);
const from = fromDate ? new Date(fromDate) : null;
const to = toDate ? new Date(toDate) : null;
const inRange = (!from || txDate >= from) && (!to || txDate <= to);

return cropMatch && farmerMatch && buyerMatch && inRange;
});

return (
<div className="container py-5">
<h4 className="mb-4 text-primary">💰 Transaction History (Admin View)</h4>

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
        placeholder="Filter by Farmer"
        value={farmerFilter}
        onChange={(e) => setFarmerFilter(e.target.value)}
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
    <div className="col-md-3 d-flex gap-2">
      <input
        type="date"
        className="form-control"
        value={fromDate}
        onChange={(e) => setFromDate(e.target.value)}
      />
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
      <div className="spinner-border text-primary" role="status" />
    </div>
  ) : filtered.length === 0 ? (
    <p className="text-muted">No transactions found.</p>
  ) : (
    <div className="table-responsive">
      <table className="table table-bordered table-hover shadow-sm">
        <thead className="table-light">
          <tr>
            <th>#</th>
            <th>Crop</th>
            <th>Farmer</th>
            <th>Buyer</th>
            <th>Quantity</th>
            <th>Price</th>
            <th>Total</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {filtered.map((txn, index) => (
            <tr key={txn._id}>
              <td>{index + 1}</td>
              <td>{txn.cropName}</td>
              <td>
                <button
                  className="btn btn-link p-0"
                  onClick={() => navigate(`/farmer/${txn.farmerId?._id}`)}
                >
                  {txn.farmerId?.name || 'N/A'}
                </button>
              </td>
              <td>
                <button
                  className="btn btn-link p-0"
                  onClick={() => navigate(`/buyer/${txn.buyerId?._id}`)}
                >
                  {txn.buyerId?.name || 'N/A'}
                </button>
              </td>
              <td>{txn.quantity} kg</td>
              <td>₹{txn.pricePerKg}</td>
              <td>₹{txn.totalAmount}</td>
              <td>{new Date(txn.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )}
</div>
);
};

export default AdminTransactionList;
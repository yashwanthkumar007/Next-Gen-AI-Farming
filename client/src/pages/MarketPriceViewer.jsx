import React, { useState } from 'react';
import StateDistrictSelector from '../components/StateDistrictSelector';
import axios from 'axios';

const MarketPriceViewer = () => {
  const [selectedState, setSelectedState] = useState('');
  const [selectedDistrict, setSelectedDistrict] = useState('');
  const [commodity, setCommodity] = useState('');
  const [prices, setPrices] = useState([]);
  const [market, setMarket] = useState('');
  const [fromDate, setFromDate] = useState('');
  const [toDate, setToDate] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  // Get the current date formatted as YYYY-MM-DD
  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  const handleFromDateChange = (event) => {
    const selectedFromDate = event.target.value;
    setFromDate(selectedFromDate);
    // Set the minimum "To Date" to the selected "From Date"
    setToDate((prevToDate) =>
      prevToDate && prevToDate < selectedFromDate ? selectedFromDate : prevToDate
    );
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const fetchPrices = async () => {
    // Ensure all fields are filled
    if (!selectedState || !selectedDistrict || !commodity || !fromDate || !toDate) {
      alert('Please fill all fields');
      return;
    }
    // Check that From Date is not later than To Date
    if (new Date(fromDate) > new Date(toDate)) {
      alert('From Date cannot be later than To Date');
      return;
    }

    console.log('Fetching prices with the following parameters:');
    console.log('State:', selectedState);
    console.log('District:', selectedDistrict);
    console.log('Commodity:', commodity);
    console.log('From Date:', fromDate);
    console.log('To Date:', toDate);

    setLoading(true);
    setError('');

    try {
      const res = await axios.get('http://localhost:5000/api/prices/filter', {
        params: { state: selectedState, district: selectedDistrict, commodity, fromDate, toDate },
      });
      console.log('API Response:', res.data); // Log the API response
      setPrices(res.data);
      if (res.data.length === 0) {
        alert('No data found for the given parameters.');
      }
    } catch (err) {
      console.error('Error fetching prices:', err);
      setError('Failed to fetch prices, please try again later.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="container mt-5">
      <h4 className="mb-4">🌾 Crop Market Prices</h4>

      <StateDistrictSelector
        selectedState={selectedState}
        setSelectedState={setSelectedState}
        selectedDistrict={selectedDistrict}
        setSelectedDistrict={setSelectedDistrict}
        setMarket={setMarket}
      />
      {market && <h5>Selected Market: {market}</h5>}

      <div className="my-3">
        <label>Commodity:</label>
        <input
          type="text"
          value={commodity}
          onChange={(e) => setCommodity(e.target.value)}
          className="form-control"
        />
      </div>

      <div className="my-3">
        <label>From Date:</label>
        <input
          type="date"
          value={fromDate}
          onChange={handleFromDateChange}
          max={todayString} // "From Date" limited to today
          className="form-control"
        />
      </div>

      <div className="my-3">
        <label>To Date:</label>
        <input
          type="date"
          value={toDate}
          onChange={handleToDateChange}
          min={fromDate} // "To Date" cannot be earlier than "From Date"
          max={todayString} // "To Date" limited to today
          className="form-control"
        />
      </div>

      <button onClick={fetchPrices} className="btn btn-primary" disabled={loading}>
        {loading ? 'Loading...' : '🔍 Fetch Prices'}
      </button>

      {error && <div className="alert alert-danger mt-3">{error}</div>}

      {prices.length > 0 && (
        <table className="table table-bordered mt-4">
          <thead>
            <tr>
              <th>Date</th>
              <th>Market</th>
              <th>Commodity</th>
              <th>₹/quintal</th>
              <th>Arrival (tonnes)</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((row, index) => {
              // Convert date from DD-MM-YYYY (if applicable) to YYYY-MM-DD
              let formattedDate = row.date;
              if (formattedDate && formattedDate.includes('-')) {
                const parts = formattedDate.split('-');
                // Check if the last part is a 4-digit year; if so, it means the date is in DD-MM-YYYY format.
                if (parts[2]?.length === 4) {
                  formattedDate = `${parts[2]}-${parts[1]}-${parts[0]}`;
                }
              }
              return (
                <tr key={index}>
                  <td>{formattedDate}</td>
                  <td>{row.market}</td>
                  <td>{row.commodity}</td>
                  <td>{row.price_per_quintal}</td>
                  <td>{row.arrival_tonnes}</td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MarketPriceViewer;

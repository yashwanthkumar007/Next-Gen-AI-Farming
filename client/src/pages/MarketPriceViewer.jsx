import React, { useState, useEffect } from 'react';
import StateDistrictSelector from '../components/StateDistrictSelector';

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
  const [marketData, setMarketData] = useState([]);

  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  // Fetch market prices data on component mount
  useEffect(() => {
    const fetchMarketData = async () => {
      setLoading(true);
      setError('');
      try {
        const response = await fetch('/data/marketPrices.json');
        if (!response.ok) {
          throw new Error('Failed to fetch market prices data');
        }
        const data = await response.json();
        setMarketData(data);
      } catch (err) {
        setError('Failed to load market price data.');
      } finally {
        setLoading(false);
      }
    };

    fetchMarketData();
  }, []);

  const handleFromDateChange = (event) => {
    const selectedFromDate = event.target.value;
    setFromDate(selectedFromDate);
    setToDate((prevToDate) =>
      prevToDate && prevToDate < selectedFromDate ? selectedFromDate : prevToDate
    );
  };

  const handleToDateChange = (event) => {
    setToDate(event.target.value);
  };

  const fetchPrices = () => {
    if (!selectedState || !selectedDistrict || !commodity || !fromDate || !toDate) {
      alert('Please fill all fields');
      return;
    }
    if (new Date(fromDate) > new Date(toDate)) {
      alert('From Date cannot be later than To Date');
      return;
    }

    setLoading(true);
    setError('');
    setPrices([]);

    try {
      const formatDate = (dateStr) => {
        const [year, month, day] = dateStr.split('-');
        return `${day}-${month}-${year}`;
      };

      const formattedFromDate = formatDate(fromDate);
      const formattedToDate = formatDate(toDate);

      const results = marketData.filter((item) => {
        return (
          item.state === selectedState &&
          item.district === selectedDistrict &&
          item.commodity.toLowerCase() === commodity.toLowerCase() &&
          item.date >= formattedFromDate &&
          item.date <= formattedToDate
        );
      });

      setPrices(results);
      if (results.length === 0) {
        alert('No data found for the given parameters.');
      }
    } catch (err) {
      console.error('Error processing data:', err);
      setError('Failed to load market price data.');
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
          max={todayString}
          className="form-control"
        />
      </div>

      <div className="my-3">
        <label>To Date:</label>
        <input
          type="date"
          value={toDate}
          onChange={handleToDateChange}
          min={fromDate}
          max={todayString}
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
              <th>₹/kg</th>
              <th>Arrival (tonnes)</th>
              <th>Variation ₹/quintal</th>
              <th>Variation ₹/kg</th>
              <th>Variation Arrival (tonnes)</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((row, index) => (
              <tr key={index}>
                <td>{row.date}</td>
                <td>{row.market}</td>
                <td>{row.commodity}</td>
                <td>{row.price_per_quintal}</td>
                <td>{row.price_per_kg}</td>
                <td>{row.arrival_tonnes}</td>
                <td>{row.price_per_quintal_variation}</td>
                <td>{row.price_per_kg_variation}</td>
                <td>{row.arrival_tonnes_variation}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default MarketPriceViewer;

import React, { useState } from 'react';
import StateDistrictSelector from '../components/StateDistrictSelector';
import 'bootstrap/dist/css/bootstrap.min.css';
import '../styles/MarketPriceViewer.css';

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

  const today = new Date();
  const todayString = today.toISOString().split('T')[0];

  const handleFromDateChange = (e) => {
    const val = e.target.value;
    setFromDate(val);
    if (toDate && toDate < val) setToDate(val);
  };

  const handleToDateChange = (e) => {
    setToDate(e.target.value);
  };

  const fetchPrices = async () => {
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
      const response = await fetch('/data/marketPrices.json');
      const marketData = await response.json();

      const results = marketData.filter((item) => {
        const [d, m, y] = item.date.split('-');
        const itemDate = new Date(`${y}-${m}-${d}`);
        return (
          item.state.toLowerCase() === selectedState.toLowerCase() &&
          item.district.toLowerCase() === selectedDistrict.toLowerCase() &&
          item.commodity.toLowerCase() === commodity.toLowerCase() &&
          itemDate >= new Date(fromDate) &&
          itemDate <= new Date(toDate)
        );
      });

      setPrices(results);
      if (!results.length) alert('No data found for the given parameters.');
    } catch (err) {
      console.error(err);
      setError('Failed to load market price data.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="mpv-bg">
      <div className="mpv-container">
        <h4 className="mpv-title">🌾 Crop Market Prices</h4>

        <StateDistrictSelector
          selectedState={selectedState}
          setSelectedState={setSelectedState}
          selectedDistrict={selectedDistrict}
          setSelectedDistrict={setSelectedDistrict}
          setMarket={setMarket}
        />
        {market && <h5 className="mpv-subtitle">Selected Market: {market}</h5>}

        <div className="mpv-field">
          <label className="mpv-label">Commodity</label>
          <input
            type="text"
            value={commodity}
            onChange={(e) => setCommodity(e.target.value)}
            className="mpv-input"
          />
        </div>

        <div className="mpv-field">
          <label className="mpv-label">From Date</label>
          <input
            type="date"
            value={fromDate}
            onChange={handleFromDateChange}
            max={todayString}
            className="mpv-input"
          />
        </div>

        <div className="mpv-field">
          <label className="mpv-label">To Date</label>
          <input
            type="date"
            value={toDate}
            onChange={handleToDateChange}
            min={fromDate}
            max={todayString}
            className="mpv-input"
          />
        </div>

        <button
          onClick={fetchPrices}
          className="mpv-button"
          disabled={loading}
        >
          {loading ? 'Loading...' : '🔍 Fetch Prices'}
        </button>

        {error && <div className="mpv-error">{error}</div>}

        {prices.length > 0 && (
          <div className="mpv-table-wrapper">
            <table className="mpv-table">
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
                {prices.map((row, i) => (
                  <tr key={i}>
                    <td>{row.date}</td>
                    <td>{row.market}</td>
                    <td>{row.commodity}</td>
                    <td>{row.price_per_quintal}</td>
                    <td>{row.arrival_tonnes}</td>
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

export default MarketPriceViewer;

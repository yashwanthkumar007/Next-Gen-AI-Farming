// src/components/MarketData.jsx
import React, { useState, useEffect } from 'react';
import { useMarketApi } from '../hooks/useMarketApi';

function MarketData() {
  const [marketData, setMarketData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const { fetchData } = useMarketApi();

  useEffect(() => {
    const loadMarketData = async () => {
      try {
        const data = await fetchData('wheat', 'delhi');
        setMarketData(data);
        setLoading(false);
      } catch (err) {
        setError(err.message);
        setLoading(false);
      }
    };

    loadMarketData();
  }, [fetchData]);

  if (loading) return <div>Loading market data...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="market-data-container">
      <h2>Current Market Data</h2>
      <div className="data-grid">
        <div>Commodity: {marketData.commodity}</div>
        <div>Price: ₹{marketData.price}</div>
        <div>Trend: {marketData.trend > 0 ? '↑' : '↓'} ({marketData.trend}%)</div>
      </div>
    </div>
  );
}

export default MarketData;
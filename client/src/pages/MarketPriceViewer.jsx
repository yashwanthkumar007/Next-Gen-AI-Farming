import React, { useState } from 'react'
import StateDistrictSelector from '../components/StateDistrictSelector'

const MarketPriceViewer = () => {
  const [selectedState, setSelectedState] = useState('')
  const [selectedDistrict, setSelectedDistrict] = useState('')
  const [commodity, setCommodity] = useState('')
  const [prices, setPrices] = useState([])
  const [market, setMarket] = useState('')
  const [fromDate, setFromDate] = useState('')
  const [toDate, setToDate] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState('')

  const today = new Date()
  const todayString = today.toISOString().split('T')[0]

  const handleFromDateChange = (event) => {
    const selectedFromDate = event.target.value
    setFromDate(selectedFromDate)
    setToDate((prevToDate) =>
      prevToDate && prevToDate < selectedFromDate ? selectedFromDate : prevToDate
    )
  }

  const handleToDateChange = (event) => {
    setToDate(event.target.value)
  }

  const fetchPrices = async () => {
    if (!selectedState || !selectedDistrict || !commodity || !fromDate || !toDate) {
      alert('Please fill all fields')
      return
    }
    if (new Date(fromDate) > new Date(toDate)) {
      alert('From Date cannot be later than To Date')
      return
    }

    setLoading(true)
    setError('')
    setPrices([])

    try {
      const response = await fetch('/data/marketPrices.json')
      const marketData = await response.json()

      const results = marketData.filter((item) => {
        const [d, m, y] = item.date.split('-')
        const itemDate = new Date(`${y}-${m}-${d}`)
        const from = new Date(fromDate)
        const to = new Date(toDate)

        return (
          item.state.toLowerCase() === selectedState.toLowerCase() &&
          item.district.toLowerCase() === selectedDistrict.toLowerCase() &&
          item.commodity.toLowerCase() === commodity.toLowerCase() &&
          itemDate >= from &&
          itemDate <= to
        )
      })

      setPrices(results)
      if (results.length === 0) {
        alert('No data found for the given parameters.')
      }
    } catch (err) {
      console.error('Error loading JSON:', err)
      setError('Failed to load market price data.')
    } finally {
      setLoading(false)
    }
  }

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
              <th>Arrival (tonnes)</th>
            </tr>
          </thead>
          <tbody>
            {prices.map((row, index) => (
              <tr key={index}>
                <td>{row.date}</td>
                <td>{row.market}</td>
                <td>{row.commodity}</td>
                <td>{row.price_per_quintal}</td>
                <td>{row.arrival_tonnes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  )
}

// secondmain
export default MarketPriceViewer


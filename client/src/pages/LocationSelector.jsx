import React, { useState, useEffect } from 'react';

const LocationSelector = ({ onLocationSelect }) => {
  const [locationMethod, setLocationMethod] = useState('manual');
  const [manualLocation, setManualLocation] = useState('');
  const [location, setLocation] = useState(null);
  const [error, setError] = useState('');
  const [locationFetched, setLocationFetched] = useState(false); // Added state to track if location is fetched

  const handleLocationMethodChange = (e) => {
    setLocationMethod(e.target.value);
    if (e.target.value === 'manual') {
      setLocation(null); // Reset location when switching to manual
      setLocationFetched(false); // Reset the fetched location flag
    }
  };

  const getLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          const newLocation = `${latitude}, ${longitude}`; // or use a geocoding API for a more friendly location name
          setLocation(newLocation);
          onLocationSelect(newLocation);
          setError('');
          setLocationFetched(true); // Mark location as fetched
        },
        (err) => {
          setLocation(null);
          setError('Permission denied or unable to fetch location.');
        }
      );
    } else {
      setError('Geolocation is not supported by this browser.');
    }
  };

  const handleManualLocationChange = (e) => {
    setManualLocation(e.target.value);
  };

  // Trigger location selection automatically on method change
  useEffect(() => {
    if (locationMethod === 'gps' && location === null && !locationFetched) {
      // Only trigger GPS location fetch when switching to GPS and location not fetched yet
      getLocation();
    }
  }, [locationMethod, locationFetched]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (locationMethod === 'manual' && manualLocation) {
      onLocationSelect(manualLocation);
      setLocation(manualLocation);
      setLocationFetched(true); // Mark location as manually selected
    } else if (locationMethod === 'gps' && location) {
      onLocationSelect(location);
    }
  };

  // Reset location on page refresh
  useEffect(() => {
    setLocation(null);
    setLocationFetched(false);
  }, []);

  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-3">
        <label className="form-label">Select Location Method</label>
        <div>
          <label>
            <input
              type="radio"
              name="locationMethod"
              value="manual"
              checked={locationMethod === 'manual'}
              onChange={handleLocationMethodChange}
            />{' '}
            Manual
          </label>
          <label className="ms-3">
            <input
              type="radio"
              name="locationMethod"
              value="gps"
              checked={locationMethod === 'gps'}
              onChange={handleLocationMethodChange}
            />{' '}
            GPS
          </label>
        </div>
      </div>

      {locationMethod === 'manual' && (
        <div className="mb-3">
          <label className="form-label">Enter Location</label>
          <input
            type="text"
            className="form-control"
            placeholder="Enter your location"
            value={manualLocation}
            onChange={handleManualLocationChange}
            required
          />
        </div>
      )}

      {locationMethod === 'gps' && !locationFetched && (
        <div className="mb-3">
          <button type="button" className="btn btn-primary" onClick={getLocation}>
            Get GPS Location
          </button>
        </div>
      )}

      {location && locationFetched && (
        <div className="form-text text-success mt-1">
          <strong>Selected Location:</strong> <strong>{location}</strong>
        </div>
      )}

      {error && (
        <div className="form-text text-danger mt-1">
          <strong>{error}</strong>
        </div>
      )}
    </form>
  );
};

export default LocationSelector;

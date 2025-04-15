import React, { useEffect, useState } from 'react';
import NavbarWithLogout from '../components/NavbarWithLogout';
// Sample India state + district data
const indiaLocations = {
  "Tamil Nadu": ["Chennai", "Coimbatore", "Madurai", "Erode"],
  "Karnataka": ["Bengaluru", "Mysuru", "Hubli", "Mangaluru"],
  "Maharashtra": ["Mumbai", "Pune", "Nagpur", "Nashik"],
  "Punjab": ["Ludhiana", "Amritsar", "Patiala", "Jalandhar"],
};

const LocationSelector = ({ onLocationSelect }) => {
  const [autoLocation, setAutoLocation] = useState('');
  const [useManual, setUseManual] = useState(false);
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');

  useEffect(() => {
    if (!navigator.geolocation) {
      setUseManual(true);
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setAutoLocation(`Lat: ${position.coords.latitude}, Lon: ${position.coords.longitude}`);
          onLocationSelect("Detected via GPS");
        },
        () => setUseManual(true),
        { timeout: 5000 }
      );
    }
  }, [onLocationSelect]);

  const handleManualSelect = () => {
    if (state && district) {
      const selectedLocation = `${district}, ${state}`;
      onLocationSelect(selectedLocation);
    }
  };

  return (
    <div>
      {autoLocation && !useManual && (
        <div className="alert alert-info py-2">
          📍 Location detected: <strong>{autoLocation}</strong>
          <div>
            <button
              className="btn btn-sm btn-outline-secondary mt-2"
              onClick={() => setUseManual(true)}
            >
              Select manually instead
            </button>
          </div>
        </div>
      )}

      {useManual && (
        <div className="border rounded p-3">
          <NavbarWithLogout />

          <p className="fw-bold mb-2">Select Location Manually</p>
          <div className="mb-2">
            <label>State</label>
            <select
              className="form-select"
              value={state}
              onChange={(e) => {
                setState(e.target.value);
                setDistrict('');
              }}
            >
              <option value="">Select State</option>
              {Object.keys(indiaLocations).map((s) => (
                <option key={s} value={s}>
                  {s}
                </option>
              ))}
            </select>
          </div>

          {state && (
            <div className="mb-2">
              <label>District</label>
              <select
                className="form-select"
                value={district}
                onChange={(e) => setDistrict(e.target.value)}
              >
                <option value="">Select District</option>
                {indiaLocations[state].map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </div>
          )}

          <button className="btn btn-success mt-2" onClick={handleManualSelect} disabled={!district}>
            Confirm Location
          </button>
        </div>
      )}
    </div>
  );
};

export default LocationSelector;

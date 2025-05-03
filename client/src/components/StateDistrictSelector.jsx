import React, { useState } from 'react';
import stateDistrictData from '../data/stateDistrictData.json';

const StateDistrictSelector = ({ selectedState, setSelectedState, selectedDistrict, setSelectedDistrict, setMarket }) => {
  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
    setSelectedDistrict(''); // reset district on state change
    setMarket(''); // reset market on state change
  };

  const handleDistrictChange = (event) => {
    const district = event.target.value;
    setSelectedDistrict(district);

    // Set the market name based on the district selection
    const market = stateDistrictData[selectedState].find((d) => d.district === district)?.market;
    setMarket(market); // Update the market state in parent component
  };

  return (
    <div className="row mb-3">
      <div className="col-md-6">
        <label>State:</label>
        <select value={selectedState} onChange={handleStateChange} className="form-control">
          <option value="">Select State</option>
          {Object.keys(stateDistrictData).map((state) => (
            <option key={state} value={state}>
              {state}
            </option>
          ))}
        </select>
      </div>

      <div className="col-md-6">
        <label>District:</label>
        <select
          value={selectedDistrict}
          onChange={handleDistrictChange}
          className="form-control"
          disabled={!selectedState}
        >
          <option value="">Select District</option>
          {selectedState &&
            stateDistrictData[selectedState].map((district) => (
              <option key={district.district} value={district.district}>
                {district.district}
              </option>
            ))}
        </select>
      </div>
    </div>
  );
};

export default StateDistrictSelector;

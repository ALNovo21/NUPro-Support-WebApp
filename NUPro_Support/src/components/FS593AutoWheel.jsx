import React, { useState } from 'react';

const FS593AutoWheel = () => {
  const [wheelType, setWheelType] = useState(''); // Default: no selection
  const [status, setStatus] = useState('Not Configured'); // Default status

  const handleWheelTypeChange = (event) => {
    const selectedType = event.target.value;
    setWheelType(selectedType);

    // Update status to "Ready" if a valid option is selected
    if (selectedType) {
      setStatus('Ready');
    } else {
      setStatus('Not Configured');
    }
  };

  return (
    <div>
      <h3>FS593 Auto Wheel</h3>

      {/* Dropdown for Wheel Type Selection */}
      <label htmlFor="wheel-type-select">Choose a Wheel Type:</label>
      <select id="wheel-type-select" value={wheelType} onChange={handleWheelTypeChange}>
        <option value="">Please select</option>
        <option value="Single 0">Single 0</option>
        <option value="American 00">American 00</option>
        <option value="French 00">French 00</option>
        <option value="Wynn 00">Wynn 00</option>
      </select>

      <p>Selected Wheel Type: {wheelType || 'None'}</p> {/* Show "None" if no selection */}
      <p>Status: {status}</p>
    </div>
  );
};

export default FS593AutoWheel;
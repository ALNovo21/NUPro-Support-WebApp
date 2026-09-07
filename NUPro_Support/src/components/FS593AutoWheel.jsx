import React, { useState } from 'react';
import KameraSet from './KameraSet';

const FS593AutoWheel = () => {
  const [wheelType, setWheelType] = useState(''); // Default: no selection
  const [selectedWheels, setSelectedWheels] = useState([]); // List of added wheels
  const [mount, setMount] = useState(''); // Mount type from KameraSet
  const [status, setStatus] = useState('Not Configured'); // Default status

  const handleWheelTypeChange = (event) => {
    const selectedType = event.target.value;
    setWheelType(selectedType);
    updateStatus(selectedType, mount);
  };

  const handleAddWheel = () => {
    if (wheelType) {
      setSelectedWheels([...selectedWheels, wheelType]);
    }
  };

  const handleMountChange = (newMount) => {
    setMount(newMount);
    updateStatus(wheelType, newMount);
  };

  const updateStatus = (selectedType, selectedMount) => {
    // Set status to "Ready" only if both wheel type and mount are valid
    if (selectedType && selectedMount === 'Wheel') {
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
      <button onClick={handleAddWheel}>Add</button>

      {/* Display selected wheels */}
      <ul>
        {selectedWheels.map((wheel, index) => (
          <li key={index}>{wheel}</li>
        ))}
      </ul>

      {/* KameraSet Component */}
      <KameraSet onMountChange={handleMountChange} />

      <p>Selected Wheel Type: {wheelType || 'None'}</p> {/* Show "None" if no selection */}
      <p>Selected Mount: {mount || 'None'}</p> {/* Show "None" if no mount */}
      <p>Status: {status}</p>
    </div>
  );
};

export default FS593AutoWheel;
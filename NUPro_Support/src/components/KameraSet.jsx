import React, { useState } from 'react';

const KameraSet = ({ onMountChange }) => {
  const [mount, setMount] = useState('Ceiling'); // Default mount type

  const handleMountChange = (event) => {
    const newMount = event.target.value;
    setMount(newMount);
    if (onMountChange) {
      onMountChange(newMount); // Notify parent component
    }
  };

  return (
    <div>
      <h3>Kamera Set</h3>
      <label htmlFor="mount-select">Choose a Mount:</label>
      <select id="mount-select" value={mount} onChange={handleMountChange}>
        <option value="Ceiling">Ceiling</option>
        <option value="Wheel">Wheel</option>
        <option value="Table">Table</option>
      </select>
      <p>Mount: {mount}</p>
    </div>
  );
};

export default KameraSet;
import React, { useState } from 'react';

const Terminal = () => {
  const [type, setType] = useState('FVC28A'); // Default terminal type

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  return (
    <div>
      <h3>Terminal</h3>
      <label htmlFor="terminal-select">Choose a Terminal:</label>
      <select id="terminal-select" value={type} onChange={handleTypeChange}>
        <option value="FVC28A">FVC28A</option>
        <option value="FV862B">FV862B</option>
      </select>
      <p>Type: {type}</p>
      <p>Status: Not Configured</p>
    </div>
  );
};

export default Terminal;
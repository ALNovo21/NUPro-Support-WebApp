import React from 'react';

const KameraSet = ({ mount = '', onMountChange }) => {
  const handleMountChange = (event) => {
    if (onMountChange) {
      onMountChange(event.target.value);
    }
  };

  return (
    <div>
      <select id="mount-select" value={mount} onChange={handleMountChange}>
        <option value="">Please select</option>
        <option value="Ceiling">Ceiling</option>
        <option value="Wheel">Wheel</option>
        <option value="Table">Table</option>
      </select>
    </div>
  );
};

export default KameraSet;
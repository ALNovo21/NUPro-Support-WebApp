import React from 'react';

const Terminal = ({ type }) => {
  return (
    <div>
      <h3>Terminal</h3>
      <p>Type: {type || 'Unknown'}</p>
      <p>Status: Not Configured</p>
    </div>
  );
};

export default Terminal;
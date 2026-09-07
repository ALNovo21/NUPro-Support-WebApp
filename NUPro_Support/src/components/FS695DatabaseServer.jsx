import React, { useState } from 'react';

const FS695DatabaseServer = () => {
  const [caseType, setCaseType] = useState(''); // Default: keine Auswahl

  const handleCaseChange = (event) => {
    setCaseType(event.target.value);
  };

  // Status ist 'Ready', sobald eine Option ausgewählt wurde
  const isReady = Boolean(caseType);
  const status = isReady ? 'Ready' : 'Not Configured';

  // Titel dynamisch anpassen: FXB54 wenn ohne Case, sonst FS695
  const getTitle = () => {
    if (caseType === 'without-case') {
      return 'FXB54 Database Server';
    }
    return 'FS695 Database Server';
  };

  return (
    <div className="fs695-card">
      <h3 className="fs695-title">{getTitle()}</h3>

      {/* Gehäuse-Auswahl */}
      <div className="fs695-section">
        <label htmlFor="case-select">Select Configuration:</label>
        <select id="case-select" value={caseType} onChange={handleCaseChange}>
          <option value="">Please select</option>
          <option value="with-case">With FS695 Case (FS695 Database Server)</option>
          <option value="without-case">Without Case (FXB54 Database Server)</option>
        </select>
      </div>

      {/* Info & Status */}
      <div className="fs695-section">
        <p>
          <strong>Selected Server Type:</strong>{' '}
          {caseType === 'with-case' && 'FS695 (With Case)'}
          {caseType === 'without-case' && 'FXB54 (Without Case)'}
          {!caseType && 'None'}
        </p>
        <p>
          <strong>Status:</strong>{' '}
          <span className={`status ${isReady ? 'ready' : 'not-configured'}`}>
            {status}
          </span>
        </p>
      </div>
    </div>
  );
};

export default FS695DatabaseServer;
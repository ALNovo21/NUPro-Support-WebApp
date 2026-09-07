import React, { useState } from 'react';
import placeholderImg from '../assets/terminal-c028a.jpg'; // Platzhalterbild

const FS695DatabaseServer = () => {
  const [caseType, setCaseType] = useState(''); // Default: keine Auswahl

  const handleSelectCase = (selectedCase) => {
    setCaseType(selectedCase);
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
    <div className="terminal-card">
      <div className="card-header-bar">
        <h3 className="terminal-title">{getTitle()}</h3>
        <span className={`status-badge ${isReady ? 'ready' : 'pending'}`}>
          {isReady ? '● Ready' : '○ Not Configured'}
        </span>
      </div>

      {/* Produkt-Vorschau mit Platzhalterbild */}
      <div className="server-preview-container">
        <div className="server-img-wrapper">
          <img src={placeholderImg} alt="Database Server" className="server-img" />
        </div>
        <div className="server-info">
          <h4>{getTitle()} Unit</h4>
          <p className="text-muted">
            Selected Server Type:{' '}
            <strong>
              {caseType === 'with-case' && 'FS695 (With Case)'}
              {caseType === 'without-case' && 'FXB54 (Without Case)'}
              {!caseType && 'None'}
            </strong>
          </p>
        </div>
      </div>

      {/* Visuelle Auswahl der Optionen statt Dropdown */}
      <div className="terminal-section">
        <label className="section-label">Select Configuration</label>
        <div className="terminal-image-grid">
          
          <div
            className={`terminal-select-card ${caseType === 'with-case' ? 'selected' : ''}`}
            onClick={() => handleSelectCase('with-case')}
          >
            <div className="card-top-badge">FS695</div>
            <span className="terminal-name">With FS695 Case</span>
            <p className="card-subtext">FS695 Database Server</p>
          </div>

          <div
            className={`terminal-select-card ${caseType === 'without-case' ? 'selected' : ''}`}
            onClick={() => handleSelectCase('without-case')}
          >
            <div className="card-top-badge">FXB54</div>
            <span className="terminal-name">Without Case</span>
            <p className="card-subtext">FXB54 Database Server</p>
          </div>

        </div>
      </div>

      {/* Status Anziege */}
      <div className="terminal-section">
        <p className="status-container">
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
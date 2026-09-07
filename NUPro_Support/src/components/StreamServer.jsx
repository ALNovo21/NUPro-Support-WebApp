import React from 'react';
import placeholderImg from '../assets/terminal-c028a.jpg';

const StreamServer = ({ isRequired, fs593Count = 0, fs695Count = 0 }) => {
  return (
    <div className="terminal-card">
      {/* Header Bar */}
      <div className="card-header-bar">
        <h3 className="terminal-title">Stream Server Configuration</h3>
        <span className={`status-badge ${isRequired ? 'ready' : 'pending'}`}>
          {isRequired ? '● Auto Included' : '○ Not Required'}
        </span>
      </div>

      {/* Produkt-Vorschau */}
      <div className="server-preview-container">
        <div className="server-img-wrapper">
          <img src={placeholderImg} alt="Stream Server" className="server-img" />
        </div>
        <div className="server-info">
          <h4>Stream Server Unit</h4>
          <p className="text-muted">
            Verarbeitet Video-Streams für konfigurierte Live-Komponenten im Netzwerk.
          </p>
        </div>
      </div>

      {/* Status-Information */}
      <div className="terminal-section">
        {isRequired ? (
          <div className="info-banner success">
            <div className="info-banner-header">
              <span className="check-icon">✓</span>
              <h4>1x Stream Server Automatically Included</h4>
            </div>
            <p>You have selected live components in your setup:</p>
            <ul className="info-list">
              {fs593Count > 0 && (
                <li>
                  <strong>FS593 Auto Wheel:</strong> {fs593Count}×
                </li>
              )}
              {fs695Count > 0 && (
                <li>
                  <strong>FS695 Live Game Server:</strong> {fs695Count}×
                </li>
              )}
            </ul>
            <p className="info-subtext">
              ℹ️ No configuration required. Exactly 1x Stream Server is automatically added to your total order list.
            </p>
          </div>
        ) : (
          <div className="info-banner warning">
            <h4>No Stream Server Required</h4>
            <p>
              Neither an <strong>FS593 Auto Wheel</strong> nor an <strong>FS695 Live Game Server</strong> was selected.
              A Stream Server is not required for this configuration.
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default StreamServer;
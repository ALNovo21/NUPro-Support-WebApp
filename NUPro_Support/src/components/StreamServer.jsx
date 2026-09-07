import React from 'react';

const StreamServer = ({ isRequired, fs593Count = 0, fs695Count = 0 }) => {
  return (
    <div className="stream-card" style={{ border: '1px solid #ccc', padding: '24px', borderRadius: '8px' }}>
      <h3 style={{ marginTop: 0 }}>Stream Server Configuration</h3>

      {isRequired ? (
        <div style={{ color: '#155724', backgroundColor: '#d4edda', borderColor: '#c3e6cb', padding: '20px', borderRadius: '6px', border: '1px solid' }}>
          <h4 style={{ margin: '0 0 10px 0', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span>✓</span> 1x Stream Server Automatically Included
          </h4>
          <p style={{ margin: 0 }}>
            You have selected live components in your setup:
          </p>
          <ul style={{ margin: '8px 0 12px 20px', padding: 0 }}>
            {fs593Count > 0 && <li>FS593 Auto Wheel ({fs593Count}x)</li>}
            {fs695Count > 0 && <li>FS695 Live Game Server ({fs695Count}x)</li>}
          </ul>
          <p style={{ margin: 0, fontWeight: '500', fontSize: '0.95em' }}>
            ℹ️ No configuration required. Exactly 1x Stream Server is automatically added to your total order list.
          </p>
        </div>
      ) : (
        <div style={{ color: '#856404', backgroundColor: '#fff3cd', borderColor: '#ffeeba', padding: '20px', borderRadius: '6px', border: '1px solid' }}>
          <h4 style={{ margin: '0 0 10px 0' }}>No Stream Server Required</h4>
          <p style={{ margin: 0 }}>
            Neither an <strong>FS593 Auto Wheel</strong> nor an <strong>FS695 Live Game Server</strong> was selected. 
            A Stream Server is not required for this configuration.
          </p>
        </div>
      )}
    </div>
  );
};

export default StreamServer;
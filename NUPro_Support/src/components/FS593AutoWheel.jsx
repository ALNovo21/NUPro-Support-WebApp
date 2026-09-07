import React, { useState } from 'react';
import KameraSet from './KameraSet';

const FS593AutoWheel = () => {
  const [wheelType, setWheelType] = useState(''); // Standard: leer
  const [mount, setMount] = useState(''); // Standard: leer
  const [selectedWheels, setSelectedWheels] = useState([]);

  const handleWheelTypeChange = (event) => {
    setWheelType(event.target.value);
  };

  const handleMountChange = (newMount) => {
    setMount(newMount);
  };

  const handleAddWheel = () => {
    // Nur hinzufügen, wenn BEIDE Optionen ausgewählt wurden
    if (wheelType && mount) {
      const newEntry = { wheelType, mount };
      setSelectedWheels([...selectedWheels, newEntry]);

      // Auswahlfelder nach dem Hinzufügen wieder zurücksetzen
      setWheelType('');
      setMount('');
    }
  };

  // Status ist erst "Ready", wenn sowohl Wheel Type ALS AUCH Mount ausgewählt wurden
  const isReady = Boolean(wheelType && mount);
  const status = isReady ? 'Ready' : 'Not Configured';

  return (
    <div className="fs593-card">
      <h3 className="fs593-title">FS593 Auto Wheel</h3>

      {/* Step 1: Wheel Type auswählen */}
      <div className="fs593-section">
        <label htmlFor="wheel-type-select">1. Choose a Wheel Type:</label>
        <select id="wheel-type-select" value={wheelType} onChange={handleWheelTypeChange}>
          <option value="">Please select</option>
          <option value="Single 0">Single 0</option>
          <option value="American 00">American 00</option>
          <option value="French 00">French 00</option>
          <option value="Wynn 00">Wynn 00</option>
        </select>
      </div>

      {/* Step 2: Kamera Mount auswählen */}
      <div className="fs593-section">
        <label>2. Choose Camera Mount:</label>
        <KameraSet mount={mount} onMountChange={handleMountChange} />
      </div>

      {/* Step 3: Status & Add Button */}
      <div className="fs593-section">
        <p>
          <strong>Status:</strong>{' '}
          <span className={`status ${isReady ? 'ready' : 'not-configured'}`}>
            {status}
          </span>
        </p>
        <button
          className="fs593-add-button"
          onClick={handleAddWheel}
          disabled={!isReady} // Deaktiviert, solange nicht beide ausgewählt sind
        >
          Add Wheel Configuration
        </button>
      </div>

      {/* Liste aller hinzugefügten Konfigurationen */}
      <div className="fs593-section">
        <h4>Added Wheels:</h4>
        {selectedWheels.length === 0 ? (
          <p>No wheels added yet.</p>
        ) : (
          <ul>
            {selectedWheels.map((item, index) => (
              <li key={index}>
                <strong>Wheel:</strong> {item.wheelType} | <strong>Mount:</strong> {item.mount}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FS593AutoWheel;
import React, { useState } from 'react';
import KameraSet from './KameraSet';
import { MULTI_GAMES } from './gamesConfig';

const FS593AutoWheel = () => {
  const [gameType, setGameType] = useState(''); // Multi Game Type
  const [wheelType, setWheelType] = useState(''); // Wheel Variant (0, 00, etc.)
  const [mount, setMount] = useState(''); // Kamera Mount
  const [selectedWheels, setSelectedWheels] = useState([]);

  const handleGameTypeChange = (event) => {
    setGameType(event.target.value);
  };

  const handleWheelTypeChange = (event) => {
    setWheelType(event.target.value);
  };

  const handleMountChange = (newMount) => {
    setMount(newMount);
  };

  const handleAddWheel = () => {
    // Nur hinzufügen, wenn ALLE drei Optionen gewählt wurden
    if (gameType && wheelType && mount) {
      const newEntry = { gameType, wheelType, mount };
      setSelectedWheels([...selectedWheels, newEntry]);

      // Alle Felder nach dem Hinzufügen zurücksetzen
      setGameType('');
      setWheelType('');
      setMount('');
    }
  };

  // Status ist erst "Ready", wenn Game, Wheel Variant UND Mount gewählt wurden
  const isReady = Boolean(gameType && wheelType && mount);
  const status = isReady ? 'Ready' : 'Not Configured';

  return (
    <div className="fs593-card">
      <h3 className="fs593-title">FS593 Auto Wheel</h3>

      {/* Step 1: Multi Game Type auswählen */}
      <div className="fs593-section">
        <label htmlFor="multi-game-select">1. Choose Multi Game Type:</label>
        <select id="multi-game-select" value={gameType} onChange={handleGameTypeChange}>
          <option value="">Please select</option>
          {MULTI_GAMES.map((game, index) => (
            <option key={index} value={game}>
              {game}
            </option>
          ))}
        </select>
      </div>

      {/* Step 2: Wheel Variante auswählen */}
      <div className="fs593-section">
        <label htmlFor="wheel-type-select">2. Choose Wheel Variant:</label>
        <select id="wheel-type-select" value={wheelType} onChange={handleWheelTypeChange}>
          <option value="">Please select</option>
          <option value="Single 0">Single 0</option>
          <option value="American 00">American 00</option>
          <option value="French 00">French 00</option>
          <option value="Wynn 00">Wynn 00</option>
        </select>
      </div>

      {/* Step 3: Kamera Mount auswählen */}
      <div className="fs593-section">
        <label>3. Choose Camera Mount:</label>
        <KameraSet mount={mount} onMountChange={handleMountChange} />
      </div>

      {/* Step 4: Status & Add Button */}
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
          disabled={!isReady}
        >
          Add Wheel Configuration
        </button>
      </div>

      {/* Liste der hinzugefügten Konfigurationen */}
      <div className="fs593-section">
        <h4>Added Wheels:</h4>
        {selectedWheels.length === 0 ? (
          <p>No wheels added yet.</p>
        ) : (
          <ul>
            {selectedWheels.map((item, index) => (
              <li key={index}>
                <strong>Game:</strong> {item.gameType} |{' '}
                <strong>Variant:</strong> {item.wheelType} |{' '}
                <strong>Mount:</strong> {item.mount}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FS593AutoWheel;
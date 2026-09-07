import React, { useState } from 'react';
import { FLYING_GAMES } from './gamesConfig';

const FlyingGameServer = ({ onAddGame }) => {
  const [caseType, setCaseType] = useState('');
  const [gameType, setGameType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedServers, setAddedServers] = useState([]);

  const handleCaseChange = (event) => {
    setCaseType(event.target.value);
  };

  const handleGameTypeChange = (event) => {
    setGameType(event.target.value);
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleAddServer = () => {
    if (!caseType || !gameType || quantity < 1) return;

    setAddedServers((prevList) => {
      const existingIndex = prevList.findIndex(
        (item) => item.caseType === caseType && item.gameType === gameType
      );

      if (existingIndex > -1) {
        const updatedList = [...prevList];
        updatedList[existingIndex].quantity += quantity;
        return updatedList;
      } else {
        return [...prevList, { caseType, gameType, quantity }];
      }
    });

    // An den zentralen App State übergeben
    if (onAddGame) {
      onAddGame(gameType, quantity);
    }

    // Formular zurücksetzen
    setCaseType('');
    setGameType('');
    setQuantity(1);
  };

  const isReady = Boolean(caseType && gameType && quantity >= 1);
  const status = isReady ? 'Ready' : 'Not Configured';

  return (
    <div className="nlx-card">
      <h3 className="nlx-title">Flying Game Server</h3>

      {/* 1. Gehäuse/Typ wählen */}
      <div className="nlx-section">
        <label htmlFor="case-select">1. Choose Housing / Variant:</label>
        <select id="case-select" value={caseType} onChange={handleCaseChange}>
          <option value="">Please select</option>
          <option value="FS695 Case">FS695 Case</option>
          <option value="Standalone Booksize">Standalone Booksize</option>
        </select>
      </div>

      {/* 2. Flying Game wählen */}
      <div className="nlx-section">
        <label htmlFor="flying-game-select">2. Choose Game Type:</label>
        <select id="flying-game-select" value={gameType} onChange={handleGameTypeChange}>
          <option value="">Please select</option>
          {FLYING_GAMES.map((game, index) => (
            <option key={index} value={game}>
              {game}
            </option>
          ))}
        </select>
      </div>

      {/* 3. Quantity */}
      <div className="nlx-section">
        <label htmlFor="nlx-quantity">Quantity:</label>
        <input
          id="nlx-quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </div>

      {/* 4. Status & Add Button */}
      <div className="nlx-section">
        <p>
          <strong>Status:</strong>{' '}
          <span className={`status ${isReady ? 'ready' : 'not-configured'}`}>
            {status}
          </span>
        </p>
        <button
          className="nlx-add-button"
          onClick={handleAddServer}
          disabled={!isReady}
        >
          Add Flying Game Server
        </button>
      </div>

      {/* Hinzugefügte Server */}
      <div className="nlx-section">
        <h4>Added Flying Game Servers:</h4>
        {addedServers.length === 0 ? (
          <p>No Game Servers added yet.</p>
        ) : (
          <ul>
            {addedServers.map((item, index) => (
              <li key={index}>
                <strong>Variant:</strong> {item.caseType} |{' '}
                <strong>Game:</strong> {item.gameType} |{' '}
                <strong>Quantity:</strong> {item.quantity}x
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default FlyingGameServer;
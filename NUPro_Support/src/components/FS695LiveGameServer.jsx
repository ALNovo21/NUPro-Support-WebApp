import React, { useState } from 'react';
import { TOUCHBET_GAMES } from './gamesConfig'; // TOUCHBET_GAMES importieren

const FS695LiveGameServer = () => {
  const [displaySize, setDisplaySize] = useState('');
  const [gameType, setGameType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedServers, setAddedServers] = useState([]);

  const handleDisplayChange = (event) => {
    setDisplaySize(event.target.value);
  };

  const handleGameTypeChange = (event) => {
    setGameType(event.target.value);
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleAddServer = () => {
    if (!displaySize || !gameType || quantity < 1) return;

    setAddedServers((prevList) => {
      const existingIndex = prevList.findIndex(
        (item) => item.displaySize === displaySize && item.gameType === gameType
      );

      if (existingIndex > -1) {
        const updatedList = [...prevList];
        updatedList[existingIndex].quantity += quantity;
        return updatedList;
      } else {
        return [...prevList, { displaySize, gameType, quantity }];
      }
    });

    // Formular zurücksetzen
    setDisplaySize('');
    setGameType('');
    setQuantity(1);
  };

  const isReady = Boolean(displaySize && gameType && quantity >= 1);
  const status = isReady ? 'Ready' : 'Not Configured';

  return (
    <div className="lgs-card">
      <h3 className="lgs-title">FS695 Live Game Server</h3>

      {/* 1. Display-Größe auswählen */}
      <div className="lgs-section">
        <label htmlFor="display-select">1. Choose Display Size:</label>
        <select id="display-select" value={displaySize} onChange={handleDisplayChange}>
          <option value="">Please select</option>
          <option value='10.1"'>10.1 Inch</option>
          <option value='15.6"'>15.6 Inch</option>
        </select>
      </div>

      {/* 2. Spielart auswählen (Verwendet nun TOUCHBET_GAMES) */}
      <div className="lgs-section">
        <label htmlFor="gametype-select">2. Choose Game Type:</label>
        <select id="gametype-select" value={gameType} onChange={handleGameTypeChange}>
          <option value="">Please select</option>
          {TOUCHBET_GAMES.map((game, index) => (
            <option key={index} value={game}>
              {game}
            </option>
          ))}
        </select>
      </div>

      {/* 3. Anzahl wählen */}
      <div className="lgs-section">
        <label htmlFor="lgs-quantity">Quantity:</label>
        <input
          id="lgs-quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </div>

      {/* 4. Status & Add Button */}
      <div className="lgs-section">
        <p>
          <strong>Status:</strong>{' '}
          <span className={`status ${isReady ? 'ready' : 'not-configured'}`}>
            {status}
          </span>
        </p>
        <button
          className="lgs-add-button"
          onClick={handleAddServer}
          disabled={!isReady}
        >
          Add Live Game Server
        </button>
      </div>

      {/* Liste der hinzugefügten Server */}
      <div className="lgs-section">
        <h4>Added Live Game Servers:</h4>
        {addedServers.length === 0 ? (
          <p>No Live Game Servers added yet.</p>
        ) : (
          <ul>
            {addedServers.map((item, index) => (
              <li key={index}>
                <strong>Display:</strong> {item.displaySize} |{' '}
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

export default FS695LiveGameServer;
import React, { useState } from 'react';
import { ALL_REMOTE_GAMES } from './gamesConfig';

const RemoteGameServerBooksize = () => {
  const [gameType, setGameType] = useState(''); // Default: 'Please select'
  const [quantity, setQuantity] = useState(1);
  const [addedServers, setAddedServers] = useState([]); // Liste aller hinzugefügten Server

  const handleGameTypeChange = (event) => {
    setGameType(event.target.value);
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleAddServer = () => {
    if (!gameType || quantity < 1) return;

    setAddedServers((prevList) => {
      // Prüfen, ob das Spiel bereits hinzugefügt wurde
      const existingIndex = prevList.findIndex(
        (item) => item.gameType === gameType
      );

      if (existingIndex > -1) {
        // Falls bereits in der Liste: Anzahl erhöhen
        const updatedList = [...prevList];
        updatedList[existingIndex].quantity += quantity;
        return updatedList;
      } else {
        // Falls neu: Neuen Eintrag hinzufügen
        return [...prevList, { gameType, quantity }];
      }
    });

    // Auswahelfelder nach dem Hinzufügen zurücksetzen
    setGameType('');
    setQuantity(1);
  };

  // Status ist "Ready", sobald ein Spiel ausgewählt wurde und die Menge >= 1 ist
  const isReady = Boolean(gameType && quantity >= 1);
  const status = isReady ? 'Ready' : 'Not Configured';

  return (
    <div className="remote-card">
      <h3 className="remote-title">Remote Game Server Booksize</h3>

      {/* 1. Spiel wählen (Aus Touchbet, Flying oder Multi) */}
      <div className="remote-section">
        <label htmlFor="remote-game-select">1. Choose Game Type:</label>
        <select
          id="remote-game-select"
          value={gameType}
          onChange={handleGameTypeChange}
        >
          <option value="">Please select</option>
          {ALL_REMOTE_GAMES.map((game, index) => (
            <option key={index} value={game}>
              {game}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Anzahl angeben */}
      <div className="remote-section">
        <label htmlFor="remote-quantity">2. Quantity:</label>
        <input
          id="remote-quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </div>

      {/* 3. Status & Add Button */}
      <div className="remote-section">
        <p>
          <strong>Status:</strong>{' '}
          <span className={`status ${isReady ? 'ready' : 'not-configured'}`}>
            {status}
          </span>
        </p>
        <button
          className="remote-add-button"
          onClick={handleAddServer}
          disabled={!isReady}
        >
          Add Remote Game Server
        </button>
      </div>

      {/* 4. Liste aller hinzugefügten Server */}
      <div className="remote-section">
        <h4>Added Remote Game Servers:</h4>
        {addedServers.length === 0 ? (
          <p>No Remote Game Servers added yet.</p>
        ) : (
          <ul>
            {addedServers.map((item, index) => (
              <li key={index}>
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

export default RemoteGameServerBooksize;
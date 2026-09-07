import React, { useState } from 'react';
import KameraSet from './KameraSet';
import { TOUCHBET_GAMES } from './gamesConfig';

const FS695LiveGameServer = ({ onAddGame }) => {
  const [displaySize, setDisplaySize] = useState('');
  const [gameType, setGameType] = useState('');
  const [mount, setMount] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedServers, setAddedServers] = useState([]);

  const handleDisplayChange = (event) => {
    setDisplaySize(event.target.value);
  };

  const handleGameTypeChange = (event) => {
    setGameType(event.target.value);
  };

  const handleMountChange = (newMount) => {
    setMount(newMount);
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleAddServer = () => {
    if (!displaySize || !gameType || !mount || quantity < 1) return;

    setAddedServers((prevList) => [
      ...prevList,
      { displaySize, gameType, mount, quantity },
    ]);

    // Send game selection to central App state
    if (onAddGame) {
      onAddGame(gameType, quantity);
    }

    // Reset selection fields
    setDisplaySize('');
    setGameType('');
    setMount('');
    setQuantity(1);
  };

  // Requires Display, Game AND Camera Mount to be ready
  const isReady = Boolean(displaySize && gameType && mount && quantity >= 1);
  const status = isReady ? 'Ready' : 'Not Configured';

  return (
    <div className="lgs-card">
      <h3 className="lgs-title">FS695 Live Game Server</h3>

      {/* 1. Choose Display Size */}
      <div className="lgs-section">
        <label htmlFor="display-select">1. Choose Display Size:</label>
        <select id="display-select" value={displaySize} onChange={handleDisplayChange}>
          <option value="">Please select</option>
          <option value='10.1"'>10.1 Inch</option>
          <option value='15.6"'>15.6 Inch</option>
        </select>
      </div>

      {/* 2. Choose Game Type */}
      <div className="lgs-section">
        <label htmlFor="lgs-game-select">2. Choose Game Type:</label>
        <select
          id="lgs-game-select"
          value={gameType}
          onChange={handleGameTypeChange}
        >
          <option value="">Please select</option>
          {TOUCHBET_GAMES.map((game, index) => (
            <option key={index} value={game}>
              {game}
            </option>
          ))}
        </select>
      </div>

      {/* 3. Choose Camera Mount */}
      <div className="lgs-section">
        <label>3. Choose Camera Mount:</label>
        <KameraSet mount={mount} onMountChange={handleMountChange} />
      </div>

      {/* 4. Quantity */}
      <div className="lgs-section">
        <label htmlFor="lgs-quantity">4. Quantity:</label>
        <input
          id="lgs-quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </div>

      {/* 5. Status & Add Button */}
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

      {/* Added Servers List */}
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
                <strong>Mount:</strong> {item.mount} |{' '}
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
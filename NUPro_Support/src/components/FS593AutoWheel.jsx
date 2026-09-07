import React, { useState } from 'react';
import KameraSet from './KameraSet';
import { MULTI_GAMES } from './gamesConfig';

const FS593AutoWheel = ({ onAddGame }) => {
  const [gameType, setGameType] = useState('');
  const [wheelType, setWheelType] = useState('');
  const [mount, setMount] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedWheels, setAddedWheels] = useState([]);

  const handleGameTypeChange = (event) => {
    setGameType(event.target.value);
  };

  const handleWheelTypeChange = (event) => {
    setWheelType(event.target.value);
  };

  const handleMountChange = (newMount) => {
    setMount(newMount);
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleAddWheel = () => {
    if (!gameType || !wheelType || !mount || quantity < 1) return;

    setAddedWheels((prevList) => [
      ...prevList,
      { gameType, wheelType, mount, quantity },
    ]);

    // Send game selection to central App state
    if (onAddGame) {
      onAddGame(gameType, quantity);
    }

    // Reset selection fields
    setGameType('');
    setWheelType('');
    setMount('');
    setQuantity(1);
  };

  // Requires Game, Variant AND Camera Mount to be ready
  const isReady = Boolean(gameType && wheelType && mount && quantity >= 1);
  const status = isReady ? 'Ready' : 'Not Configured';

  return (
    <div className="wheel-card">
      <h3 className="wheel-title">FS593 Auto Wheel</h3>

      {/* 1. Choose Multi Game Type */}
      <div className="wheel-section">
        <label htmlFor="wheel-game-select">1. Choose Multi Game Type:</label>
        <select
          id="wheel-game-select"
          value={gameType}
          onChange={handleGameTypeChange}
        >
          <option value="">Please select</option>
          {MULTI_GAMES.map((game, index) => (
            <option key={index} value={game}>
              {game}
            </option>
          ))}
        </select>
      </div>

      {/* 2. Choose Wheel Variant */}
      <div className="wheel-section">
        <label htmlFor="wheel-type-select">2. Choose Wheel Variant:</label>
        <select
          id="wheel-type-select"
          value={wheelType}
          onChange={handleWheelTypeChange}
        >
          <option value="">Please select</option>
          <option value="Single 0">Single 0</option>
          <option value="American 00">American 00</option>
          <option value="French 00">French 00</option>
          <option value="Wynn 00">Wynn 00</option>
        </select>
      </div>

      {/* 3. Choose Camera Mount */}
      <div className="wheel-section">
        <label>3. Choose Camera Mount:</label>
        <KameraSet mount={mount} onMountChange={handleMountChange} />
      </div>

      {/* 4. Quantity */}
      <div className="wheel-section">
        <label htmlFor="wheel-quantity">4. Quantity:</label>
        <input
          id="wheel-quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </div>

      {/* 5. Status & Add Button */}
      <div className="wheel-section">
        <p>
          <strong>Status:</strong>{' '}
          <span className={`status ${isReady ? 'ready' : 'not-configured'}`}>
            {status}
          </span>
        </p>
        <button
          className="wheel-add-button"
          onClick={handleAddWheel}
          disabled={!isReady}
        >
          Add FS593 Auto Wheel
        </button>
      </div>

      {/* Added Wheels List */}
      <div className="wheel-section">
        <h4>Added FS593 Auto Wheels:</h4>
        {addedWheels.length === 0 ? (
          <p>No FS593 Auto Wheels added yet.</p>
        ) : (
          <ul>
            {addedWheels.map((item, index) => (
              <li key={index}>
                <strong>Game:</strong> {item.gameType} |{' '}
                <strong>Variant:</strong> {item.wheelType} |{' '}
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

export default FS593AutoWheel;
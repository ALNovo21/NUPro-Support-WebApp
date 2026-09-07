import React, { useState } from 'react';
import KameraSet from './KameraSet';
import { MULTI_GAMES } from './gamesConfig';
import placeholderImg from '../assets/terminal-c028a.jpg';

const WHEEL_VARIANTS = [
  { id: 'Single 0', label: 'Single 0', image: placeholderImg },
  { id: 'American 00', label: 'American 00', image: placeholderImg },
  { id: 'French 00', label: 'French 00', image: placeholderImg },
  { id: 'Wynn 00', label: 'Wynn 00', image: placeholderImg },
];

const FS593AutoWheel = ({ onAddGame }) => {
  const [gameType, setGameType] = useState('');
  const [wheelType, setWheelType] = useState('');
  const [mount, setMount] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedWheels, setAddedWheels] = useState([]);

  const handleSelectGameType = (selected) => {
    setGameType(selected);
  };

  const handleSelectWheelType = (selected) => {
    setWheelType(selected);
  };

  const handleMountChange = (newMount) => {
    setMount(newMount);
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleAddWheel = () => {
    if (!gameType || !wheelType || !mount || quantity < 1) return;

    setAddedWheels((prevList) => [
      ...prevList,
      { gameType, wheelType, mount, quantity },
    ]);

    if (onAddGame) {
      onAddGame(gameType, quantity);
    }

    setGameType('');
    setWheelType('');
    setMount('');
    setQuantity(1);
  };

  const isReady = Boolean(gameType && wheelType && mount && quantity >= 1);
  const status = isReady ? 'Ready' : 'Not Configured';

  return (
    <div className="terminal-card">
      {/* Header Bar */}
      <div className="card-header-bar">
        <h3 className="terminal-title">FS593 Auto Wheel</h3>
        <span className={`status-badge ${isReady ? 'ready' : 'pending'}`}>
          {isReady ? '● Ready' : '○ Not Configured'}
        </span>
      </div>

      {/* Produkt-Vorschau */}
      <div className="server-preview-container">
        <div className="server-img-wrapper">
          <img src={placeholderImg} alt="FS593 Auto Wheel" className="server-img" />
        </div>
        <div className="server-info">
          <h4>FS593 Auto Wheel Unit</h4>
          <p className="text-muted">
            Automatisches Roulette-Laufrad-System zur Einbindung in Multiplayer-Installationen.
          </p>
        </div>
      </div>

      {/* 1. Choose Multi Game Type */}
      <div className="terminal-section">
        <label className="section-label">1. Choose Multi Game Type</label>
        <div className="terminal-image-grid">
          {MULTI_GAMES.map((game, index) => {
            const isSelected = gameType === game;
            return (
              <div
                key={index}
                className={`terminal-select-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectGameType(game)}
              >
                <div className="card-top-badge">Game Type</div>
                <span className="terminal-name">{game}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Choose Wheel Variant (mit Bildern) */}
      <div className="terminal-section">
        <label className="section-label">2. Choose Wheel Variant</label>
        <div className="terminal-image-grid">
          {WHEEL_VARIANTS.map((variant) => {
            const isSelected = wheelType === variant.id;
            return (
              <div
                key={variant.id}
                className={`terminal-select-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectWheelType(variant.id)}
              >
                <div className="img-wrapper">
                  <img src={variant.image} alt={variant.label} className="terminal-img" />
                </div>
                <span className="terminal-name">{variant.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Choose Camera Mount */}
      <div className="terminal-section">
        <label className="section-label">3. Choose Camera Mount</label>
        <KameraSet mount={mount} onMountChange={handleMountChange} />
      </div>

      {/* 4. Quantity & Action */}
      <div className="terminal-section">
        <label htmlFor="wheel-quantity" className="section-label">
          4. Quantity & Action
        </label>
        <div className="action-row">
          <div className="quantity-group">
            <button
              type="button"
              className="qty-btn"
              onClick={() => handleQuantityChange(-1)}
              disabled={quantity <= 1}
            >
              −
            </button>
            <input
              id="wheel-quantity"
              type="number"
              className="qty-input"
              min="1"
              value={quantity}
              onChange={handleInputChange}
            />
            <button
              type="button"
              className="qty-btn"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </button>
          </div>

          <button
            className="terminal-add-button"
            onClick={handleAddWheel}
            disabled={!isReady}
          >
            + Add FS593 Auto Wheel
          </button>
        </div>
      </div>

      {/* 5. Added Wheels List */}
      <div className="terminal-section added-list-section">
        <label className="section-label">Added FS593 Auto Wheels Summary</label>
        {addedWheels.length === 0 ? (
          <div className="empty-state">No FS593 Auto Wheels added yet.</div>
        ) : (
          <div className="added-terminals-grid">
            {addedWheels.map((item, index) => (
              <div key={index} className="added-terminal-chip">
                <span className="chip-type">
                  {item.gameType} ({item.wheelType})
                </span>
                <span className="chip-subtext">Mount: {item.mount}</span>
                <span className="chip-qty">{item.quantity}×</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FS593AutoWheel;
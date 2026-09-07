import React, { useState } from 'react';
import KameraSet from './KameraSet';
import { TOUCHBET_GAMES } from './gamesConfig';
import placeholderImg from '../assets/terminal-c028a.jpg';

const DISPLAY_SIZES = [
  { id: '10.1"', label: '10.1 Inch Display'},
  { id: '15.6"', label: '15.6 Inch Display'},
];

const FS695LiveGameServer = ({ onAddGame }) => {
  const [displaySize, setDisplaySize] = useState('');
  const [gameType, setGameType] = useState('');
  const [mount, setMount] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedServers, setAddedServers] = useState([]);

  const handleSelectDisplay = (size) => {
    setDisplaySize(size);
  };

  const handleSelectGameType = (game) => {
    setGameType(game);
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

  const handleAddServer = () => {
    if (!displaySize || !gameType || !mount || quantity < 1) return;

    setAddedServers((prevList) => [
      ...prevList,
      { displaySize, gameType, mount, quantity },
    ]);

    if (onAddGame) {
      onAddGame(gameType, quantity);
    }

    setDisplaySize('');
    setGameType('');
    setMount('');
    setQuantity(1);
  };

  const isReady = Boolean(displaySize && gameType && mount && quantity >= 1);
  const status = isReady ? 'Ready' : 'Not Configured';

  return (
    <div className="terminal-card">
      {/* Header Bar */}
      <div className="card-header-bar">
        <h3 className="terminal-title">FS695 Live Game Server</h3>
        <span className={`status-badge ${isReady ? 'ready' : 'pending'}`}>
          {isReady ? '● Ready' : '○ Not Configured'}
        </span>
      </div>

      {/* Produkt-Vorschau mit Platzhalterbild */}
      <div className="server-preview-container">
        <div className="server-img-wrapper">
          <img src={placeholderImg} alt="FS695 Live Game Server" className="server-img" />
        </div>
        <div className="server-info">
          <h4>FS695 Live Game Server Unit</h4>
          <p className="text-muted">
            Verwaltung von Live-Tischspielen mit TouchBet-Anbindung im Netzwerk.
          </p>
        </div>
      </div>

      {/* 1. Choose Display Size (Card Selection mit Bild) */}
      <div className="terminal-section">
        <label className="section-label">1. Choose Display Size</label>
        <div className="terminal-image-grid">
          {DISPLAY_SIZES.map((display) => {
            const isSelected = displaySize === display.id;
            return (
              <div
                key={display.id}
                className={`terminal-select-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectDisplay(display.id)}
              >
                <div className="img-wrapper">
                  <img src={display.image} alt={display.label} className="terminal-img" />
                </div>
                <span className="terminal-name">{display.label}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Choose Game Type (Card Selection) */}
      <div className="terminal-section">
        <label className="section-label">2. Choose Game Type</label>
        <div className="terminal-image-grid">
          {TOUCHBET_GAMES.map((game, index) => {
            const isSelected = gameType === game;
            return (
              <div
                key={index}
                className={`terminal-select-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectGameType(game)}
              >
                <div className="card-top-badge">TouchBet Game</div>
                <span className="terminal-name">{game}</span>
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

      {/* 4. Quantity & Action Row */}
      <div className="terminal-section">
        <label htmlFor="lgs-quantity" className="section-label">
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
              id="lgs-quantity"
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
            onClick={handleAddServer}
            disabled={!isReady}
          >
            + Add Live Game Server
          </button>
        </div>
      </div>

      {/* 5. Added Servers List */}
      <div className="terminal-section added-list-section">
        <label className="section-label">Added Live Game Servers Summary</label>
        {addedServers.length === 0 ? (
          <div className="empty-state">No Live Game Servers added yet.</div>
        ) : (
          <div className="added-terminals-grid">
            {addedServers.map((item, index) => (
              <div key={index} className="added-terminal-chip">
                <span className="chip-type">
                  {item.gameType} ({item.displaySize})
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

export default FS695LiveGameServer
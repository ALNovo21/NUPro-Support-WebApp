import React, { useState } from 'react';
import { ALL_REMOTE_GAMES } from './gamesConfig';
import placeholderImg from '../assets/terminal-c028a.jpg';

const RemoteGameServerBooksize = ({ onAddGame }) => {
  const [gameType, setGameType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedServers, setAddedServers] = useState([]);

  const handleSelectGameType = (game) => {
    setGameType(game);
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleInputChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleAddServer = () => {
    if (!gameType || quantity < 1) return;

    setAddedServers((prevList) => {
      const existingIndex = prevList.findIndex((item) => item.gameType === gameType);

      if (existingIndex > -1) {
        const updatedList = [...prevList];
        updatedList[existingIndex].quantity += quantity;
        return updatedList;
      } else {
        return [...prevList, { gameType, quantity }];
      }
    });

    if (onAddGame) {
      onAddGame(gameType, quantity);
    }

    setGameType('');
    setQuantity(1);
  };

  const isReady = Boolean(gameType && quantity >= 1);

  return (
    <div className="terminal-card">
      {/* Header Bar */}
      <div className="card-header-bar">
        <h3 className="terminal-title">Remote Game Server Booksize</h3>
        <span className={`status-badge ${isReady ? 'ready' : 'pending'}`}>
          {isReady ? '● Ready' : '○ Not Configured'}
        </span>
      </div>

      {/* Produkt-Vorschau */}
      <div className="server-preview-container">
        <div className="server-img-wrapper">
          <img src={placeholderImg} alt="Remote Game Server" className="server-img" />
        </div>
        <div className="server-info">
          <h4>Remote Game Server Unit</h4>
          <p className="text-muted">
            Kompakte Booksize-Servereinheit für den Betrieb externer Spiele und Remote-Funktionen.
          </p>
        </div>
      </div>

      {/* 1. Choose Remote Game Type (Karten-Auswahl) */}
      <div className="terminal-section">
        <label className="section-label">1. Choose Remote Game Type</label>
        <div className="terminal-image-grid">
          {ALL_REMOTE_GAMES.map((game, index) => {
            const isSelected = gameType === game;
            return (
              <div
                key={index}
                className={`terminal-select-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectGameType(game)}
              >
                <div className="card-top-badge">Remote Game</div>
                <span className="terminal-name">{game}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Quantity & Action Row */}
      <div className="terminal-section">
        <label htmlFor="remote-quantity" className="section-label">
          2. Quantity & Action
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
              id="remote-quantity"
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
            + Add Remote Game Server
          </button>
        </div>
      </div>

      {/* 3. Added Remote Servers Summary */}
      <div className="terminal-section added-list-section">
        <label className="section-label">Added Remote Game Servers Summary</label>
        {addedServers.length === 0 ? (
          <div className="empty-state">No Remote Game Servers added yet.</div>
        ) : (
          <div className="added-terminals-grid">
            {addedServers.map((item, index) => (
              <div key={index} className="added-terminal-chip">
                <span className="chip-type">{item.gameType}</span>
                <span className="chip-qty">{item.quantity}×</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default RemoteGameServerBooksize;
import React, { useState } from 'react';
import { ALL_REMOTE_GAMES } from './gamesConfig';
import placeholderImg from '../assets/terminal-c028a.jpg';

// Hauptbild-Import für den Server (FS695FGS)
import fs695ServerImg from '../assets/Server/bs_707.png';

// Spiele-Bilder Import (für Touchbet)
import touchBacImg from '../assets/Games/touch_bac.png';
import touchBjlImg from '../assets/Games/touch_bj.png';
import touchRouImg from '../assets/Games/touch_rou.png';
import touchSicImg from '../assets/Games/touch_sic.png';
import touchLlrImg from '../assets/Games/llr.png';
import touch88Img from '../assets/Games/88.png';

// Spiele-Bilder Import ( Flying )
import flyBacImg from '../assets/Games/fly_bac.png';
import flyBjlImg from '../assets/Games/fly_bj.png';
import flyRouImg from '../assets/Games/fly_rou.png';
import flySicImg from '../assets/Games/fly_sic.png';


// Spiele-Bilder Import ( Multi )
import multiRouImg from '../assets/Games/multi_rou.png';

const GAME_IMAGES = {
  // Touchbet Games
  'Touchbet Live Roulette': touchRouImg,
  'Touchbet Live 88 Roulette': touch88Img,
  'Touchbet Live Lucky Lady\'s Roulette': touchLlrImg,
  'Touchbet Live Blackjack': touchBjlImg,
  'Touchbet Live Baccarat': touchBacImg,
  'Touchbet Live SICBO': touchSicImg,

  // Flying / Virtual Games
  'Flying (Virtual) Roulette': flyRouImg,
  'Flying (Virtual) 88 Roulette': touch88Img,
  'Flying (Virtual) Lucky Lady\'s Roulette': touchLlrImg,
  'Flying (Virtual) Blackjack': flyBjlImg,
  'Flying (Virtual) Baccarat': flyBacImg,
  'Flying (Virtual) SICBO': flySicImg,

  // Multi Games
  'Multi Roulette': multiRouImg,
  'Multi 88 Roulette': touch88Img,
  'Multi Lucky Lady\'s Roulette': touchLlrImg,
};

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

      {/* Produkt-Vorschau mit FS695FGS Bild (max height 300) */}
      <div className="server-preview-container">
        <div className="server-img-wrapper large-preview-wrapper" style={{ maxHeight: '300px', height: 'auto' }}>
          <img 
            src={fs695ServerImg} 
            alt="Remote Game Server" 
            className="server-img large-server-img" 
            style={{ maxHeight: '300px', objectFit: 'contain', width: '100%' }}
          />
        </div>
        <div className="server-info">
          <h4>Remote Game Server Unit</h4>
          <p className="text-muted">
            Kompakte Booksize-Servereinheit für den Betrieb externer Spiele und Remote-Funktionen.
          </p>
        </div>
      </div>

      {/* 1. Choose Remote Game Type (Karten-Auswahl mit Logos) */}
      <div className="terminal-section">
        <label className="section-label">1. Choose Remote Game Type</label>
        <div className="terminal-image-grid">
          {ALL_REMOTE_GAMES.map((game, index) => {
            const isSelected = gameType === game;
            const imgSrc = GAME_IMAGES[game] || placeholderImg;
            return (
              <div
                key={index}
                className={`terminal-select-card ${isSelected ? 'selected' : ''}`}
                onClick={() => handleSelectGameType(game)}
              >
                <div className="img-wrapper">
                  <img src={imgSrc} alt={game} className="terminal-img" />
                </div>
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
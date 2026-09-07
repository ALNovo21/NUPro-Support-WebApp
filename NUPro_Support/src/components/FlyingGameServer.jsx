import React, { useState } from 'react';
import { FLYING_GAMES } from './gamesConfig';
import defaultPlaceholder from '../assets/terminal-c028a.jpg';

// Reale Gehäuse-Bilder
import fs695CaseImg from '../assets/Server/FS695FGS.png';
import bs707CaseImg from '../assets/Server/FS695FGS.png';

// Reale Flying Game Bilder (Pfad: NUPro_Support/src/assets/Games/)
import flyBacImg from '../assets/Games/fly_bac.png';
import flyBjlImg from '../assets/Games/fly_bj.png';
import flyRouImg from '../assets/Games/fly_rou.png';
import flySicImg from '../assets/Games/fly_sic.png';
import flyllrImg from '../assets/Games/llr.png';
import fly88Img from '../assets/Games/88.png';

const CASE_IMAGES = {
  'FS695 Case': fs695CaseImg,
  'Standalone Booksize': bs707CaseImg,
};

const GAME_IMAGES = {
  'Flying (Virtual) Baccarat': flyBacImg,
  'Flying (Virtual) Blackjack': flyBjlImg,
  'Flying (Virtual) Roulette': flyRouImg,
  'Flying (Virtual) SICBO': flySicImg,
  'Flying (Virtual) Lucky Lady\'s Roulette': flyllrImg,
  'Flying (Virtual) 88 Roulette': fly88Img,
};

const FlyingGameServer = ({ onAddGame }) => {
  const [caseType, setCaseType] = useState('');
  const [gameType, setGameType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedServers, setAddedServers] = useState([]);

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleInputChange = (event) => {
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

    if (onAddGame) {
      onAddGame(gameType, quantity);
    }

    setCaseType('');
    setGameType('');
    setQuantity(1);
  };

  const isReady = Boolean(caseType && gameType && quantity >= 1);
  const currentPreviewImg = caseType ? CASE_IMAGES[caseType] : fs695CaseImg;

  return (
    <div className="terminal-card">
      {/* Header Bar */}
      <div className="card-header-bar">
        <h3 className="terminal-title">Flying Game Server</h3>
        <span className={`status-badge ${isReady ? 'ready' : 'pending'}`}>
          {isReady ? '● Ready' : '○ Not Configured'}
        </span>
      </div>

      {/* Main Preview Container */}
      <div className="server-preview-container">
        <div className="server-img-wrapper large-preview-wrapper" style={{ maxHeight: '300px', height: 'auto' }}>
          <img 
            src={currentPreviewImg} 
            alt="Flying Game Server Preview" 
            className="server-img large-server-img" 
            style={{ maxHeight: '300px', objectFit: 'contain', width: '100%' }}
          />
        </div>
        <div className="server-info">
          <h4>Flying Game Server Unit</h4>
          <p className="text-muted">
            Gehäuse und Flying Game Variante auswählen sowie Anzahl festlegen.
          </p>
        </div>
      </div>

      {/* 1. Choose Housing / Variant */}
      <div className="terminal-section">
        <label className="section-label">1. Choose Housing / Variant</label>
        <div className="terminal-image-grid">
          {Object.keys(CASE_IMAGES).map((cType) => {
            const isSelected = caseType === cType;
            const imgSrc = CASE_IMAGES[cType];
            return (
              <div
                key={cType}
                className={`terminal-select-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setCaseType(cType)}
              >
                <div className="img-wrapper">
                  <img src={imgSrc} alt={cType} className="terminal-img" />
                </div>
                <span className="terminal-name">{cType}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 2. Choose Flying Game Type */}
      <div className="terminal-section">
        <label className="section-label">2. Choose Game Type</label>
        <div className="terminal-image-grid">
          {FLYING_GAMES.map((gType) => {
            const isSelected = gameType === gType;
            const imgSrc = GAME_IMAGES[gType] || defaultPlaceholder;
            return (
              <div
                key={gType}
                className={`terminal-select-card ${isSelected ? 'selected' : ''}`}
                onClick={() => setGameType(gType)}
              >
                <div className="img-wrapper">
                  <img src={imgSrc} alt={gType} className="terminal-img" />
                </div>
                <span className="terminal-name">{gType}</span>
              </div>
            );
          })}
        </div>
      </div>

      {/* 3. Quantity & Action Row */}
      <div className="terminal-section">
        <label htmlFor="flying-quantity" className="section-label">
          3. Quantity & Action
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
              id="flying-quantity"
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
            + Add Flying Game Server
          </button>
        </div>
      </div>

      {/* 4. Added Servers List Summary */}
      <div className="terminal-section added-list-section">
        <label className="section-label">Added Flying Game Servers Summary</label>
        {addedServers.length === 0 ? (
          <div className="empty-state">No Flying Game Servers added yet.</div>
        ) : (
          <div className="added-terminals-grid">
            {addedServers.map((item, index) => (
              <div key={index} className="added-terminal-chip">
                <span className="chip-type">{item.gameType}</span>
                <span className="chip-subtext">Case: {item.caseType}</span>
                <span className="chip-qty">{item.quantity}×</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default FlyingGameServer;
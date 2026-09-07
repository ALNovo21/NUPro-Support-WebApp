import React, { useState } from 'react';
import c28aImg from '../assets/terminal-c028a.jpg';
import fv862bImg from '../assets/terminal-fv862b.jpg';

const Terminal = () => {
  const [type, setType] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [addedTerminals, setAddedTerminals] = useState([]);

  const handleSelectType = (selectedType) => {
    setType(selectedType);
  };

  const handleQuantityChange = (delta) => {
    setQuantity((prev) => Math.max(1, prev + delta));
  };

  const handleInputChange = (e) => {
    const val = parseInt(e.target.value, 10);
    setQuantity(isNaN(val) || val < 1 ? 1 : val);
  };

  const handleAddTerminal = () => {
    if (!type || quantity < 1) return;

    setAddedTerminals((prevList) => {
      const existingIndex = prevList.findIndex((item) => item.type === type);

      if (existingIndex > -1) {
        const updatedList = [...prevList];
        updatedList[existingIndex].quantity += quantity;
        return updatedList;
      } else {
        return [...prevList, { type, quantity }];
      }
    });

    setType('');
    setQuantity(1);
  };

  const isReady = Boolean(type && quantity >= 1);

  return (
    <div className="terminal-card">
      <div className="card-header-bar">
        <h3 className="terminal-title">Terminal Configuration</h3>
        <span className={`status-badge ${isReady ? 'ready' : 'pending'}`}>
          {isReady ? '● Ready to Add' : '○ Select Terminal'}
        </span>
      </div>

      {/* 1. Visuelle Typ-Auswahl */}
      <div className="terminal-section">
        <label className="section-label">1. Select Terminal Type</label>
        <div className="terminal-image-grid">
          
          <div
            className={`terminal-select-card ${type === 'FVC28A' ? 'selected' : ''}`}
            onClick={() => handleSelectType('FVC28A')}
          >
            <div className="img-wrapper">
              <img src={c28aImg} alt="FVC28A" className="terminal-img" />
            </div>
            <span className="terminal-name">FVC28A</span>
          </div>

          <div
            className={`terminal-select-card ${type === 'FV862B' ? 'selected' : ''}`}
            onClick={() => handleSelectType('FV862B')}
          >
            <div className="img-wrapper">
              <img src={fv862bImg} alt="FV862B" className="terminal-img" />
            </div>
            <span className="terminal-name">FV862B</span>
          </div>

        </div>
      </div>

      {/* 2. Mengenauswahl & Add-Button in EINER homogenen Zeile */}
      <div className="terminal-section">
        <label className="section-label">2. Quantity & Action</label>
        <div className="action-row">
          
          {/* Integrierte Plus/Minus-Gruppe */}
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
              type="number"
              className="qty-input"
              value={quantity}
              onChange={handleInputChange}
              min="1"
            />
            <button
              type="button"
              className="qty-btn"
              onClick={() => handleQuantityChange(1)}
            >
              +
            </button>
          </div>

          {/* Perfekt ausgerichteter Add Button */}
          <button
            className="terminal-add-button"
            onClick={handleAddTerminal}
            disabled={!isReady}
          >
            + Add to List
          </button>

        </div>
      </div>

      {/* 3. Liste der hinzugefügten Terminals */}
      <div className="terminal-section added-list-section">
        <label className="section-label">Configured Terminals Summary</label>
        {addedTerminals.length === 0 ? (
          <div className="empty-state">No terminals added to configuration yet.</div>
        ) : (
          <div className="added-terminals-grid">
            {addedTerminals.map((item, index) => (
              <div key={index} className="added-terminal-chip">
                <span className="chip-type">{item.type}</span>
                <span className="chip-qty">{item.quantity}×</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Terminal;
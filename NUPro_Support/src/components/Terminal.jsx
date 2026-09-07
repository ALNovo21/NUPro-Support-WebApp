import React, { useState } from 'react';

const Terminal = () => {
  const [type, setType] = useState(''); // Default: 'Please select'
  const [quantity, setQuantity] = useState(1); // Default: 1
  const [addedTerminals, setAddedTerminals] = useState([]); // Liste der hinzugefügten Terminals

  const handleTypeChange = (event) => {
    setType(event.target.value);
  };

  const handleQuantityChange = (event) => {
    const value = parseInt(event.target.value, 10);
    setQuantity(isNaN(value) || value < 1 ? 1 : value);
  };

  const handleAddTerminal = () => {
    if (!type || quantity < 1) return;

    setAddedTerminals((prevList) => {
      // Prüfen, ob der Typ bereits in der Liste existiert
      const existingIndex = prevList.findIndex((item) => item.type === type);

      if (existingIndex > -1) {
        // Falls vorhanden: Anzahl zur bestehenden aufaddieren
        const updatedList = [...prevList];
        updatedList[existingIndex].quantity += quantity;
        return updatedList;
      } else {
        // Falls neu: Neue Zeile anlegen
        return [...prevList, { type, quantity }];
      }
    });

    // Formular für den nächsten Eintrag zurücksetzen
    setType('');
    setQuantity(1);
  };

  // Status ist 'Ready', sobald ein Typ ausgewählt wurde und die Anzahl >= 1 ist
  const isReady = Boolean(type && quantity >= 1);
  const status = isReady ? 'Ready' : 'Not Configured';

  return (
    <div className="terminal-card">
      <h3 className="terminal-title">Terminal Configuration</h3>

      {/* 1. Typ-Auswahl */}
      <div className="terminal-section">
        <label htmlFor="terminal-select">Choose a Terminal:</label>
        <select id="terminal-select" value={type} onChange={handleTypeChange}>
          <option value="">Please select</option>
          <option value="FVC28A">FVC28A</option>
          <option value="FV862B">FV862B</option>
        </select>
      </div>

      {/* 2. Anzahl-Eingabe */}
      <div className="terminal-section">
        <label htmlFor="terminal-quantity">Quantity:</label>
        <input
          id="terminal-quantity"
          type="number"
          min="1"
          value={quantity}
          onChange={handleQuantityChange}
        />
      </div>

      {/* 3. Status & Add Button */}
      <div className="terminal-section">
        <p>
          <strong>Status:</strong>{' '}
          <span className={`status ${isReady ? 'ready' : 'not-configured'}`}>
            {status}
          </span>
        </p>
        <button
          className="terminal-add-button"
          onClick={handleAddTerminal}
          disabled={!isReady}
        >
          Add Terminals
        </button>
      </div>

      {/* Liste der hinzugefügten Terminals */}
      <div className="terminal-section">
        <h4>Added Terminals:</h4>
        {addedTerminals.length === 0 ? (
          <p>No terminals added yet.</p>
        ) : (
          <ul>
            {addedTerminals.map((item, index) => (
              <li key={index}>
                <strong>Type:</strong> {item.type} | <strong>Quantity:</strong> {item.quantity}x
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Terminal;
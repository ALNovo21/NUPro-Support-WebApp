import React, { useState } from 'react';
import { isResultInfoSupported } from './gamesConfig';

const AnimationPC = ({ allSelectedGames = [] }) => {
  // Speichert die Auswahlen: { [gameId]: { animationPc: 'Yes'|'No', resultInfo: 'Yes'|'No' } }
  const [selections, setSelections] = useState({});

  const handleSelectionChange = (gameId, pcType, value) => {
    setSelections((prev) => ({
      ...prev,
      [gameId]: {
        ...prev[gameId],
        [pcType]: value,
      },
    }));
  };

  // Status ist "Ready", wenn für jedes Spiel eine Auswahl (Ja oder Nein) getroffen wurde
  const isReady =
    allSelectedGames.length > 0 &&
    allSelectedGames.every((game) => {
      const sel = selections[game.id];
      return sel && sel.animationPc !== undefined && sel.resultInfo !== undefined;
    });

  const status = isReady ? 'Ready' : 'Not Configured';

  return (
    <div className="animation-card" style={{ border: '1px solid #ccc', padding: '20px', borderRadius: '8px' }}>
      <h3 className="animation-title">Animation PC & Result Info PC Configurator</h3>

      {allSelectedGames.length === 0 ? (
        <p>No games configured in previous steps. Please add games above first.</p>
      ) : (
        <div className="animation-section">
          {/* Header für die zweispaltige Übersicht */}
          <div
            className="grid-header"
            style={{
              display: 'grid',
              gridTemplateColumns: '2fr 1fr 1fr',
              gap: '10px',
              paddingBottom: '10px',
              borderBottom: '2px solid #ccc',
              fontWeight: 'bold',
            }}
          >
            <div>Configured Game</div>
            <div>Animation PC</div>
            <div>Result Info PC</div>
          </div>

          {/* Zeilen für jedes konfigurierte Spiel */}
          {allSelectedGames.map((gameItem) => {
            const supportsResultInfo = isResultInfoSupported(gameItem.name);
            const currentSelection = selections[gameItem.id] || { animationPc: '', resultInfo: '' };

            return (
              <div
                key={gameItem.id}
                className="grid-row"
                style={{
                  display: 'grid',
                  gridTemplateColumns: '2fr 1fr 1fr',
                  gap: '10px',
                  alignItems: 'center',
                  padding: '10px 0',
                  borderBottom: '1px solid #eee',
                }}
              >
                {/* 1. Spalte: Spielname & Quelle */}
                <div>
                  <strong>[{gameItem.source}]</strong> {gameItem.name} ({gameItem.quantity}x)
                </div>

                {/* 2. Spalte: Animation PC */}
                <div>
                  <select
                    value={currentSelection.animationPc || ''}
                    onChange={(e) => handleSelectionChange(gameItem.id, 'animationPc', e.target.value)}
                  >
                    <option value="">Please select</option>
                    <option value="Yes">Yes</option>
                    <option value="No">No</option>
                  </select>
                </div>

                {/* 3. Spalte: Result Info PC (Sperre für Blackjack/SICBO) */}
                <div>
                  {supportsResultInfo ? (
                    <select
                      value={currentSelection.resultInfo || ''}
                      onChange={(e) => handleSelectionChange(gameItem.id, 'resultInfo', e.target.value)}
                    >
                      <option value="">Please select</option>
                      <option value="Yes">Yes</option>
                      <option value="No">No</option>
                    </select>
                  ) : (
                    <span style={{ color: '#888', italic: 'true', fontSize: '0.9em' }}>
                      Not Available (Incompatible)
                    </span>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Status-Anzeige */}
      <div className="animation-section" style={{ marginTop: '20px' }}>
        <p>
          <strong>Status:</strong>{' '}
          <span className={`status ${isReady ? 'ready' : 'not-configured'}`}>
            {status}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AnimationPC;
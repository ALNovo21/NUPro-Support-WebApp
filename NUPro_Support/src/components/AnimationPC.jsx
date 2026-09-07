import React, { useState, useEffect } from 'react';
import { isResultInfoSupported } from './gamesConfig';
import defaultPlaceholder from '../assets/terminal-c028a.jpg';

// 💡 ZUORDNUNG: Individuelle Vorschaubilder je Spiel
const GAME_ANIMATION_IMAGES = {
  // 'Roulette': require('../assets/animations/roulette-anim.png'),
  // 'Blackjack': require('../assets/animations/blackjack-anim.png'),
};

const GAME_RESULT_IMAGES = {
  // 'Roulette': require('../assets/results/roulette-result.png'),
  // 'Blackjack': require('../assets/results/blackjack-result.png'),
};

const AnimationPC = ({ allSelectedGames = [], onChangeConfig }) => {
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

  useEffect(() => {
    let animCount = 0;
    let resultCount = 0;

    allSelectedGames.forEach((game) => {
      const sel = selections[game.id];
      const qty = Number(game.quantity) || 1;

      if (sel?.animationPc === 'Yes') animCount += qty;
      if (sel?.resultInfo === 'Yes') resultCount += qty;
    });

    if (typeof onChangeConfig === 'function') {
      onChangeConfig({
        animationPcs: animCount,
        resultPcs: resultCount,
      });
    }
  }, [selections, allSelectedGames, onChangeConfig]);

  const isReady =
    allSelectedGames.length > 0 &&
    allSelectedGames.every((game) => {
      const sel = selections[game.id];
      const supportsResult = isResultInfoSupported(game.name);

      const animOk = sel && sel.animationPc !== undefined && sel.animationPc !== '';
      const resultOk = !supportsResult || (sel && sel.resultInfo !== undefined && sel.resultInfo !== '');

      return animOk && resultOk;
    });

  return (
    <div className="terminal-card">
      <div className="card-header-bar">
        <h3 className="terminal-title">Animation PC & Result Info PC Configurator</h3>
        <span className={`status-badge ${isReady ? 'ready' : 'pending'}`}>
          {isReady ? '● Ready' : '○ Not Configured'}
        </span>
      </div>

      <div className="server-preview-container">
        <div className="server-img-wrapper">
          <img src={defaultPlaceholder} alt="Animation PC" className="server-img" />
        </div>
        <div className="server-info">
          <h4>Animation & Result Info Hardware</h4>
          <p className="text-muted">
            Wählen Sie die spezifischen Animationen und Result-Displays für jedes konfigurierte Spiel.
          </p>
        </div>
      </div>

      <div className="terminal-section">
        {allSelectedGames.length === 0 ? (
          <div className="empty-state">
            No games configured in previous steps. Please add games above first.
          </div>
        ) : (
          <div className="games-config-stack">
            {allSelectedGames.map((gameItem) => {
              const supportsResultInfo = isResultInfoSupported(gameItem.name);
              const currentSelection = selections[gameItem.id] || { animationPc: '', resultInfo: '' };
              
              // Spielspezifische Bilder laden (mit Platzhalter-Fallback)
              const animImage = GAME_ANIMATION_IMAGES[gameItem.name] || defaultPlaceholder;
              const resultImage = GAME_RESULT_IMAGES[gameItem.name] || defaultPlaceholder;

              return (
                <div key={gameItem.id} className="game-config-card-box">
                  <div className="game-card-header">
                    <span className="card-top-badge">{gameItem.source}</span>
                    <h4 className="game-title-name">
                      {gameItem.name} <span className="chip-qty">({gameItem.quantity}x)</span>
                    </h4>
                  </div>

                  {/* 1. Animation PC Selection */}
                  <div className="sub-config-group">
                    <label className="section-label">Animation PC Option ({gameItem.name})</label>
                    <div className="terminal-image-grid">
                      <div
                        className={`terminal-select-card ${currentSelection.animationPc === 'Yes' ? 'selected' : ''}`}
                        onClick={() => handleSelectionChange(gameItem.id, 'animationPc', 'Yes')}
                      >
                        <div className="img-wrapper">
                          <img src={animImage} alt={`${gameItem.name} Animation`} className="terminal-img" />
                        </div>
                        <span className="terminal-name">With Animation PC</span>
                        <p className="card-subtext">Dedicated {gameItem.name} Animation</p>
                      </div>

                      <div
                        className={`terminal-select-card no-image-card ${currentSelection.animationPc === 'No' ? 'selected' : ''}`}
                        onClick={() => handleSelectionChange(gameItem.id, 'animationPc', 'No')}
                      >
                        <div className="no-img-placeholder">🚫</div>
                        <span className="terminal-name">Without Animation</span>
                        <p className="card-subtext">No Animation PC needed</p>
                      </div>
                    </div>
                  </div>

                  {/* 2. Result Info PC Selection */}
                  <div className="sub-config-group">
                    <label className="section-label">
                      Result Info PC Option ({gameItem.name}) {!supportsResultInfo && '- Incompatible'}
                    </label>
                    <div className={`terminal-image-grid ${!supportsResultInfo ? 'grid-disabled' : ''}`}>
                      <div
                        className={`terminal-select-card ${supportsResultInfo && currentSelection.resultInfo === 'Yes' ? 'selected' : ''} ${!supportsResultInfo ? 'disabled-card' : ''}`}
                        onClick={() => supportsResultInfo && handleSelectionChange(gameItem.id, 'resultInfo', 'Yes')}
                      >
                        <div className="img-wrapper">
                          <img src={resultImage} alt={`${gameItem.name} Result Display`} className="terminal-img" />
                        </div>
                        <span className="terminal-name">With Result Info PC</span>
                        <p className="card-subtext">
                          {supportsResultInfo ? `Dedicated ${gameItem.name} Result Display` : 'Not Supported for this Game'}
                        </p>
                      </div>

                      <div
                        className={`terminal-select-card no-image-card ${supportsResultInfo && currentSelection.resultInfo === 'No' ? 'selected' : ''} ${!supportsResultInfo ? 'disabled-card' : ''}`}
                        onClick={() => supportsResultInfo && handleSelectionChange(gameItem.id, 'resultInfo', 'No')}
                      >
                        <div className="no-img-placeholder">🚫</div>
                        <span className="terminal-name">Without Result Info</span>
                        <p className="card-subtext">
                          {supportsResultInfo ? 'No Result Display' : 'Incompatible'}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default AnimationPC;
import React, { useState, useEffect } from 'react';
import { isResultInfoSupported } from './gamesConfig';
import defaultPlaceholder from '../assets/terminal-c028a.jpg';

// Hauptbild-Import für den Server
import bs707CaseImg from '../assets/Server/bs_707.png';

// 💡 ANIMATIONS-BILDER (Pfad: assets/animations/)
import animFlyRoulette from '../assets/animations/fly_roulette.png'; 
import animTouchRoulette from '../assets/animations/touch_roulette.png';
import animFlyBlackjack from '../assets/animations/fly_blackjack.png';
import animTouchBlackjack from '../assets/animations/fly_blackjack.png';
import animFlyBaccarat from '../assets/animations/fly_baccarat.png';
import animTouchBaccarat from '../assets/animations/touch_baccarat.png';
import animFlySicbo from '../assets/animations/fly_sicbo.png';
import animTouchSicbo from '../assets/animations/touch_sicbo.png';
import animMultiTouchLlr from '../assets/animations/llr_multi_touch.png'; // Multi & Touchbet LLR teilen sich die Animation

// 💡 RESULT-INFO-BILDER (Pfad: assets/results/)
import resFlyRoulette from '../assets/results/touch_roulette.png';
import resTouchRoulette from '../assets/results/touch_roulette.png';
import resBaccarat from '../assets/results/baccarat.png'; // Baccarat unterscheidet sich nicht zwischen Flying/Touchbet
import resLlr from '../assets/results/llr.png'; // LLR Result Info

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

  // Hilfsfunktion zur Ermittlung des passenden Animationsbildes je nach Spieltyp & Quelle
  const getAnimationImage = (gameName, source) => {
    const lower = gameName.toLowerCase();
    const srcLower = (source || '').toLowerCase();

    if (lower.includes('lucky lady')) {
      return animMultiTouchLlr; // Multi & Touchbet LLR teilen sich die Animation
    }
    if (lower.includes('roulette') || lower.includes('88 roulette')) {
      if (srcLower.includes('flying')) return animFlyRoulette;
      return animTouchRoulette; // Touchbet & Multi (sofern vorhanden)
    }
    if (lower.includes('blackjack')) {
      if (srcLower.includes('flying')) return animFlyBlackjack;
      return animTouchBlackjack;
    }
    if (lower.includes('baccarat')) {
      if (srcLower.includes('flying')) return animFlyBaccarat;
      return animTouchBaccarat;
    }
    if (lower.includes('sicbo')) {
      if (srcLower.includes('flying')) return animFlySicbo;
      return animTouchSicbo;
    }
    return defaultPlaceholder;
  };

  // Hilfsfunktion zur Ermittlung des passenden Result-Info-Bildes
  const getResultImage = (gameName, source) => {
    const lower = gameName.toLowerCase();
    const srcLower = (source || '').toLowerCase();

    if (lower.includes('lucky lady')) {
      return resLlr;
    }
    if (lower.includes('roulette') || lower.includes('88 roulette')) {
      if (srcLower.includes('flying')) return resFlyRoulette;
      return resTouchRoulette;
    }
    if (lower.includes('baccarat')) {
      return resBaccarat; // Baccarat unterscheidet sich nicht zwischen flying und touchbet
    }
    return defaultPlaceholder;
  };

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

      {/* Produkt-Vorschau mit BS707 Bild und max height 300 */}
      <div className="server-preview-container">
        <div className="server-img-wrapper large-preview-wrapper" style={{ maxHeight: '300px', height: 'auto' }}>
          <img 
            src={bs707CaseImg} 
            alt="Animation PC Hardware" 
            className="server-img large-server-img" 
            style={{ maxHeight: '300px', objectFit: 'contain', width: '100%' }}
          />
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
              
              // Dynamische Bildzuweisung über die Funktionen
              const animImage = getAnimationImage(gameItem.name, gameItem.source);
              const resultImage = getResultImage(gameItem.name, gameItem.source);

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
                      
                      {/* Linke Option: Mit Result Info (bzw. rotes Icon falls nicht unterstützt) */}
                      <div
                        className={`terminal-select-card ${!supportsResultInfo ? 'no-image-card disabled-card' : ''} ${supportsResultInfo && currentSelection.resultInfo === 'Yes' ? 'selected' : ''}`}
                        onClick={() => supportsResultInfo && handleSelectionChange(gameItem.id, 'resultInfo', 'Yes')}
                      >
                        {supportsResultInfo ? (
                          <div className="img-wrapper">
                            <img src={resultImage} alt={`${gameItem.name} Result Display`} className="terminal-img" />
                          </div>
                        ) : (
                          <div className="no-img-placeholder">🚫</div>
                        )}
                        <span className="terminal-name">With Result Info PC</span>
                        <p className="card-subtext">
                          {supportsResultInfo ? `Dedicated ${gameItem.name} Result Display` : 'Not Supported for this Game'}
                        </p>
                      </div>

                      {/* Rechte Option: Ohne Result Info */}
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
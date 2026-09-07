import React, { useState } from 'react';
import Terminals from './components/Terminal';
import DBServer from './components/FS695DatabaseServer';
import FS593AutoWheel from './components/FS593AutoWheel';
import FS695LiveGameServer from './components/FS695LiveGameServer';
import StreamServer from './components/StreamServer';
import FlyingGameServer from './components/FlyingGameServer';
import RemoteGameServer from './components/RemoteGameServerBooksize';
import AnimationPC from './components/AnimationPC';

const STEPS = [
  { id: 1, title: 'Terminals', optional: false },
  { id: 2, title: 'DB Server', optional: false },
  { id: 3, title: 'FS593 Auto Wheel', optional: true },
  { id: 4, title: 'FS695 Live Game Server', optional: true },
  { id: 5, title: 'Stream Server', optional: false },
  { id: 6, title: 'Flying Game Server', optional: true },
  { id: 7, title: 'Remote Game Server', optional: true },
  { id: 8, title: 'Animation & Result PC', optional: false },
  { id: 9, title: 'Summary & Finish', optional: false },
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isCompleted, setIsCompleted] = useState(false);

  // Detail-States für exakte Zusammenfassung
  const [terminalConfig, setTerminalConfig] = useState({ type: 'Standard Terminal', quantity: 1 });
  const [dbServerConfig, setDbServerConfig] = useState({ model: 'FS695 DB Server', execution: 'Standard' });

  // Animation & Result PC Config State
  const [animPcConfig, setAnimPcConfig] = useState({ animationPcs: 0, resultPcs: 0 });

  // Zentrale Listen für Komponenten & Spiele
  const [fs593List, setFs593List] = useState([]);
  const [fs695List, setFs695List] = useState([]);
  const [flyingList, setFlyingList] = useState([]);
  const [remoteList, setRemoteList] = useState([]);
  const [allGames, setAllGames] = useState([]);

  // Stream Server Logik: Benötigt genau dann 1x Stream Server, wenn FS593 oder FS695 vorhanden sind
  const requiresStreamServer = fs593List.length > 0 || fs695List.length > 0;

  // Status Check für Step 8: Ist 'RDY', sobald mindestens 1 Animation oder 1 Result PC ausgewählt wurde
  const isAnimationReady = (animPcConfig.animationPcs + animPcConfig.resultPcs) > 0;

  // Handler zum Hinzufügen von Spielen in die zentrale Liste
  const handleAddGenericGame = (source, name, quantity) => {
    if (!name || quantity < 1) return;
    setAllGames((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        source,
        name,
        quantity: Number(quantity),
      },
    ]);
  };

  // Handler für FS593 Auto Wheel
  const handleAddFs593 = (gameType, quantity, details = {}) => {
    setFs593List((prev) => [...prev, { gameType, quantity: Number(quantity), ...details }]);
    handleAddGenericGame('FS593 Auto Wheel', gameType, quantity);
  };

  // Handler für FS695 Live Game Server
  const handleAddFs695 = (gameType, quantity, details = {}) => {
    setFs695List((prev) => [...prev, { gameType, quantity: Number(quantity), ...details }]);
    handleAddGenericGame('FS695 Live Game Server', gameType, quantity);
  };

  // Handler für Flying Game Server
  const handleAddFlying = (game, quantity) => {
    setFlyingList((prev) => [...prev, { game, quantity: Number(quantity) }]);
    handleAddGenericGame('Flying Game Server', game, quantity);
  };

  // Handler für Remote Game Server
  const handleAddRemote = (game, quantity) => {
    setRemoteList((prev) => [...prev, { game, quantity: Number(quantity) }]);
    handleAddGenericGame('Remote Game Server', game, quantity);
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const handleFinish = () => {
    setIsCompleted(true);
  };

  const currentStepConfig = STEPS.find((s) => s.id === currentStep);

  return (
    <div className="configurator-container" style={{ maxWidth: '950px', margin: '0 auto', padding: '20px', fontFamily: 'sans-serif' }}>
      
      {/* Stepper Header Navigation */}
      <div className="stepper-header" style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
        {STEPS.map((step) => (
          <div
            key={step.id}
            style={{
              flex: 1,
              textAlign: 'center',
              padding: '10px 2px',
              borderBottom: currentStep === step.id ? '4px solid #007bff' : '2px solid #ddd',
              color: currentStep === step.id ? '#007bff' : '#666',
              fontWeight: currentStep === step.id ? 'bold' : 'normal',
              fontSize: '0.8em',
            }}
          >
            <div>Step {step.id}</div>
            <div>{step.title}</div>
          </div>
        ))}
      </div>

      {/* Dynamic Step Content */}
      <div className="step-content" style={{ minHeight: '380px', background: '#f9f9f9', padding: '24px', borderRadius: '8px', border: '1px solid #e2e8f0' }}>
        
        {currentStep === 1 && (
          <Terminals
            config={terminalConfig}
            onChangeConfig={(newConfig) => setTerminalConfig(newConfig)}
          />
        )}
        
        {currentStep === 2 && (
          <DBServer
            config={dbServerConfig}
            onChangeConfig={(newConfig) => setDbServerConfig(newConfig)}
          />
        )}

        {currentStep === 3 && (
          <FS593AutoWheel
            onAddGame={(gameType, quantity, details) => handleAddFs593(gameType, quantity, details)}
            addedWheels={fs593List}
          />
        )}

        {currentStep === 4 && (
          <FS695LiveGameServer
            onAddGame={(gameType, quantity, details) => handleAddFs695(gameType, quantity, details)}
            addedServers={fs695List}
          />
        )}

        {currentStep === 5 && (
          <StreamServer isRequired={requiresStreamServer} />
        )}

        {currentStep === 6 && (
          <FlyingGameServer 
            onAddGame={(game, qty) => handleAddFlying(game, qty)} 
            addedServers={flyingList}
          />
        )}

        {currentStep === 7 && (
          <RemoteGameServer 
            onAddGame={(game, qty) => handleAddRemote(game, qty)} 
            addedServers={remoteList}
          />
        )}

        {/* Step 8: Animation & Result PC Selection */}
        {currentStep === 8 && (
          <div>
            <AnimationPC 
              allSelectedGames={allGames} 
              onChangeConfig={(config) => setAnimPcConfig(config)}
            />

            {/* Live Status Bar */}
            <div style={{
              marginTop: '25px',
              padding: '12px 20px',
              borderRadius: '6px',
              fontWeight: 'bold',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              background: isAnimationReady ? '#dcfce7' : '#fef3c7',
              border: `1px solid ${isAnimationReady ? '#86efac' : '#fde047'}`,
              color: isAnimationReady ? '#15803d' : '#a16207'
            }}>
              <span>Status: {isAnimationReady ? '🟢 RDY (Ready)' : '🟡 NOT READY'}</span>
              <span style={{ fontSize: '0.85em', fontWeight: 'normal' }}>
                {isAnimationReady 
                  ? `Auswahl abgeschlossen (${animPcConfig.animationPcs || 0} Animation PC, ${animPcConfig.resultPcs || 0} Result PC)` 
                  : 'Bitte wähle mindestens 1 Animation oder Result PC aus'}
              </span>
            </div>
          </div>
        )}

        {/* Step 9: Final Detailed Summary */}
        {currentStep === 9 && (
          <div>
            {!isCompleted ? (
              <div style={{ background: '#fff', padding: '24px', borderRadius: '8px', border: '1px solid #cbd5e1' }}>
                <h3 style={{ marginTop: 0, color: '#0f172a', borderBottom: '2px solid #f1f5f9', paddingBottom: '10px' }}>
                  📋 Complete System Summary
                </h3>

                {/* 1. Core Hardware */}
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#007bff' }}>1. Core Hardware & Infrastructure</h4>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9em' }}>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px 0', fontWeight: 'bold', width: '220px' }}>Terminals:</td>
                        <td>{terminalConfig.type || 'Standard Terminal'} ({terminalConfig.quantity || 1}x)</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Database Server:</td>
                        <td>FS695 DB Server — {dbServerConfig.execution || 'Standard Execution'}</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Stream Server:</td>
                        <td>
                          {requiresStreamServer ? (
                            <span style={{ color: '#15803d', fontWeight: 'bold' }}>1x Required & Auto-Added</span>
                          ) : (
                            <span style={{ color: '#64748b' }}>0x (Not Required)</span>
                          )}
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 2. Displays & Animation PCs */}
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#007bff' }}>2. Animation & Result Display PCs</h4>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9em' }}>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px 0', fontWeight: 'bold', width: '220px' }}>Animation PCs:</td>
                        <td>{animPcConfig.animationPcs || 0}x</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f1f5f9' }}>
                        <td style={{ padding: '8px 0', fontWeight: 'bold' }}>RID (Result) PCs:</td>
                        <td>{animPcConfig.resultPcs || 0}x</td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid #f1f5f9', background: '#f8fafc' }}>
                        <td style={{ padding: '8px 0', fontWeight: 'bold' }}>Gesamtanzahl Display PCs:</td>
                        <td style={{ fontWeight: 'bold', color: '#0f172a' }}>
                          {(animPcConfig.animationPcs || 0) + (animPcConfig.resultPcs || 0)}x
                        </td>
                      </tr>
                    </tbody>
                  </table>
                </div>

                {/* 3. Live & Wheel Components */}
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#007bff' }}>3. Wheels & Live Game Server Details</h4>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9em' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', textAlign: 'left', borderBottom: '1px solid #cbd5e1' }}>
                        <th style={{ padding: '8px' }}>Component</th>
                        <th style={{ padding: '8px' }}>Game / Type</th>
                        <th style={{ padding: '8px' }}>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {fs593List.length === 0 && fs695List.length === 0 && (
                        <tr>
                          <td colSpan="3" style={{ padding: '10px', color: '#94a3b8', textAlign: 'center' }}>
                            No FS593 Auto Wheels or FS695 Live Game Servers added.
                          </td>
                        </tr>
                      )}
                      {fs593List.map((item, idx) => (
                        <tr key={`fs593-${idx}`} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '8px' }}>FS593 Auto Wheel</td>
                          <td style={{ padding: '8px' }}>{item.gameType || 'Standard Wheel'}</td>
                          <td style={{ padding: '8px' }}>{item.quantity}x</td>
                        </tr>
                      ))}
                      {fs695List.map((item, idx) => (
                        <tr key={`fs695-${idx}`} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '8px' }}>FS695 Live Game Server</td>
                          <td style={{ padding: '8px' }}>{item.gameType || 'Standard LGS'}</td>
                          <td style={{ padding: '8px' }}>{item.quantity}x</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {/* 4. Additional Game Servers */}
                <div style={{ marginBottom: '20px' }}>
                  <h4 style={{ margin: '0 0 10px 0', color: '#007bff' }}>4. Flying & Remote Game Servers</h4>
                  <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.9em' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc', textAlign: 'left', borderBottom: '1px solid #cbd5e1' }}>
                        <th style={{ padding: '8px' }}>Server Type</th>
                        <th style={{ padding: '8px' }}>Configured Game</th>
                        <th style={{ padding: '8px' }}>Quantity</th>
                      </tr>
                    </thead>
                    <tbody>
                      {flyingList.length === 0 && remoteList.length === 0 && (
                        <tr>
                          <td colSpan="3" style={{ padding: '10px', color: '#94a3b8', textAlign: 'center' }}>
                            No Flying or Remote Game Servers added.
                          </td>
                        </tr>
                      )}
                      {flyingList.map((item, idx) => (
                        <tr key={`flying-${idx}`} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '8px' }}>Flying Game Server</td>
                          <td style={{ padding: '8px' }}>{item.game}</td>
                          <td style={{ padding: '8px' }}>{item.quantity}x</td>
                        </tr>
                      ))}
                      {remoteList.map((item, idx) => (
                        <tr key={`remote-${idx}`} style={{ borderBottom: '1px solid #f1f5f9' }}>
                          <td style={{ padding: '8px' }}>Remote Game Server</td>
                          <td style={{ padding: '8px' }}>{item.game}</td>
                          <td style={{ padding: '8px' }}>{item.quantity}x</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

              </div>
            ) : (
              /* Final Completion Screen */
              <div style={{ textAlign: 'center', padding: '40px 20px' }}>
                <div style={{ fontSize: '3.5em', color: '#22c55e', marginBottom: '10px' }}>✓</div>
                <h2 style={{ color: '#15803d', margin: '0 0 10px 0' }}>Configuration Complete!</h2>
                <p style={{ color: '#475569' }}>
                  The entire system setup has been successfully submitted and saved.
                </p>
                <button
                  onClick={() => window.location.reload()}
                  style={{ marginTop: '20px', padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
                >
                  Start New Configuration
                </button>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Stepper Footer / Action Controls */}
      {!isCompleted && (
        <div className="stepper-footer" style={{ display: 'flex', justifyContent: 'space-between', marginTop: '20px' }}>
          
          <button 
            onClick={prevStep} 
            disabled={currentStep === 1} 
            style={{ padding: '10px 20px', cursor: currentStep === 1 ? 'not-allowed' : 'pointer' }}
          >
            Back
          </button>

          <div style={{ display: 'flex', gap: '10px' }}>
            {/* Skip Button für optionale Schritte */}
            {currentStepConfig?.optional && (
              <button
                onClick={nextStep}
                style={{ padding: '10px 20px', background: '#6c757d', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Skip Step
              </button>
            )}

            {/* Weiter zu Step 9 / Finaler Abschluss Button in Step 9 */}
            {currentStep < STEPS.length ? (
              <button
                onClick={nextStep}
                style={{ padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
              >
                Next Step
              </button>
            ) : (
              <button
                onClick={handleFinish}
                style={{ padding: '10px 24px', background: '#16a34a', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}
              >
                Complete & Submit
              </button>
            )}
          </div>

        </div>
      )}

    </div>
  );
}
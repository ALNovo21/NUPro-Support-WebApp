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
];

export default function App() {
  const [currentStep, setCurrentStep] = useState(1);

  // Zentrale Listen für Komponenten & Spiele
  const [fs593List, setFs593List] = useState([]);
  const [fs695List, setFs695List] = useState([]);
  const [allGames, setAllGames] = useState([]);

  // Stream Server Logik: Benötigt genau dann 1x Stream Server, wenn FS593 oder FS695 vorhanden sind
  const requiresStreamServer = fs593List.length > 0 || fs695List.length > 0;

  // Handler zum Hinzufügen von Spielen in die zentrale Liste (für Animation PC)
  const handleAddGenericGame = (source, name, quantity) => {
    if (!name || quantity < 1) return;
    setAllGames((prev) => [
      ...prev,
      {
        id: Date.now() + Math.random(),
        source,
        name,
        quantity,
      },
    ]);
  };

  // Handler für FS593 Auto Wheel
  const handleAddFs593 = (gameType, quantity) => {
    setFs593List((prev) => [...prev, { gameType, quantity }]);
    handleAddGenericGame('FS593 Auto Wheel', gameType, quantity);
  };

  // Handler für FS695 Live Game Server
  const handleAddFs695 = (gameType, quantity) => {
    setFs695List((prev) => [...prev, { gameType, quantity }]);
    handleAddGenericGame('FS695 Live Game Server', gameType, quantity);
  };

  const nextStep = () => {
    if (currentStep < STEPS.length) setCurrentStep((prev) => prev + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep((prev) => prev - 1);
  };

  const currentStepConfig = STEPS.find((s) => s.id === currentStep);

  return (
    <div className="configurator-container" style={{ maxWidth: '900px', margin: '0 auto', padding: '20px' }}>
      
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
      <div className="step-content" style={{ minHeight: '380px', background: '#f9f9f9', padding: '20px', borderRadius: '8px' }}>
        
        {currentStep === 1 && <Terminals />}
        
        {currentStep === 2 && <DBServer />}

        {currentStep === 3 && (
          <FS593AutoWheel
            onAddGame={(gameType, quantity) => handleAddFs593(gameType, quantity)}
            addedWheels={fs593List}
          />
        )}

        {currentStep === 4 && (
          <FS695LiveGameServer
            onAddGame={(gameType, quantity) => handleAddFs695(gameType, quantity)}
            addedServers={fs695List}
          />
        )}

        {currentStep === 5 && (
          <StreamServer isRequired={requiresStreamServer} />
        )}

        {currentStep === 6 && (
          <FlyingGameServer 
            onAddGame={(game, qty) => handleAddGenericGame('Flying Game Server', game, qty)} 
          />
        )}

        {currentStep === 7 && (
          <RemoteGameServer 
            onAddGame={(game, qty) => handleAddGenericGame('Remote Game Server', game, qty)} 
          />
        )}

        {currentStep === 8 && (
          <AnimationPC allSelectedGames={allGames} />
        )}

      </div>

      {/* Stepper Footer / Action Controls */}
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

          {/* Nächster Schritt Button */}
          {currentStep < STEPS.length && (
            <button
              onClick={nextStep}
              style={{ padding: '10px 20px', background: '#007bff', color: '#fff', border: 'none', borderRadius: '4px', cursor: 'pointer' }}
            >
              Next Step
            </button>
          )}
        </div>

      </div>

    </div>
  );
}
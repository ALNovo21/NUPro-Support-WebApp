import React, { useState, useCallback } from 'react';
import './App.css'; // Importiert alle Styles

import Terminals from './components/Terminal';
import DBServer from './components/FS695DatabaseServer';
import FS593AutoWheel from './components/FS593AutoWheel';
import FS695LiveGameServer from './components/FS695LiveGameServer';
import StreamServer from './components/StreamServer';
import FlyingGameServer from './components/FlyingGameServer';
import RemoteGameServer from './components/RemoteGameServerBooksize';
import AnimationPC from './components/AnimationPC';
import OrderSummary from './components/OrderSummary'; // 💡 Importiert deine neue OrderSummary Komponente

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

  // System Configurations State
  const [terminalConfig, setTerminalConfig] = useState({ type: 'Standard Terminal', quantity: 1, variant: 'Standard' });
  const [dbServerConfig, setDbServerConfig] = useState({ model: 'FS695 DB Server', execution: 'Standard', housing: 'FS695 Case', quantity: 1 });
  const [animPcConfig, setAnimPcConfig] = useState({ animationPcs: 0, resultPcs: 0 });

  // Game Lists State
  const [fs593List, setFs593List] = useState([]);
  const [fs695List, setFs695List] = useState([]);
  const [flyingList, setFlyingList] = useState([]);
  const [remoteList, setRemoteList] = useState([]);
  const [allGames, setAllGames] = useState([]);

  const requiresStreamServer = fs593List.length > 0 || fs695List.length > 0;

  // Generic Game Logger
  const handleAddGenericGame = useCallback((source, name, quantity) => {
    if (!name || quantity < 1) return;
    setAllGames((prev) => [
      ...prev,
      { id: `${Date.now()}-${Math.random()}`, source, name, quantity: Number(quantity) },
    ]);
  }, []);

  const handleAddFs593 = (gameType, quantity, details = {}) => {
    setFs593List((prev) => [...prev, { gameType, quantity: Number(quantity), ...details }]);
    handleAddGenericGame('FS593 Auto Wheel', gameType, quantity);
  };

  const handleAddFs695 = (gameType, quantity, details = {}) => {
    setFs695List((prev) => [...prev, { gameType, quantity: Number(quantity), ...details }]);
    handleAddGenericGame('FS695 Live Game Server', gameType, quantity);
  };

  const handleAddFlying = (game, quantity, caseType = 'FS695 Case') => {
    setFlyingList((prev) => [...prev, { gameType: game, caseType, quantity: Number(quantity) }]);
    handleAddGenericGame('Flying Game Server', game, quantity);
  };

  const handleAddRemote = (game, quantity) => {
    setRemoteList((prev) => [...prev, { gameType: game, quantity: Number(quantity) }]);
    handleAddGenericGame('Remote Game Server', game, quantity);
  };

  const handleAnimPcChange = useCallback((config) => {
    if (config) {
      setAnimPcConfig({
        animationPcs: Number(config.animationPcs || config.animPcs || 0),
        resultPcs: Number(config.resultPcs || config.ridPcs || 0),
      });
    }
  }, []);

  // Erstellt das benötigte Datenobjekt exakt im Format, das OrderSummary erwartet
  const summaryConfigData = {
    terminals: [{
      type: terminalConfig.type || 'Standard Terminal',
      variant: terminalConfig.variant || 'Standard',
      quantity: Number(terminalConfig.quantity || 1)
    }],
    dbServers: [{
      gameType: dbServerConfig.model || 'FS695 DB Server',
      housing: dbServerConfig.execution || dbServerConfig.housing || 'Standard',
      quantity: Number(dbServerConfig.quantity || 1)
    }],
    autoWheels: fs593List,
    liveServers: fs695List,
    streamServersCount: requiresStreamServer ? 1 : 0,
    remoteServers: remoteList,
    flyingServers: flyingList,
    animationPcsCount: animPcConfig.animationPcs,
    resultPcsCount: animPcConfig.resultPcs,
  };

  const handleExportConfiguration = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(summaryConfigData, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'NovoUnity_Configuration.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    downloadAnchor.remove();
  };

  const nextStep = () => setCurrentStep((prev) => Math.min(prev + 1, STEPS.length));
  const prevStep = () => setCurrentStep((prev) => Math.max(prev - 1, 1));
  const currentStepConfig = STEPS.find((s) => s.id === currentStep);

  const renderStepContent = () => {
    switch (currentStep) {
      case 1:
        return <Terminals config={terminalConfig} onChangeConfig={setTerminalConfig} />;
      case 2:
        return <DBServer config={dbServerConfig} onChangeConfig={setDbServerConfig} />;
      case 3:
        return <FS593AutoWheel onAddGame={handleAddFs593} addedWheels={fs593List} />;
      case 4:
        return <FS695LiveGameServer onAddGame={handleAddFs695} addedServers={fs695List} />;
      case 5:
        return <StreamServer isRequired={requiresStreamServer} />;
      case 6:
        return <FlyingGameServer onAddGame={handleAddFlying} addedServers={flyingList} />;
      case 7:
        return <RemoteGameServer onAddGame={handleAddRemote} addedServers={remoteList} />;
      case 8:
        return <AnimationPC allSelectedGames={allGames} onChangeConfig={handleAnimPcChange} />;
      case 9:
        if (isCompleted) {
          return (
            <div className="completion-screen">
              <div className="completion-icon">✓</div>
              <h2>Configuration Complete!</h2>
              <p className="text-muted">The entire system setup has been successfully submitted and saved.</p>
              <button className="btn btn-primary" onClick={() => window.location.reload()}>
                Start New Configuration
              </button>
            </div>
          );
        }
        return (
          <OrderSummary 
            configData={summaryConfigData} 
            onExport={handleExportConfiguration} 
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="configurator-container">
      {/* Header Navigation */}
      <nav className="stepper-header">
        {STEPS.map((step) => {
          const isActive = currentStep === step.id;
          const isStepCompleted = currentStep > step.id;

          return (
            <button
              key={step.id}
              onClick={() => setCurrentStep(step.id)}
              className={`stepper-item ${isActive ? 'active' : ''} ${isStepCompleted ? 'completed' : ''}`}
            >
              <span className="stepper-number">
                {isStepCompleted ? '✓' : step.id}
              </span>
              <span className="stepper-title">{step.title}</span>
            </button>
          );
        })}
      </nav>

      {/* Main Content Area */}
      <main className="step-content">{renderStepContent()}</main>

      {/* Footer Navigation */}
      {!isCompleted && (
        <footer className="stepper-footer">
          <button className="btn" onClick={prevStep} disabled={currentStep === 1}>
            Back
          </button>

          <div className="button-group">
            {currentStepConfig?.optional && (
              <button className="btn btn-secondary" onClick={nextStep}>
                Skip Step
              </button>
            )}

            {currentStep < STEPS.length ? (
              <button className="btn btn-primary" onClick={nextStep}>
                Next Step
              </button>
            ) : (
              <button className="btn btn-success" onClick={() => setIsCompleted(true)}>
                Complete & Submit
              </button>
            )}
          </div>
        </footer>
      )}
    </div>
  );
}
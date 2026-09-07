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
  const [terminalConfig, setTerminalConfig] = useState({ type: 'Standard Terminal', quantity: 1 });
  const [dbServerConfig, setDbServerConfig] = useState({ model: 'FS695 DB Server', execution: 'Standard' });
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

  const handleAddFlying = (game, quantity) => {
    setFlyingList((prev) => [...prev, { game, quantity: Number(quantity) }]);
    handleAddGenericGame('Flying Game Server', game, quantity);
  };

  const handleAddRemote = (game, quantity) => {
    setRemoteList((prev) => [...prev, { game, quantity: Number(quantity) }]);
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
        return (
          <SystemSummary
            terminalConfig={terminalConfig}
            dbServerConfig={dbServerConfig}
            animPcConfig={animPcConfig}
            requiresStreamServer={requiresStreamServer}
            fs593List={fs593List}
            fs695List={fs695List}
            flyingList={flyingList}
            remoteList={remoteList}
            isCompleted={isCompleted}
            onReset={() => window.location.reload()}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="configurator-container">
      {/* Header Navigation */}
      {/* Interaktiver Stepper Header */}
<nav className="stepper-header">
  {STEPS.map((step) => {
    const isActive = currentStep === step.id;
    const isCompleted = currentStep > step.id;

    return (
      <button
        key={step.id}
        onClick={() => setCurrentStep(step.id)}
        className={`stepper-item ${isActive ? 'active' : ''} ${isCompleted ? 'completed' : ''}`}
      >
        <span className="stepper-number">
          {isCompleted ? '✓' : step.id}
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

/* ====================================================================
   SUMMARY COMPONENTS
   ==================================================================== */

function SystemSummary({
  terminalConfig,
  dbServerConfig,
  animPcConfig,
  requiresStreamServer,
  fs593List,
  fs695List,
  flyingList,
  remoteList,
  isCompleted,
  onReset,
}) {
  if (isCompleted) {
    return (
      <div className="completion-screen">
        <div className="completion-icon">✓</div>
        <h2>Configuration Complete!</h2>
        <p className="text-muted">The entire system setup has been successfully submitted and saved.</p>
        <button className="btn btn-primary" onClick={onReset}>
          Start New Configuration
        </button>
      </div>
    );
  }

  const liveWheelData = [
    ...fs593List.map((i) => ({ comp: 'FS593 Auto Wheel', type: i.gameType || 'Standard Wheel', qty: `${i.quantity}x` })),
    ...fs695List.map((i) => ({ comp: 'FS695 Live Game Server', type: i.gameType || 'Standard LGS', qty: `${i.quantity}x` })),
  ];

  const additionalServerData = [
    ...flyingList.map((i) => ({ comp: 'Flying Game Server', type: i.game, qty: `${i.quantity}x` })),
    ...remoteList.map((i) => ({ comp: 'Remote Game Server', type: i.game, qty: `${i.quantity}x` })),
  ];

  return (
    <div className="summary-card">
      <h3 className="summary-title">📋 Complete System Summary</h3>

      <SummarySection title="1. Core Hardware & Infrastructure">
        <SummaryKeyValue label="Terminals" value={`${terminalConfig.type || 'Standard Terminal'} (${terminalConfig.quantity || 1}x)`} />
        <SummaryKeyValue label="Database Server" value={`FS695 DB Server — ${dbServerConfig.execution || 'Standard Execution'}`} />
        <SummaryKeyValue
          label="Stream Server"
          value={
            requiresStreamServer ? (
              <span className="text-success">1x Required & Auto-Added</span>
            ) : (
              <span className="text-muted">0x (Not Required)</span>
            )
          }
        />
      </SummarySection>

      <SummarySection title="2. Animation & Result Display PCs">
        <SummaryKeyValue label="Animation PCs" value={`${animPcConfig.animationPcs || 0}x`} />
        <SummaryKeyValue label="RID (Result) PCs" value={`${animPcConfig.resultPcs || 0}x`} />
        <SummaryKeyValue label="Gesamtanzahl Display PCs" value={`${(animPcConfig.animationPcs || 0) + (animPcConfig.resultPcs || 0)}x`} bold />
      </SummarySection>

      <SummarySection title="3. Wheels & Live Game Server Details">
        <GenericSummaryTable headers={['Component', 'Game / Type', 'Quantity']} data={liveWheelData} emptyMessage="No FS593 Auto Wheels or FS695 Live Game Servers added." />
      </SummarySection>

      <SummarySection title="4. Flying & Remote Game Servers">
        <GenericSummaryTable headers={['Server Type', 'Configured Game', 'Quantity']} data={additionalServerData} emptyMessage="No Flying or Remote Game Servers added." />
      </SummarySection>
    </div>
  );
}

function SummarySection({ title, children }) {
  return (
    <div className="summary-section">
      <h4>{title}</h4>
      <table className="summary-table">
        <tbody>{children}</tbody>
      </table>
    </div>
  );
}

function SummaryKeyValue({ label, value, bold = false }) {
  return (
    <tr className={bold ? 'highlight' : ''}>
      <td className="label">{label}:</td>
      <td style={{ fontWeight: bold ? 'bold' : 'normal' }}>{value}</td>
    </tr>
  );
}

function GenericSummaryTable({ headers, data, emptyMessage }) {
  return (
    <table className="summary-table">
      <thead>
        <tr>
          {headers.map((h, i) => (
            <th key={i}>{h}</th>
          ))}
        </tr>
      </thead>
      <tbody>
        {data.length === 0 ? (
          <tr>
            <td colSpan={headers.length} className="text-muted text-center">
              {emptyMessage}
            </td>
          </tr>
        ) : (
          data.map((row, idx) => (
            <tr key={idx}>
              <td>{row.comp}</td>
              <td>{row.type}</td>
              <td>{row.qty}</td>
            </tr>
          ))
        )}
      </tbody>
    </table>
  );
}
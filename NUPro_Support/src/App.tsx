import React, { useState } from 'react';
import {
  FS695DatabaseServer,
  FS593AutoWheel,
  Terminal,
  StreamServer,
  AnimationPC,
  FS695LiveGameServer,
  KameraSet,
  FlyingGameServer,
  RemoteGameServerBooksize,
} from './components';

export interface ConfiguredGame {
  id: string;
  source: string;
  name: string;
  quantity: number;
}

const App = () => {
  const [allSelectedGames, setAllSelectedGames] = useState<ConfiguredGame[]>([]);

  const handleAddGame = (source: string, name: string, quantity: number = 1) => {
    if (!name) return;

    setAllSelectedGames((prevGames) => {
      const existingIndex = prevGames.findIndex(
        (g) => g.source === source && g.name === name
      );

      if (existingIndex > -1) {
        const updated = [...prevGames];
        updated[existingIndex] = {
          ...updated[existingIndex],
          quantity: updated[existingIndex].quantity + quantity,
        };
        return updated;
      }

      return [
        ...prevGames,
        {
          id: `${source}-${name}-${Date.now()}`,
          source,
          name,
          quantity,
        },
      ];
    });
  };

  const handleRemoveGame = (id: string) => {
    setAllSelectedGames((prev) => prev.filter((game) => game.id !== id));
  };

  return (
    <div className="app-container" style={{ padding: '20px', maxWidth: '900px', margin: '0 auto' }}>
      <h1>Novo Unity Pro Configurator</h1>

      {/* Server & Game Eingaben */}
      <FS593AutoWheel
        onAddGame={(gameName, qty) => handleAddGame('FS593 Auto Wheel', gameName, qty)}
      />

      <FS695LiveGameServer
        onAddGame={(gameName, qty) => handleAddGame('Live Game Server', gameName, qty)}
      />

      <FlyingGameServer
        onAddGame={(gameName, qty) => handleAddGame('Flying Game Server', gameName, qty)}
      />

      <RemoteGameServerBooksize
        onAddGame={(gameName, qty) => handleAddGame('Remote Game Server', gameName, qty)}
      />

      {/* Weitere Hardware */}
      <FS695DatabaseServer />
      <Terminal />
      <StreamServer />
      <KameraSet />

      {/* Übersicht aller aktuell hinzugefügten Spiele */}
      <div style={{ margin: '30px 0', padding: '15px', border: '1px solid #ccc', borderRadius: '8px' }}>
        <h3>Configured Games Summary</h3>
        {allSelectedGames.length === 0 ? (
          <p>No games added yet across any servers.</p>
        ) : (
          <ul>
            {allSelectedGames.map((game) => (
              <li key={game.id} style={{ marginBottom: '5px' }}>
                <strong>[{game.source}]</strong> {game.name} — Quantity: {game.quantity}x{' '}
                <button
                  onClick={() => handleRemoveGame(game.id)}
                  style={{ marginLeft: '10px', color: 'red', cursor: 'pointer' }}
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>
        )}
      </div>

      {/* Letzter Schritt: Animation PC & Result Info PC */}
      <AnimationPC allSelectedGames={allSelectedGames} />
    </div>
  );
};

export default App;
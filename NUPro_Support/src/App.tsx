import React from 'react';
import {
  FS695DatabaseServer,
  FS593AutoWheel,
  Terminal,
  StreamServer,
  AnimationPC,
  FS695LiveGameServer,
  KameraSet,
  FlyingGameServer, // Geändert
  RemoteGameServerBooksize,
} from './components';

const App = () => {
  return (
    <div>
      <h1>Novo Unity Pro Configurator</h1>

      {/* Render FS593AutoWheel */}
      <FS593AutoWheel />

      {/* Other components */}
      <FS695DatabaseServer />
      <Terminal />
      <StreamServer />
      <AnimationPC />
      <FS695LiveGameServer />
      <KameraSet />
      <FlyingGameServer /> {/* Geändert */}
      <RemoteGameServerBooksize />
    </div>
  );
};

export default App;
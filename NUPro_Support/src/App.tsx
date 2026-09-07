import React from 'react';
import {
  FS695DatabaseServer,
  FS593AutoWheel,
  Terminal,
  StreamServer,
  AnimationPC,
  FS695LiveGameServer,
  KameraSet,
  GameServerNLXBooksize,
  RemoteGameServerBooksize,
} from './components';

const App = () => {
  return (
    <div>
      <h1>Novo Unity Pro Configurator</h1>
      <FS695DatabaseServer />
      <FS593AutoWheel />
      <Terminal type="FVC28A" />
      <StreamServer />
      <AnimationPC />
      <FS695LiveGameServer />
      <KameraSet />
      <GameServerNLXBooksize />
      <RemoteGameServerBooksize />
    </div>
  );
};

export default App;
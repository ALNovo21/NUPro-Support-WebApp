// Basis-Spielenamen
export const GAME_BASE_NAMES = [
    'Roulette',
    '88 Roulette',
    'Lucky Lady\'s Roulette',
    'Blackjack',
    'Baccarat',
    'SICBO',
  ];
  
  // Touchbet Spiele (für Live Game Server)
  export const TOUCHBET_GAMES = GAME_BASE_NAMES.map(
    (name) => `Touchbet Live ${name}`
  );
  
  // Alias für Abwärtskompatibilität
  export const GAME_TYPES = TOUCHBET_GAMES;
  
  // Flying / Virtual Spiele (für Flying Game Server)
  export const FLYING_GAMES = GAME_BASE_NAMES.map(
    (name) => `Flying (Virtual) ${name}`
  );
  
  // Multi Spiele (NUR für Roulette-Varianten / FS593)
  export const MULTI_GAMES = [
    'Multi Roulette',
    'Multi 88 Roulette',
    'Multi Lucky Lady\'s Roulette',
  ];
  
  // Kombinierte Liste für Remote Game Server (Alle Varianten)
  export const ALL_REMOTE_GAMES = [
    ...TOUCHBET_GAMES,
    ...FLYING_GAMES,
    ...MULTI_GAMES,
  ];
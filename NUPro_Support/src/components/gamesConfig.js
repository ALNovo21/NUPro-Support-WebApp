export const GAME_BASE_NAMES = [
    'Roulette',
    '88 Roulette',
    'Lucky Lady\'s Roulette',
    'Blackjack',
    'Baccarat',
    'SICBO',
  ];
  
  // Für LGS:
  export const TOUCHBET_GAMES = GAME_BASE_NAMES.map(name => `Touchbet Live ${name}`);
  
  // Für Booksize:
  export const FLYING_GAMES = GAME_BASE_NAMES.map(name => `Flying (Virtual) ${name}`);
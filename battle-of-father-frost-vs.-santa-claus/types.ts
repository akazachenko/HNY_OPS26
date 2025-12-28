
export enum CharacterType {
  FATHER_FROST = 'Father Frost',
  SANTA_CLAUS = 'Santa Claus'
}

export enum GameMode {
  PVP = 'PVP',
  PVAI = 'PVAI'
}

export interface CharacterStats {
  name: CharacterType;
  hp: number;
  maxHp: number;
  snowballs: number;
  giftProgress: number;
  color: string;
  image: string;
  specialMove: string;
}

export interface BattleLog {
  turn: number;
  actor: CharacterType;
  action: string;
  narrative: string;
  damage?: number;
  isCritical?: boolean;
}

export interface GameState {
  currentTurn: number;
  activeCharacter: CharacterType;
  players: Record<CharacterType, CharacterStats>;
  battleLogs: BattleLog[];
  winner: CharacterType | null;
  isNarrating: boolean;
  gameMode: GameMode;
  userCharacter: CharacterType; // In PVAI mode, which one the human controls
}


export interface Wish {
  text: string;
  author: string;
}

export enum GameState {
  IDLE = 'IDLE',
  PULLING = 'PULLING',
  FLYING = 'FLYING',
  REVEALING = 'REVEALING',
  SHOWING_WISH = 'SHOWING_WISH'
}

export interface Position {
  x: number;
  y: number;
}

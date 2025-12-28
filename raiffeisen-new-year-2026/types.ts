
export type Page = 'home' | 'advent';

export interface Snowflake {
  x: number;
  y: number;
  radius: number;
  speed: number;
  opacity: number;
}

export interface Wish {
  id: number;
  text: string;
}

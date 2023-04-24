export interface rouletteItem {
  style: string;
}
export interface betsInfo {
  red: number;
  green: number;
  black: number;
}
export interface prizesInterface {
  id?: string;
  image: string;
  text: string;
  type: 'green' | 'red' | 'black';
  winMultiplier: number;
}


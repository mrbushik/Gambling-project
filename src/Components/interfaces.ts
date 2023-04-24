import { title } from "process";

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
  type: "green" | "red" | "black";
  winMultiplier: number;
}

export interface increaseValuesInterface {
  title: string;
  value: number;
  operationType?: string;
}

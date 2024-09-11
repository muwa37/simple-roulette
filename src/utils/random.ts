import { ItemType } from '../types/item';

export const getRandomItemFromArray = (array: ItemType[]) =>
  array[Math.floor(Math.random() * array.length)];

export const getRandomNumberInRange = (min: number, max: number) =>
  Math.floor(Math.random() * (max - min + 1)) + min;

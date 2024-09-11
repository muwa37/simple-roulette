import { Chances } from '../types/common';

export const getRandomItemFromArray = <T>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];

export const getRandomNumberInRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

export const mapChances = (chances: Chances): Chances => {
  return Object.fromEntries(
    Object.entries(chances).map(([rating], i) => [
      rating,
      Object.values(chances)
        .slice(0, i + 1)
        .reduce((prev, cur) => prev + cur),
    ])
  );
};

export const chancedRandom = (chances: Chances): number => {
  const random = Math.random() * 100;
  const [rating] = Object.entries(mapChances(chances)).find(
    ([, chance]) => random < chance
  ) || [1];
  return parseInt(rating as string);
};

export const playChances: Chances = {
  1: 50,
  2: 20,
  3: 15,
  4: 7,
  5: 4,
  6: 3,
  7: 1,
};

export const fakeChances: Chances = {
  1: 40,
  2: 25,
  3: 15,
  4: 10,
  5: 5,
  6: 3,
  7: 2,
};

import React, { useEffect, useState } from 'react';
import { ItemType } from '../../types/item';
import Item from '../Item';
import styles from './styles.module.scss';

type Chances = Record<number, number>;

interface RouletteProps {
  rouletteItems: ItemType[];
  onItemDrop: (item: ItemType) => void;
}

const playChances: Chances = {
  1: 50,
  2: 20,
  3: 15,
  4: 7,
  5: 4,
  6: 3,
  7: 1,
};

const fakeChances: Chances = {
  1: 40,
  2: 25,
  3: 15,
  4: 10,
  5: 5,
  6: 3,
  7: 2,
};

const getRandomItemFromArray = <T,>(array: T[]): T =>
  array[Math.floor(Math.random() * array.length)];

const getRandomNumberInRange = (min: number, max: number): number =>
  Math.floor(Math.random() * (max - min + 1)) + min;

const mapChances = (chances: Chances): Chances => {
  return Object.fromEntries(
    Object.entries(chances).map(([rating], i) => [
      rating,
      Object.values(chances)
        .slice(0, i + 1)
        .reduce((prev, cur) => prev + cur),
    ])
  );
};

const chancedRandom = (chances: Chances): number => {
  const random = Math.random() * 100;
  const [rating] = Object.entries(mapChances(chances)).find(
    ([, chance]) => random < chance
  ) || [1];
  return parseInt(rating as string);
};

const Roulette: React.FC<RouletteProps> = ({ rouletteItems, onItemDrop }) => {
  const [properties, setProperties] = useState<{
    result: ItemType;
    items: ItemType[];
    offset: number;
  }>();
  const [margin, setMargin] = useState(0);

  useEffect(() => {
    const getRandomItem = (chances: Chances): ItemType | undefined => {
      const rolledRarity = chancedRandom(chances);
      const rolledItems = rouletteItems.filter(
        item => item.rating === rolledRarity
      );

      return rolledItems.length > 0
        ? getRandomItemFromArray(rolledItems)
        : undefined;
    };

    const result = getRandomItem(playChances);

    const itemWidth = 150 + 10; // Ширина элемента + отступ
    const resultIndex = getRandomNumberInRange(40, 60); // Индекс элемента, на котором должна остановиться рулетка
    const innerOffset = Math.random(); // Внутренний случайный смещение для добавления вариативности

    if (result) {
      setProperties({
        result: result,
        items: [
          ...new Array(resultIndex)
            .fill(null)
            .map(
              () =>
                getRandomItem(fakeChances) || { color: 'unknown', rating: 0 }
            ),
          result,
          ...new Array(4)
            .fill(null)
            .map(
              () =>
                getRandomItem(fakeChances) || { color: 'unknown', rating: 0 }
            ),
        ],
        offset: itemWidth * (resultIndex + innerOffset) - 250,
      });

      // Прекращение рулетки и вызов функции onItemDrop через 3 секунды
      setTimeout(() => onItemDrop(result), 3000);
    }
  }, [rouletteItems, onItemDrop]);

  useEffect(() => {
    if (properties?.offset !== undefined) {
      setMargin(-properties.offset); // Применение смещения
    }
  }, [properties?.offset]);

  return (
    <div className={styles.container}>
      <div className={styles.display}>
        <div className={styles.screen} />
        <div className={styles.divider} />
        <div className={styles.roller} style={{ marginLeft: margin }}>
          {properties?.items?.map((item, i) => (
            <Item item={item} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roulette;

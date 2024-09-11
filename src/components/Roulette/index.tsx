import React, { useEffect, useState } from 'react';
import { Chances, ItemType } from '../../types/common';
import {
  chancedRandom,
  fakeChances,
  getRandomItemFromArray,
  getRandomNumberInRange,
  playChances,
} from '../../utils/random';
import Item from '../Item';
import styles from './styles.module.scss';

interface RouletteProps {
  rouletteItems: ItemType[];
  onItemDrop: (item: ItemType) => void;
  duration: number;
  isSpinning: boolean;
}

const Roulette: React.FC<RouletteProps> = ({
  rouletteItems,
  onItemDrop,
  duration,
  isSpinning,
}) => {
  const [properties, setProperties] = useState<{
    result: ItemType;
    items: ItemType[];
    offset: number;
  } | null>(null);
  const [margin, setMargin] = useState(0);

  useEffect(() => {
    if (!isSpinning) return;

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

    const itemWidth = 150 + 10;
    const resultIndex = getRandomNumberInRange(40, 60);

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
        offset: itemWidth * resultIndex - 2800,
      });

      setTimeout(() => onItemDrop(result), duration);
    }
  }, [rouletteItems, onItemDrop, duration, isSpinning]);

  useEffect(() => {
    if (properties?.offset !== undefined) {
      setMargin(-properties.offset);
    }
  }, [isSpinning, duration, properties?.offset]);

  return (
    <div className={styles.container}>
      <div className={styles.display}>
        <div className={styles.screen} />
        <div className={styles.pointer} />

        <div
          className={styles.roller}
          style={{
            marginLeft: margin,
            transition: isSpinning
              ? `margin-left ${duration}ms cubic-bezier(0.23, 0.78, 0.29, 1)`
              : 'none',
          }}
        >
          {properties?.items?.map((item, i) => (
            <Item item={item} key={i} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Roulette;

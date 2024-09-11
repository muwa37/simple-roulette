import React from 'react';
import { ItemType } from '../../types/common';
import styles from './styles.module.scss';

interface ItemProps {
  item: ItemType;
}

const Item: React.FC<ItemProps> = ({ item }) => {
  return (
    <div className={styles.container}>
      <div className={styles.item}>
        <div
          className={[styles.info, styles[`rarity-${item.color}`]].join(' ')}
        >
          <span className={styles.text}>{item.color}</span>
          <span className={styles.text}>{item.rating}</span>
        </div>
      </div>
    </div>
  );
};

export default Item;

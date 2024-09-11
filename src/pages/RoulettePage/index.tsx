import React, { useEffect, useState } from 'react';
import { getItems } from '../../api/items';
import DurationSelector from '../../components/DurationSelector';
import PopupItem from '../../components/PopupItem';
import Roulette from '../../components/Roulette';
import { ItemType } from '../../types/item';
import styles from './styles.module.scss';

const RoulettePage = () => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [duration, setDuration] = useState<number>(3000);
  const [isSpinning, setIsSpinning] = useState<boolean>(false);
  const [popupItem, setPopupItem] = useState<ItemType | null>(null);

  useEffect(() => {
    const fetchItems = async () => {
      const items = await getItems();
      setItems(items);
    };

    fetchItems();
  }, []);

  const handleDrop = (item: ItemType) => {
    setPopupItem(item);
    setIsSpinning(false);
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDuration(parseInt(e.target.value, 10));
  };

  const handleSpinClick = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), duration);
  };

  const handleContinueRoll = () => {
    setIsSpinning(false);
    setPopupItem(null);
  };

  return (
    <div className={styles.container}>
      <h1>Simple Roulette</h1>
      <DurationSelector
        duration={duration}
        onDurationChange={handleDurationChange}
      />
      <button onClick={handleSpinClick}>Spin</button>
      <Roulette
        rouletteItems={items}
        onItemDrop={handleDrop}
        duration={duration}
        isSpinning={isSpinning}
      />
      {popupItem && (
        <PopupItem item={popupItem} onContinue={handleContinueRoll} />
      )}
    </div>
  );
};

export default RoulettePage;

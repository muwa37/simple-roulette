import React, { useEffect, useState } from 'react';
import { getItems } from '../api/items';
import PopupItem from '../components/PopupItem';
import Roulette from '../components/Roulette';
import { ItemType } from '../types/item';

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
  };

  const handleDurationChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setDuration(parseInt(e.target.value, 10));
  };

  const handleSpinClick = () => {
    setIsSpinning(true);
    setTimeout(() => setIsSpinning(false), duration);
  };

  const handleContinueRoll = () => {
    setPopupItem(null);
  };

  return (
    <div>
      <h1>Simple Roulette</h1>
      <label htmlFor='duration'>Spin Duration:</label>
      <select id='duration' onChange={handleDurationChange} value={duration}>
        <option value={2000}>2 sec</option>
        <option value={3000}>3 sec</option>
        <option value={4000}>4 sec</option>
        <option value={5000}>5 sec</option>
      </select>
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

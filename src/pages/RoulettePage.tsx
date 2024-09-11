import { useEffect, useState } from 'react';
import { getItems } from '../api/items';
import PopupItem from '../components/PopupItem';
import Roulette from '../components/Roulette';
import { ItemType } from '../types/item';

const RoulettePage = () => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [popupItem, setPopupItem] = useState<ItemType | null>(null);
  const [isRouletteRunning, setIsRouletteRunning] = useState(false); // Новое состояние для запуска рулетки

  useEffect(() => {
    const items = getItems();
    setItems(items);
  }, []);

  // Функция для обработки нажатия на кнопку
  const handleStartRoulette = () => {
    setIsRouletteRunning(true); // Запуск рулетки
  };

  const handleItemDrop = (item: ItemType) => {
    setPopupItem(item);
    setIsRouletteRunning(false);
  };

  const handleContinueRoll = () => {
    setPopupItem(null);
  };

  return (
    <div>
      <h1>Simple Roulette</h1>
      {isRouletteRunning && (
        <Roulette rouletteItems={items} onItemDrop={handleItemDrop} />
      )}
      <button onClick={handleStartRoulette} disabled={isRouletteRunning}>
        start roulette
      </button>

      {popupItem && (
        <PopupItem item={popupItem} onContinue={handleContinueRoll} />
      )}
    </div>
  );
};

export default RoulettePage;

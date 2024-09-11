import { useEffect, useState } from 'react';
import { getItems } from '../api/items';
import { ItemType } from '../types/item';

export const useRoulette = (initialDuration: number) => {
  const [items, setItems] = useState<ItemType[]>([]);
  const [duration, setDuration] = useState<number>(initialDuration);
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
  };

  const handleContinueRoll = () => {
    setIsSpinning(false);
    setPopupItem(null);
  };

  return {
    items,
    duration,
    isSpinning,
    popupItem,
    handleDrop,
    handleDurationChange,
    handleSpinClick,
    handleContinueRoll,
  };
};

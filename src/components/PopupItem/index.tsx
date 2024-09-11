import { ItemType } from '../../types/item';
import styles from './styles.module.scss';
interface PopupProps {
  item: ItemType;
  onContinue: () => void;
}
const PopupItem = ({ item, onContinue }: PopupProps) => {
  return (
    <div className={styles.popup}>
      <div className={styles.container} onClick={e => e.stopPropagation()}>
        <div
          className={[styles.preview, styles[`rarity-${item.color}`]].join(' ')}
        >
          <span>{item.rating}</span>
        </div>
        <div className={styles.action}>
          <span>u got new item!</span>
          <button onClick={onContinue}>continue</button>
        </div>
      </div>
    </div>
  );
};

export default PopupItem;

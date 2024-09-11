import DurationSelector from '../../components/DurationSelector';
import PopupItem from '../../components/PopupItem';
import Roulette from '../../components/Roulette';
import { useRoulette } from '../../hooks/useRoulette';
import styles from './styles.module.scss';

const RoulettePage = () => {
  const {
    items,
    duration,
    isSpinning,
    popupItem,
    handleDrop,
    handleDurationChange,
    handleSpinClick,
    handleContinueRoll,
  } = useRoulette(3000);

  return (
    <div className={styles.container}>
      <h1>Simple Roulette</h1>

      <DurationSelector
        duration={duration}
        onDurationChange={handleDurationChange}
      />

      <button disabled={isSpinning} onClick={handleSpinClick}>
        Spin
      </button>

      {isSpinning && (
        <Roulette
          rouletteItems={items}
          onItemDrop={handleDrop}
          duration={duration}
          isSpinning={isSpinning}
        />
      )}

      {popupItem && (
        <PopupItem item={popupItem} onContinue={handleContinueRoll} />
      )}
    </div>
  );
};

export default RoulettePage;

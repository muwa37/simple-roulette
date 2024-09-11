import React from 'react';
import styles from './styles.module.scss';

interface DurationSelectorProps {
  duration: number;
  onDurationChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

const DurationSelector: React.FC<DurationSelectorProps> = ({
  duration,
  onDurationChange,
}) => {
  return (
    <div className={styles.container}>
      <label htmlFor='duration'>Spin Duration:</label>
      <select id='duration' onChange={onDurationChange} value={duration}>
        <option value={2000}>2 sec</option>
        <option value={3000}>3 sec</option>
        <option value={4000}>4 sec</option>
        <option value={5000}>5 sec</option>
      </select>
    </div>
  );
};

export default DurationSelector;

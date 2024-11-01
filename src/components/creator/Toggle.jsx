import React, { useState } from 'react';
import styles from '../../styles/creator/Toggle.module.css';

const Toggle = ({ label, options, initialValues, onChange }) => {
  const [currentValue, setCurrentValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);

  const handleSelectChange = (value) => {
    setCurrentValue(value);
    if (onChange) {
      onChange({ target: { value } });
      setIsOpen(false);
    }
  };

  const handleLabelClick = () => {
    setIsOpen((prev) => !prev);
  };

  return (
    <div className={styles.toggleContainer}>
      <label
        className={`${styles.label} ${currentValue ? styles.selected : ''}`}
        onClick={handleLabelClick}
      >
        {currentValue || label}
      </label>
      {isOpen && (
        <div className={styles.dropdown}>
          {options.map((option, index) => (
            <div
              key={index}
              className={styles.dropdownItem}
              onClick={() => handleSelectChange(option.value)}
            >
              {option.label}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Toggle;

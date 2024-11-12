import React, { useState, useRef, useEffect } from 'react';
import styles from '../../styles/creator/Toggle2.module.css';

const Toggle = ({ label, options, initialValues, onChange }) => {
  const [currentValue, setCurrentValue] = useState('');
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef(null);

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

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (toggleRef.current && !toggleRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener('click', handleClickOutside);

    return () => {
      document.removeEventListener('click', handleClickOutside);
    };
  }, []);

  return (
    <div className={styles.toggleContainer} ref={toggleRef}>
      <label
        className={`${styles.label} ${currentValue ? styles.selected : ''}`}
        onClick={handleLabelClick}
      >
        {currentValue || label}
      </label>
      <div className={`${styles.dropdown} ${isOpen ? styles.open : ''}`}>
        {isOpen &&
          options.map((option, index) => (
            <div
              key={index}
              className={styles.dropdownItem}
              onClick={() => handleSelectChange(option.value)}
            >
              {option.label}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Toggle;

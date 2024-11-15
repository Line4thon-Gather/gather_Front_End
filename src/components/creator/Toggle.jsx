import React, { useState, useRef, useEffect } from 'react';
import styles from '../../styles/creator/Toggle.module.css';

const Toggle = ({ label, options, initialValues, onChange }) => {
  const [currentLabel, setCurrentLabel] = useState(''); // 현재 선택된 label 관리
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef(null);

  const handleSelectChange = (selectedOption) => {
    setCurrentLabel(selectedOption.label); // 선택된 label 설정
    if (onChange) {
      onChange({ target: { value: selectedOption.value } }); // value 전달
    }
    setIsOpen(false);
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
        className={`${styles.label} ${currentLabel ? styles.selected : ''}`}
        onClick={handleLabelClick}
      >
        {currentLabel || label} {/* 선택된 label 표시 */}
      </label>
      <div className={`${styles.dropdown} ${isOpen ? styles.open : ''}`}>
        {isOpen &&
          options.map((option, index) => (
            <div
              key={index}
              className={styles.dropdownItem}
              onClick={() => handleSelectChange(option)}
            >
              {option.label}
            </div>
          ))}
      </div>
    </div>
  );
};

export default Toggle;

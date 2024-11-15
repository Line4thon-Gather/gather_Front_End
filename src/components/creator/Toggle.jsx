import { useState, useRef, useEffect } from 'react';
import styles from '../../styles/creator/Toggle.module.css';

const Toggle = ({
  label,
  options,
  currentLabel, // currentLabel은 value에 해당
  setCurrentLabel,
  onChange,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleRef = useRef(null);

  // currentLabel(value)에 해당하는 label을 찾는 함수
  const getCurrentOptionLabel = () => {
    const matchedOption = options.find(
      (option) => option.value === currentLabel
    );
    return matchedOption ? matchedOption.label : label; // 매칭된 label 또는 기본 label 반환
  };

  const handleSelectChange = (selectedOption) => {
    setCurrentLabel(selectedOption.value); // 선택된 value 설정
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
        {getCurrentOptionLabel()}{' '}
        {/* currentLabel(value)에 해당하는 label 표시 */}
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

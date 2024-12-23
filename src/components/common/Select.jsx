import { useState } from 'react';
import dropdown from '../../assets/images/dropdown.png';
import Dropdown from './Dropdown';
import styles from '../../styles/common/Select.module.css';
import PropTypes from 'prop-types';
import { useStore } from '../../store/useStore';
import { useEffect } from 'react';

export default function Select({ placeholder, list, number }) {
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectContent, setSelectContent] = useState('선택');
  const [firstClick, setFirstClick] = useState(false);
  const { selectedDropdown, setSelectedDropdown } = useStore();

  useEffect(() => {
    if (number !== selectedDropdown) setShowDropdown(false);
  }, [selectedDropdown, number]);

  const handleSelectClick = () => {
    number !== null && setSelectedDropdown(number);
    setShowDropdown((state) => !state);
    setFirstClick(true);
  };

  return (
    <div
      className={`${styles.selectWrapper} ${
        selectContent !== '선택' && styles.full
      }`}
      onClick={handleSelectClick}
    >
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          width: '100%',
          height: '100%',
        }}
      >
        <input placeholder={placeholder} value={selectContent} readOnly />
        <img
          className={`${styles.dropdownBtn} ${
            showDropdown
              ? styles.rotate
              : firstClick
              ? styles.reverseRotate
              : ''
          }`}
          src={dropdown}
        />
      </div>
      {showDropdown && (
        <Dropdown
          setSelected={setSelectContent}
          setShow={setShowDropdown}
          list={list}
          number={number}
        />
      )}
    </div>
  );
}

Select.propTypes = {
  placeholder: PropTypes.string,
  list: PropTypes.array,
  number: PropTypes.number,
};

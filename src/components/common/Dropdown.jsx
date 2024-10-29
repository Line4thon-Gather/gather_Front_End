import PropTypes from 'prop-types';
import styles from '../../styles/common/Dropdown.module.css';

export default function Dropdown({ list, setSelected, setShow }) {
  return (
    <div className={styles.dropdownWrapper}>
      {list.length > 0 &&
        list.map((item, index) => (
          <div
            className={styles.menu}
            key={index}
            onMouseDown={() => {
              setSelected(item);
              setShow(false);
            }}
          >
            <span>{item}</span>
          </div>
        ))}
    </div>
  );
}

Dropdown.propTypes = {
  list: PropTypes.array,
  setSelected: PropTypes.func,
  setShow: PropTypes.func,
};

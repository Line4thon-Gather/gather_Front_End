import PropTypes from 'prop-types';
import styles from '../../styles/creator/CreatorRegistration.module.css';

const CategorySelect = ({
  label,
  category,
  setCategory,
  dropdownList,
  maxLength,
}) => {
  return (
    <div className={styles.inputcontainer}>
      <h3>{label}</h3>
      <select
        className={styles.input}
        value={category}
        onChange={(e) => {
          const selectedValue = e.target.value;
          if (maxLength && selectedValue.length > maxLength) {
            return;
          }
          setCategory(selectedValue);
        }}
      >
        {dropdownList.map((item, index) => (
          <option key={index} value={item}>
            {item}
          </option>
        ))}
      </select>
    </div>
  );
};

CategorySelect.propTypes = {
  label: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
  setCategory: PropTypes.func.isRequired,
  dropdownList: PropTypes.arrayOf(PropTypes.string).isRequired,
  maxLength: PropTypes.number,
};

export default CategorySelect;

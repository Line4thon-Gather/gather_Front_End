import PropTypes from 'prop-types';
import styles from '../../styles/creator/CreatorRegistration.module.css';
import { useState } from 'react';

const InputTextField = ({
  label,
  value,
  setValue,
  placeholder,
  maxLength,
  maxWidth,
  rows = 3,
}) => {
  const [hasContent, setHasContent] = useState(false);

  const checkContent = (e) => {
    const newValue = e.target.value;
    setHasContent(newValue !== '');
    setValue(newValue);
  };

  return (
    <div className={styles.inputcontainer} style={{ maxWidth }}>
      <h3 className={styles.label}>{label}</h3>
      <textarea
        className={styles.input}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={checkContent}
        rows={rows}
        aria-label={label}
      />
    </div>
  );
};

InputTextField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  maxWidth: PropTypes.string,
  rows: PropTypes.number,
};

export default InputTextField;

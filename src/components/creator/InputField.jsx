import PropTypes from 'prop-types';
import styles from '../../styles/creator/CreatorRegistration.module.css';
import { useState } from 'react';

const InputField = ({
  label,
  value,
  setValue,
  placeholder,
  maxLength,
  maxWidth,
}) => {
  const [hasContent, setHasContent] = useState(false);

  const checkContent = (e) => {
    const newValue = e.target.value;
    setHasContent(newValue !== '');
    setValue(newValue);
  };

  return (
    <div className={styles.inputcontainer} style={{ maxWidth }}>
      <h3>{label}</h3>
      <input
        type="text"
        className={styles.input}
        placeholder={placeholder}
        maxLength={maxLength}
        value={value}
        onChange={checkContent}
      />
    </div>
  );
};

InputField.propTypes = {
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
  setValue: PropTypes.func.isRequired,
  placeholder: PropTypes.string.isRequired,
  maxLength: PropTypes.number,
  maxWidth: PropTypes.string,
};

export default InputField;

import PropTypes from 'prop-types';
import styles from '../../styles/common/Input.module.css';
import { useState } from 'react';

export default function Input({
  width,
  fontSize,
  placeholder,
  refer,
  onChange,
}) {
  const [hasContent, setHasContent] = useState(false);

  const checkContent = () => {
    if (refer.current.value !== '') setHasContent(true);
    else setHasContent(false);
  };

  return (
    <input
      className={styles.input}
      placeholder={placeholder}
      style={{
        width,
        fontSize,
        borderColor: hasContent ? 'var(--primary)' : 'var(--grayscale-400)',
      }}
      onChange={() => {
        checkContent();
        onChange();
      }}
      ref={refer}
    />
  );
}

Input.propTypes = {
  width: PropTypes.string,
  fontSize: PropTypes.number,
  placeholder: PropTypes.string,
  isFailed: PropTypes.bool,
  refer: PropTypes.object,
  onChange: PropTypes.func,
};

import PropTypes from 'prop-types';
import styles from '../../styles/common/Input.module.css';
import { useState } from 'react';

export default function Input({
  width,
  fontSize,
  placeholder,
  isFailed,
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
        borderColor: hasContent
          ? isFailed
            ? '#FF4646'
            : 'var(--primary)'
          : isFailed
          ? '#FF4646'
          : 'var(--grayscale-400)',
        outlineColor: isFailed && !hasContent && '#FF4646',
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

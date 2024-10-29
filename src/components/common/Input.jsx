import PropTypes from 'prop-types';
import styles from '../../styles/common/Input.module.css';
import { useRef } from 'react';
import { useState } from 'react';

export default function Input({ width, fontSize, placeholder, isFailed }) {
  const ref = useRef();
  const [hasContent, setHasContent] = useState(false);

  const checkContent = () => {
    if (ref.current.value !== '') setHasContent(true);
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
            ? '##FF4646'
            : 'var(--primary)'
          : isFailed
          ? '##FF4646'
          : 'var(--grayscale-400)',
      }}
      onChange={checkContent}
      ref={ref}
    />
  );
}

Input.propTypes = {
  width: PropTypes.string,
  fontSize: PropTypes.number,
  placeholder: PropTypes.string,
  isFailed: PropTypes.bool,
};

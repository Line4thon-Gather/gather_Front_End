import React from 'react';
import styles from '../../styles/login/InputDiv.module.css';

const InputDiv = ({ label, placeholder, width = '100%', onChange }) => {
  return (
    <div className={styles.inputContainer}>
      <label className={styles.label}>{label}</label>
      <input
        className={styles.input}
        type="text"
        placeholder={placeholder}
        style={{ width }}
        onChange={onChange}
      />
    </div>
  );
};

export default InputDiv;

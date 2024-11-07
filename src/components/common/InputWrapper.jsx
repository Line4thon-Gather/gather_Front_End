import styles from '../../styles/strategy/InputWrapper.module.css';
import Input from './Input';
import PropTypes from 'prop-types';
import Select from './Select';

export default function InputWrapper({
  spanPosition,
  span,
  label,
  width,
  placeholder,
  list,
  number,
  refer,
  onChange,
}) {
  return (
    <div className={styles.inputWrapper}>
      <div className={styles.inputAndLabel}>
        <label>{label}</label>
        <div className={styles.selectWrapper} style={{ width }}>
          {spanPosition === 'front' && <span>{span}</span>}
          {list ? (
            <Select placeholder={placeholder} list={list} number={number} />
          ) : (
            <Input
              refer={refer}
              width={span ? '80%' : '100%'}
              fontSize={16}
              placeholder={placeholder}
              onChange={onChange}
            />
          )}
          {spanPosition === 'back' && <span>{span}</span>}
        </div>
      </div>
    </div>
  );
}

InputWrapper.propTypes = {
  spanPosition: PropTypes.string,
  span: PropTypes.string,
  label: PropTypes.string,
  width: PropTypes.string,
  placeholder: PropTypes.string,
  list: PropTypes.array,
  number: PropTypes.number,
  refer: PropTypes.object,
  onChange: PropTypes.func,
};

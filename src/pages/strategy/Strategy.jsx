import styles from '../../styles/strategy/Strategy.module.css';
import strategyLogo from '../../assets/images/strategyLogo.png';
import FormWrapper from '../../components/strategy/FormWrapper';

export default function Strategy() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.logoWrapper}>
        <img src={strategyLogo} />
      </div>
      <FormWrapper />
    </div>
  );
}

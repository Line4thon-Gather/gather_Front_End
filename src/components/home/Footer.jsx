import styles from '../../styles/home/Footer.module.css';
import footerLogo from '../../assets/images/footerLogo.png';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.footerContent}>
        <img src={footerLogo} />
        <span>@line4thon. All rights Reserved.</span>
        <span>멋쟁이 사자처럼 4호선톤 숙스러운 서성한팀</span>
      </div>
    </footer>
  );
}

import styles from '../../styles/home/NavBar.module.css';
import logo from '../../assets/images/logo.png';
import { Link } from 'react-router-dom';

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <img src={logo} loading="lazy" />
      <span>지금 당장 아이디어를</span>
      <div>
        <span>실현</span>
        <span>하고 싶다면?</span>
      </div>
      <div className={styles.btnWrapper}>
        <Link to="creator">크리에이터 만나러가기</Link>
        <Link to="strategy">홍보 전략 제안받기</Link>
      </div>
    </nav>
  );
}

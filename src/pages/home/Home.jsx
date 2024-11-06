import styles from '../../styles/home/Home.module.css';
import HeaderInfo from '../../components/home/HeaderInfo';
import BodyInfo from '../../components/home/BodyInfo';
import NavBar from '../../components/home/NavBar';
import Footer from '../../components/home/Footer';

export default function Home() {
  return (
    <div className={styles.pageWrapper}>
      <div className={styles.header} />
      <HeaderInfo />
      <BodyInfo />
      <NavBar />
      <Footer />
    </div>
  );
}

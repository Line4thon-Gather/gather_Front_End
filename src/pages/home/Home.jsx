import styles from '../../styles/home/Home.module.css';
import HeaderInfo from '../../components/home/HeaderInfo';
import BodyInfo from '../../components/home/BodyInfo';
import NavBar from '../../components/home/NavBar';
import Footer from '../../components/home/Footer';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const navigate = useNavigate();

  const token = localStorage.getItem('token');
  useEffect(() => {
    !token && navigate('/login');
  }, [token, navigate]);

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

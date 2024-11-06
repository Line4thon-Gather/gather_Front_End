import React from 'react';
import { useNavigate } from 'react-router-dom';
import styles from '../../styles/login/LoginFinish.module.css';
import image from '../../assets/images/ModalImage.png';
import NextButton from '../../components/login/NextButton';

const LoginFinish = () => {
  const navigate = useNavigate();

  const handleHomeRedirect = () => {
    navigate('/home');
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>인증이 완료되었습니다!</h2>
      <p className={styles.description}>활발한 활동을 부탁드려요!</p>
      <img className={styles.image} src={image} alt="대표 이미지" />
      <button className={styles.homeBtn} onClick={handleHomeRedirect}>
        홈으로 이동하기
      </button>
    </div>
  );
};

export default LoginFinish;

import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from '../../styles/login/LoginFinish.module.css';
import image from '../../assets/images/ModalImage.png';
import NextButton from '../../components/login/NextButton';

const LoginFinish = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      axios
        .get('https://backend.to-gather.info/api/user/header-info', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: token,
          },
        })
        .then((response) => {
          if (response.data.isSuccess === true) {
            const { profileImgUrl, name } = response.data.data;
            localStorage.setItem('profileImgUrl', profileImgUrl);
            localStorage.setItem('userName', name);
          }
        })
        .catch((error) => {
          console.error('사용자 정보 요청 오류:', error);
        });
    }
  }, []);

  const handleHomeRedirect = () => {
    localStorage.setItem('isRegistered', 'true');
    navigate('/');
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

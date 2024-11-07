import React, { useEffect } from 'react';
import styles from '../../styles/login/Login.module.css';
import image from '../../assets/images/ModalImage.png';
import google from '../../assets/images/google_button.png';

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loginBox}>
        <img className={styles.image} src={image} alt="대표 이미지" />
        <h2 className={styles.title}>로그인 하기</h2>
        <p className={styles.description}>
          지금 로그인하고 상상만 하던 아이디어를 현실로 실현해보세요! <br />
          한정된 자금 안에서 최대한의 부가가치를 창출할 수 있어요!
        </p>

        {/* Google 소셜 로그인 링크 */}
        <a href="https://backend.to-gather.info/oauth2/authorization/google">
          <img className={styles.googleButton} src={google} alt="Google Icon" />
        </a>
      </div>
    </div>
  );
};

export default Login;

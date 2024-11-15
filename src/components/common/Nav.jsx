import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate, useLocation } from 'react-router-dom';
import styles from '../../styles/common/Nav.module.css';
import Image from '../../assets/images/NavImage.png';
import basicImg from '../../assets/images/basicprofile.png';

const Nav = () => {
  const navigate = useNavigate();
  const location = useLocation(); // 현재 경로 정보를 가져오는 훅
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [userName, setUserName] = useState('사용자 이름');
  const [userProfileImage, setUserProfileImage] = useState(basicImg);

  const updateUserInfo = () => {
    const token = localStorage.getItem('token');
    const storedUserName = localStorage.getItem('userName') || '사용자 이름';
    const storedUserProfileImage =
      localStorage.getItem('profileImgUrl') || basicImg;

    if (token) {
      setIsLoggedIn(true);
      setUserName(storedUserName);
      setUserProfileImage(storedUserProfileImage);
    } else {
      setIsLoggedIn(false);
    }
  };

  useEffect(() => {
    updateUserInfo(); // 처음 렌더링 시 정보 업데이트
  }, []);

  useEffect(() => {
    updateUserInfo(); // 경로 변경 시 정보 업데이트
  }, [location]); // location이 변경될 때 실행

  const handleUserNameClick = () => {
    navigate('/mypage');
  };

  return (
    <nav className={styles.navBar}>
      <ul className={styles.navItems}>
        <NavLink to="/" className={styles.logoLink}>
          <img src={Image} alt="로고" className={styles.logoImage} />
        </NavLink>

        <li className={styles.navItem}>
          <NavLink
            to="/strategy"
            className={({ isActive }) =>
              isActive ? styles.activeStyle : styles.basicStyle
            }
          >
            홍보 전략
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink
            to="/creator"
            className={({ isActive }) =>
              isActive ? styles.activeStyle : styles.basicStyle
            }
          >
            크리에이터 찾기
          </NavLink>
        </li>
        <li className={styles.navItem}>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive ? styles.activeStyle : styles.basicStyle
            }
          >
            크리에이터 등록
          </NavLink>
        </li>
        {isLoggedIn ? (
          <div className={styles.userInfo} onClick={handleUserNameClick}>
            <img
              src={userProfileImage}
              alt="프로필 이미지"
              className={styles.profileImage}
            />
            <span className={styles.userName}>{userName}</span>
          </div>
        ) : (
          <li className={styles.loginBtn}>
            <NavLink
              to="/login"
              className={({ isActive }) =>
                isActive ? styles.activeStyle : styles.basicStyle
              }
            >
              로그인
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Nav;

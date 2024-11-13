import React from 'react';
import { NavLink } from 'react-router-dom';
import styles from '../../styles/common/Nav.module.css';
import Image from '../../assets/images/NavImage.png';
import basicImg from '../../assets/images/basicprofile.png';

const Nav = () => {
  const token = localStorage.getItem('token');
  const isLoggedIn = token !== null;
  const userName = '사용자 이름';
  const userProfileImage = basicImg;

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
          <div className={styles.userInfo}>
            <img
              src={userProfileImage}
              alt="프로필 이미지"
              className={styles.profileImage}
            />
            <span>{userName}</span>
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

import React from 'react';
import styled from 'styled-components';
import Image from '../../assets/images/NavImage.png';
import basicImg from '../../assets/images/basicprofile.png';
import { Link, NavLink } from 'react-router-dom';

const NavBar = styled.nav`
  display: flex;
  width: 100%;
  height: 60px;
  align-items: center;
  padding: 0 20px;
  background-color: #27282d;
  margin-bottom: 80px;
`;

const LogoLink = styled(NavLink)`
  display: inline-block;
  margin-right: 100px;
`;

const LogoImage = styled.img`
  width: 147px; /* 이미지 너비 */
  height: 33.266px; /* 이미지 높이 */
`;

const NavItems = styled.ul`
  list-style: none;
  display: flex;
  gap: 60px;
  padding: 0;
  justify-content: center;
  align-items: center;
  margin-left: 400px;
`;

const NavItem = styled.li`
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  padding: 0px 16px;
`;

const LoginBtn = styled.li`
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  padding: 0px 16px;
  margin-left: 130px;
`;

const UserInfo = styled.div`
  display: flex;
  align-items: center;
  gap: 15px;
  margin-left: 130px;
  color: #fff;
`;

const ProfileImage = styled.img`
  width: 30px;
  height: 30px;
  border-radius: 50%;
`;

const activeStyle = {
  color: '#4E96FF', // 활성화된 링크의 색상
};

const LinkStyle = {
  color: '#fff', // 기본 글자색을 하얀색으로 설정
  textDecoration: 'none', // 기본 하이퍼링크 스타일(밑줄)을 없앰
};

const Nav = () => {
  const token = localStorage.getItem('token');
  const isLoggedIn = token !== null;
  const userName = '사용자 이름';
  const userProfileImage = basicImg;

  return (
    <NavBar>
      <NavItems>
        {/* 로고를 클릭하면 루트 페이지로 이동 */}
        <LogoLink to="/">
          <LogoImage src={Image} alt="로고" />
        </LogoLink>

        <NavItem>
          <NavLink
            to="/strategy"
            style={({ isActive }) =>
              isActive ? { ...activeStyle, ...LinkStyle } : LinkStyle
            }
          >
            홍보 전략
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/creator"
            style={({ isActive }) =>
              isActive ? { ...activeStyle, ...LinkStyle } : LinkStyle
            }
          >
            크리에이터 찾기
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/register"
            style={({ isActive }) =>
              isActive ? { ...activeStyle, ...LinkStyle } : LinkStyle
            }
          >
            크리에이터 등록
          </NavLink>
        </NavItem>
        {isLoggedIn ? (
          <UserInfo>
            <ProfileImage src={userProfileImage} alt="프로필 이미지" />
            <span>{userName}</span>
          </UserInfo>
        ) : (
          <LoginBtn>
            <NavLink
              to="/login"
              style={({ isActive }) =>
                isActive ? { ...activeStyle, ...LinkStyle } : LinkStyle
              }
            >
              로그인
            </NavLink>
          </LoginBtn>
        )}
      </NavItems>
    </NavBar>
  );
};

export default Nav;

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
`;

const LogoLink = styled(NavLink)`
  display: inline-block;
  margin-right: 100px;
`;

const LogoImage = styled.img`
  width: 147px;
  height: 33.266px;
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
  color: '#4E96FF',
  textDecoration: 'none',
};

const basicStyle = {
  color: '#fff',
  textDecoration: 'none',
};

const Nav = () => {
  const token = localStorage.getItem('token');
  const isLoggedIn = token !== null;
  const userName = '사용자 이름';
  const userProfileImage = basicImg;

  return (
    <NavBar>
      <NavItems>
        <LogoLink to="/">
          <LogoImage src={Image} alt="로고" />
        </LogoLink>

        <NavItem>
          <NavLink
            to="/strategy"
            style={({ isActive }) => (isActive ? activeStyle : basicStyle)}
          >
            홍보 전략
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/creator"
            style={({ isActive }) => (isActive ? activeStyle : basicStyle)}
          >
            크리에이터 찾기
          </NavLink>
        </NavItem>
        <NavItem>
          <NavLink
            to="/register"
            style={({ isActive }) => (isActive ? activeStyle : basicStyle)}
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
              style={({ isActive }) => (isActive ? activeStyle : basicStyle)}
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

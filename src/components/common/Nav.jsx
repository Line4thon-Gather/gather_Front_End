import React from 'react';
import styled from 'styled-components';
import Image from '../../assets/images/NavImage.png';

const NavBar = styled.nav`
  display: flex;

  height: 60px;
  align-items: center;
  padding: 5px 370px;
  background-color: #27282d;
  padding: 10px 20px;
  margin-bottom: 80px;
`;

const Logo = styled.img`
  width: 147px;
  height: 33.266px;
  margin-right: 70px;
`;

const NavItems = styled.ul`
  list-style: none;
  display: flex;
  gap: 16px;
  display: flex;
  padding: 30px;
  justify-content: center;
  align-items: center;
`;

const NavItem = styled.li`
  cursor: pointer;
  color: #fff;
  font-weight: bold;
  padding: 0px 16px;
`;

const Nav = () => {
  return (
    <NavBar>
      <Logo src={Image} alt="로고" />
      <NavItems>
        <NavItem>홍보 전략</NavItem>
        <NavItem>크리에이터 찾기</NavItem>
        <NavItem>크리에이터 등록</NavItem>
      </NavItems>
    </NavBar>
  );
};

export default Nav;

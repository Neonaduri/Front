import React from "react";
import styled from "styled-components";
import { useHistory, useLocation } from "react-router";
import home from "../../static/images/icon/home.png";
import myPage from "../../static/images/icon/mypage.png";
import searchIcon from "../../static/images/icon/searchIcon.png";
import plan from "../../static/images/icon/plan.png";
import beforeHome from "../../static/images/icon/beforeHome.png";
import activeSearch from "../../static/images/icon/activeSearch.png";
import activePlan from "../../static/images/icon/activePlan.png";
import activeMypage from "../../static/images/icon/activeMypage.png";

const Footer = (props) => {
  const history = useHistory();
  const location = useLocation();

  const getSrc = (path, defaultSrc, activeSrc) => {
    if (path === location.pathname) {
      return activeSrc;
    }
    return defaultSrc;
  };

  const navData = [
    {
      path: "/",
      defaultSrc: beforeHome,
      activeSrc: home,
    },
    {
      path: "/search",
      defaultSrc: searchIcon,
      activeSrc: activeSearch,
    },
    {
      path: "/myplan",
      defaultSrc: plan,
      activeSrc: activePlan,
    },
    {
      path: "/mypage",
      defaultSrc: myPage,
      activeSrc: activeMypage,
    },
  ];

  return (
    <>
      <NavWrapper>
        <Container>
          {navData.map(({ path, defaultSrc, activeSrc }, idx) => (
            <NavItem
              key={idx}
              onClick={() => {
                history.push(path);
              }}
            >
              <Logo src={getSrc(path, defaultSrc, activeSrc)} />
            </NavItem>
          ))}
          <Bar></Bar>
        </Container>
      </NavWrapper>
    </>
  );
};

export default Footer;

const NavWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  width: 100%;
  background-color: white;
`;

const NavItem = styled.button`
  background-color: #fff;
  border: none;
  outline: none;
`;

const Bar = styled.div`
  position: absolute;
  width: 130px;
  height: 5px;
  left: 123px;
  top: 598px;
  background: #000000;
  border-radius: 50px;
`;

const Container = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 15px 30px;
`;

const Logo = styled.img`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  width: 50px;
`;

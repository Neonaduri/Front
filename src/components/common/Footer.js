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
import { keywordDB } from "../../redux/module/post";
import { useDispatch } from "react-redux";

const Footer = (props) => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();

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
      path: "/recommand",
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
    <NavWrapper>
      <Container>
        {navData.map(({ path, defaultSrc, activeSrc }, idx) => (
          <NavItem
            key={idx}
            onClick={() => {
              dispatch(keywordDB(null));
              history.push(path);
            }}
          >
            <Logo src={getSrc(path, defaultSrc, activeSrc)} alt="button" />
          </NavItem>
        ))}
      </Container>
    </NavWrapper>
  );
};

export default Footer;

const NavWrapper = styled.footer`
  position: fixed;
  bottom: 0;
  /* mobile viewport bug fix */
  height: -webkit-fill-available;
  overflow: hidden;
  bottom: 0;
  width: 100%;
  height: calc(var(--vh, 1vh) * 8);
  background-color: white;
  z-index: 9999;
  border-top: 2px solid ${({ theme }) => theme.colors.borderColor};
  margin: 0;
  text-align: center;
`;

const NavItem = styled.button`
  background-color: #fff;
  border: none;
  outline: none;
`;

const Container = styled.div`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  padding: 5px 30px;
  height: -webkit-fill-available;
  min-height: -webkit-fill-available;
`;

const Logo = styled.img`
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  width: 50px;
`;

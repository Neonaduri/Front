import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router";
import { cleanDetailPlan } from "../redux/module/plan";
import styled from "styled-components";
import Footer from "../components/common/Footer";
import Titleline from "../components/elements/Titleline";
import Search from "./Search";

const ThemeSearch = (props) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const keyWord = useSelector((state) => state.post.keyword);
  useEffect(() => {
    dispatch(cleanDetailPlan());
  }, []);

  return (
    <Container>
      <Headerdiv>
        <Titleline
          title={keyWord}
          onClick={() => {
            history.push("/");
          }}
        />
      </Headerdiv>
      <Wrap>
        <Search />
      </Wrap>
      <Footer />
    </Container>
  );
};

export default ThemeSearch;

const Headerdiv = styled.div`
  height: 6%;
`;

const Wrap = styled.div`
  height: 88%;
`;

const Container = styled.div`
  height: 100%;
`;

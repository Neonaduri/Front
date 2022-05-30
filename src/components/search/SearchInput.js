import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { getKeywordPostDB, keywordDB } from "../../redux/module/post";
import ModalfixTime from "../common/ModalfixTime";
import back from "../../static/images/icon/back.png";
import search from "../../static/images/icon/search.png";

const SearchInput = ({ sortby = "postId" }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [modalOpen, setModalOpen] = useState(false);

  const closeModal = () => {
    setModalOpen(false);
  };

  const checkSpecial = (str) => {
    const regExp = /[!?@#$%^&*():;+-=~{}<>\_\[\]\|\\\"\'\,\.\/\`\₩]/g;
    if (regExp.test(str)) {
      return true;
    } else {
      return false;
    }
  };

  const searchEnter = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value;
      if (!checkSpecial(value)) {
        dispatch(keywordDB(value));
        dispatch(getKeywordPostDB(value, sortby));
        history.push("/search");
      } else {
        setModalOpen(true);
      }
    }
  };

  return (
    <Container>
      <HeaderDiv>
        <Wrap>
          <ImgBack
            alt="back"
            src={back}
            onClick={() => {
              history.push("/");
            }}
          ></ImgBack>
          <Img
            alt="search"
            src={search}
            onClick={() => {
              history.push("/");
            }}
          ></Img>
          <Input
            placeholder="어떤 여행 계획표를 찾으시나요?"
            onKeyPress={(e) => searchEnter(e)}
          />
        </Wrap>
      </HeaderDiv>
      <ModalfixTime
        open={modalOpen}
        close={closeModal}
        header={
          <EditModal>
            <div>검색어를 확인해주세요.😅</div>
          </EditModal>
        }
      ></ModalfixTime>
    </Container>
  );
};

export default SearchInput;

const EditModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    height: 40px;
    font-size: 20px;
  }
`;

const HeaderDiv = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  margin-top: 20px;
`;

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Input = styled.input`
  width: 300px;
  display: flex;
  margin-right: 28px;
  border: none;
  border-bottom: 1px solid #cacaca;
  padding: 10px 25px;
  font-size: 16px;
  &:focus {
    outline: none;
    border-bottom: 1px solid #41b67e;
  }
`;

const Img = styled.img`
  position: relative;
  left: 23px;
  width: 30px;
`;

const ImgBack = styled.img`
  width: 30px;
  margin-left: 22px;
  margin-right: -17px;
  cursor: pointer;
`;

const Wrap = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;

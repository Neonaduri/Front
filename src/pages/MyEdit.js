import React, { useRef, useState } from "react";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Titleline from "../components/elements/Titleline";
import back from "../static/images/icon/back.png";
import Footer from "../components/common/Footer";
import { useHistory } from "react-router";
import Button from "../components/elements/Button";
import { userAction } from "../redux/module/user";
import x from "../static/images/icon/x.png";

const MyEdit = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const loginUser = useSelector((state) => state.user.list);
  const [nickName, setNickName] = useState(loginUser.nickName);
  const [files, setFiles] = useState();
  const [preview, setPreview] = useState(null);

  const changeNick = (e) => {
    setNickName(e.target.value);
  };

  const onImgChange = (e) => {
    const file = e.target.files;
    setFiles(file);

    const reader = new FileReader();
    const imgFile = file[0];
    reader.readAsDataURL(imgFile);

    reader.onloadend = () => {
      setPreview(reader.result);
    };
  };

  const editBtnClick = () => {
    if (nickName?.length < 2) {
      alert("닉네임은 2자리 이상 입력해 주세요.");
      return;
    }
    if (nickName?.length > 12) {
      alert("닉네임은 12자리 이하로 입력해 주세요.");
      return;
    }
    if (preview !== null && preview !== "delete") {
      const formdata = new FormData();
      formdata.append("profileImgFile", files[0]);
      formdata.append("profileImgUrl", "");
      formdata.append("nickName", nickName);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      dispatch(userAction.editProfileDB(formdata, config));
      return;
    } else if (preview === null) {
      const formdata = new FormData();
      formdata.append(
        "profileImgFile",
        new File([], "", { type: "text/plane" })
      );
      formdata.append("profileImgUrl", loginUser.profileImg);
      formdata.append("nickName", nickName);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      dispatch(userAction.editProfileDB(formdata, config));
      return;
    } else if (preview === "delete") {
      const formdata = new FormData();
      formdata.append(
        "profileImgFile",
        new File([], "", { type: "text/plane" })
      );
      formdata.append("profileImgUrl", "");
      formdata.append("nickName", nickName);
      const config = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      dispatch(userAction.editProfileDB(formdata, config));
    }
  };

  return (
    <Container>
      <HeaderDiv>
        <Titleline
          title={"내 계정관리"}
          onClick={() => {
            history.goBack();
          }}
        />
      </HeaderDiv>
      <UserinfoDiv>
        <div>
          {preview !== "delete" ? (
            <>
              {preview === null ? (
                <img src={loginUser.profileImg} alt="profile" />
              ) : (
                <img src={preview} alt="preview" />
              )}
            </>
          ) : null}
        </div>
        {preview === "delete" ? null : (
          <ProfileDeleteBtn
            onClick={() => {
              setPreview("delete");
            }}
          >
            <img src={x} alt="cancel" />
          </ProfileDeleteBtn>
        )}

        <label htmlFor="ex_file">업로드</label>
        <input
          type="file"
          accept="image/*"
          onChange={onImgChange}
          id="ex_file"
        ></input>
      </UserinfoDiv>
      <EditDiv>
        <EmailDiv>
          <label htmlFor="email">이메일</label>
          <input defaultValue={loginUser.userName} disabled={true}></input>
        </EmailDiv>
        <div>
          <label htmlFor="nick">닉네임</label>
          <NickinputDiv>
            <input
              defaultValue={loginUser.nickName}
              onChange={(e) => changeNick(e)}
              maxLength="12"
            ></input>
            <Button
              content={"편집"}
              id="nick"
              width={"30%"}
              height={"slim"}
              onClick={editBtnClick}
            ></Button>
          </NickinputDiv>
        </div>
      </EditDiv>
      <LastDiv>
        <span
          onClick={() => {
            history.push("edit/withdrawal");
          }}
        >
          탈퇴하기
        </span>
      </LastDiv>
      <Footer />
    </Container>
  );
};

const LastDiv = styled.div`
  padding: 10px 20px;
  span {
    font-size: 14px;
    color: ${({ theme }) => theme.colors.text2};
    text-decoration: underline;
    cursor: pointer;
  }
`;

const EmailDiv = styled.div`
  display: flex;
  flex-direction: column;
  input {
    height: 35px;
    margin-top: 5px;
    margin-bottom: 15px;
    font-size: 16px;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.colors.text3};
    padding: 10px;
  }
`;

const NickinputDiv = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  input {
    margin-top: 5px;
    width: 225px;
    height: 35px;
    font-size: 16px;
    margin-bottom: 4px;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.colors.text3};
    padding: 10px;
  }
  button {
    width: 100px;
    font-size: 16px;
  }
`;

const Container = styled.div`
  background-color: ${({ theme }) => theme.colors.text4};
  height: 100%;
`;

const ProfileDeleteBtn = styled.div`
  position: relative;
  cursor: pointer;
  img {
    bottom: 57px;
    right: -48px;
    position: absolute;
    width: 26px;
  }
`;

const EditDiv = styled.div`
  display: flex;
  flex-direction: column;
  padding: 10px 20px 15px 20px;
  background-color: white;
  label {
    margin-top: 20px;
    margin-bottom: 3px;
  }
`;

const UserinfoDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 30px 15px 10px 15px;
  border-bottom: 10px solid ${({ theme }) => theme.colors.borderColor};
  background-color: white;
  div {
    &:first-child {
      position: relative;
      img {
        width: 70px;
        height: 70px;
        border-radius: 50%;
        object-fit: cover;
      }
    }
  }
  label {
    display: inline-block;
    padding: 3px 5px;
    color: ${({ theme }) => theme.colors.mainGreen};
    font-size: inherit;
    line-height: normal;
    vertical-align: middle;
    background-color: #fdfdfd;
    cursor: pointer;
    border: 1px solid #ebebeb;
    border-bottom-color: #e2e2e2;
    border-radius: 0.25em;
    margin-top: 3px;
  }
  input {
    position: absolute;
    width: 1px;
    height: 1px;
    padding: 0;
    margin: -1px;
    overflow: hidden;
    clip: rect(0, 0, 0, 0);
    border: 0;
    &:focus {
      outline: none;
    }
  }
`;

const HeaderDiv = styled.div`
  background-color: white;
`;

export default MyEdit;

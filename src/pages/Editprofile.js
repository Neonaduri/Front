import React, { useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { useHistory } from "react-router";
import styled from "styled-components";
import { userAction } from "../redux/module/user";

const Editprofile = () => {
  const history = useHistory();
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.list);
  const nickNameRef = useRef();
  const [files, setFiles] = useState();
  const [preview, setPreview] = useState(null);

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
    const nickName = nickNameRef.current.value;
    if (nickName.length < 3) {
      alert("닉네임은 3자리 이상입니다.");
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
      formdata.append("profileImgUrl", userInfo.profileImg);
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
      {preview === null ? (
        <img src={userInfo.profileImg} />
      ) : (
        <img src={preview} />
      )}

      <input type="file" accept="image/*" onChange={onImgChange}></input>
      <button
        onClick={() => {
          setPreview("delete");
        }}
      >
        프로필사진 삭제
      </button>
      <input defaultValue={userInfo.nickName} ref={nickNameRef}></input>
      <button onClick={editBtnClick}>수정하기</button>
      <button
        onClick={() => {
          history.goBack();
        }}
      >
        뒤로가기
      </button>
    </Container>
  );
};

const Container = styled.div`
  img {
    width: 70px;
    height: 70px;
  }
`;

export default Editprofile;

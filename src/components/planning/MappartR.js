import React, { useState, useEffect, useRef } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import styled, { keyframes } from "styled-components";
import {
  getDatabase,
  push,
  ref,
  set,
  onValue,
  query,
  orderByChild,
} from "firebase/database";
import { useHistory, useParams } from "react-router";
import ModalfixTime from "../common/ModalfixTime";
import { useDispatch, useSelector } from "react-redux";
import { planAction } from "../../redux/module/plan";
import sharebtn from "../../static/images/icon/sharebtn.png";
import Slide from "../../shared/SlickSlider";
import Modalroompass from "../common/Modalroompass";
import cancel from "../../static/images/icon/cancel.png";
import back from "../../static/images/icon/back.png";
import search from "../../static/images/icon/search.png";

const { kakao } = window;

const MappartR = ({ dayNow, startDay, endDay, clickable }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const timeRef = useRef();
  const minuteRef = useRef();
  const params = useParams();
  const postId = params.postId;
  const thisPlan = useSelector((state) => state.plan.list);
  const isLogin = useSelector((state) => state.user.isLogin);
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [searchPlace, setSearchPlace] = useState("");
  const [polyLineArr, setPolyLineArr] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [linkModalOpen, setLinkModalOpen] = useState(true);
  const [changingKeyword, setChangingKeyword] = useState("");
  const [marker, setMarker] = useState();
  const [copyText, setCopyText] = useState(false);
  const [latlng, setLatlng] = useState({
    lat: 37.5,
    lng: 127,
  });

  useEffect(() => {
    dispatch(planAction.getRoomDB(postId));
  }, []);

  useEffect(() => {
    const db = getDatabase();
    const fixedLatLngRef = query(
      ref(db, `${postId}/allPlan/day${dayNow}`),
      orderByChild("planTime")
    );
    const value = onValue(fixedLatLngRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((child) => {
        let val = child.val();
        arr.push({ lat: val.lat, lng: val.lng });
      });
      setPolyLineArr(arr);
    });
    return () => value();
  }, [dayNow]);

  const inputPlanTime = (marker) => {
    setMarker(marker);
    setModalOpen(true);
  };
  const closeModal = () => {
    setModalOpen(false);
  };

  const clickFixPlace = () => {
    const planTime = timeRef.current.value + minuteRef.current.value;
    const title = marker.infomation.place_name;
    const url = marker.infomation.place_url;
    const cate = marker.infomation.category_name;
    const address = marker.infomation.address_name;
    const road_address = marker.infomation.road_address_name;
    const lat = marker.infomation.y;
    const lng = marker.infomation.x;

    const db = getDatabase();
    set(push(ref(db, `${postId}/allPlan/day${dayNow}`)), {
      placeName: title,
      placeInfoUrl: url,
      category: cate,
      address,
      roadAddress: road_address,
      lat,
      lng,
      placeMemo: "",
      planTime: parseInt(planTime),
    });
    setInfo(null);
    setModalOpen(false);
  };

  useEffect(() => {
    if (!map) return;
    const ps = new kakao.maps.services.Places();

    const search = ps.keywordSearch(
      searchPlace,
      (data, status, _pagination) => {
        if (status === kakao.maps.services.Status.OK) {
          const bounds = new kakao.maps.LatLngBounds();
          let markers = [];
          for (let i = 0; i < data.length; i++) {
            markers.push({
              position: {
                lat: data[i].y,
                lng: data[i].x,
              },
              content: data[i].place_name,
              infomation: data[i],
            });
            bounds.extend(new kakao.maps.LatLng(data[i].y, data[i].x));
          }
          setMarkers(markers);
          map.setBounds(bounds);
          setChangingKeyword("");
        }
      }
    );
  }, [searchPlace]);

  const findLatLng = (latlng) => {
    setLatlng(latlng);
  };

  const copyLinkBtnClick = () => {
    setLinkModalOpen(true);
  };
  const closeLinkModal = () => {
    setLinkModalOpen(false);
  };
  const copyLink = () => {
    const url = window.location.href;
    navigator.clipboard.writeText(url);
    setCopyText(true);
    setModalOpen(false);
  };

  const changeKeyword = (e) => {
    setChangingKeyword(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    setSearchPlace(changingKeyword);
    setLatlng(undefined);
  };

  const textCut = (text) => {
    let value;
    if (text?.length > 15) {
      value = `${text.substring(0, 15)}...`;
    } else {
      value = text;
    }
    return value;
  };

  return (
    <Container>
      <HeadLineDiv>
        <div>
          <img
            alt="back"
            src={back}
            onClick={() => {
              dispatch(planAction.exitBrowserOnPlanDB(postId));
              history.push("/myplan");
            }}
          />
          <span>{textCut(thisPlan.postTitle)}</span>
          <span></span>
        </div>
        <small>
          {thisPlan.startDate}({startDay}) ~ {thisPlan.endDate}({endDay})
        </small>
      </HeadLineDiv>
      <Form onSubmit={onSubmit}>
        <img src={search} alt="search" />
        <PlaceInput
          placeholder="검색어를 입력해주세요."
          onBlur={() => {
            setSearchPlace(changingKeyword);
            setLatlng(undefined);
          }}
          onChange={(e) => {
            changeKeyword(e);
          }}
          value={changingKeyword}
        ></PlaceInput>
      </Form>
      {isLogin ? (
        <PlaceBtn onClick={copyLinkBtnClick}>
          <img src={sharebtn} alt="share" />
        </PlaceBtn>
      ) : null}

      <Map
        center={{
          lat: 37.5,
          lng: 127,
        }}
        style={{
          width: "100%",
          height: "86.5vh",
        }}
        level={7}
        onCreate={setMap}
        onClick={() => setInfo("")}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            image={{
              src: "https://img1.daumcdn.net/thumb/R1280x0/?scode=mtishttps://www.figma.com/file/6Gpk70OmpUE4nBtOsLEGAx/%EB%84%88%EB%82%98%EB%93%A4%EC%9D%B4-%EC%84%9C%EB%B9%84%EC%8A%A4-%EC%95%84%ED%82%A4%ED%85%8D%EC%B2%98ry2&fname=https%3A%2F%2Fblog.kakaocdn.net%2Fdn%2Fvqh0w%2FbtrCKW6TD8U%2F3ykjDNaAVvMxJKmpWUpVWk%2Fimg.png",

              size: { width: 24, height: 34 },
              options: {
                offset: {
                  x: 10,
                  y: 10,
                },
              },
            }}
            clickable={true}
            onClick={() => {
              setInfo(marker);
            }}
          >
            {info && info.content === marker.content && (
              <Infowindow>
                <div>
                  <h4>{marker.content}</h4>
                </div>
                <span>{marker.infomation.road_address_name}</span>
                <div>
                  <button>
                    <a href={marker.infomation.place_url} target="_blank">
                      자세히 보기
                    </a>
                  </button>
                  <button
                    onClick={() => {
                      inputPlanTime(marker);
                    }}
                  >
                    확정하기
                  </button>
                </div>
              </Infowindow>
            )}
          </MapMarker>
        ))}
        <Polyline
          path={[polyLineArr]}
          strokeWeight={4} // 선의 두께 입니다
          strokeColor={`#FF6868`} // 선의 색깔입니다
          strokeOpacity={1} // 선의 불투명도 입니다 1에서 0 사이의 값이며 0에 가까울수록 투명합니다
          strokeStyle={"solid"} // 선의 스타일입니다
        />
      </Map>
      <PlaceList clickable={clickable}>
        <Slide
          sliders={markers}
          dayNow={dayNow}
          callback={findLatLng}
          setInfo={setInfo}
          info={info}
        />
      </PlaceList>
      <ModalfixTime
        open={modalOpen}
        close={closeModal}
        onSubmitClick={clickFixPlace}
        header={
          <TimeModal>
            <h4>{marker?.content} 등록하기</h4>
            <span>DAY{dayNow}</span>
            <Timediv>
              <span>방문 시간</span>
              <div>
                <select ref={timeRef}>
                  <option value="0">오전 0시</option>
                  <option value="1">오전 1시</option>
                  <option value="2">오전 2시</option>
                  <option value="3">오전 3시</option>
                  <option value="4">오전 4시</option>
                  <option value="5">오전 5시</option>
                  <option value="6">오전 6시</option>
                  <option value="7">오전 7시</option>
                  <option value="8">오전 8시</option>
                  <option value="9">오전 9시</option>
                  <option value="10">오전 10시</option>
                  <option value="11">오전 11시</option>
                  <option value="12">오후 12시</option>
                  <option value="13">오후 1시</option>
                  <option value="14">오후 2시</option>
                  <option value="15">오후 3시</option>
                  <option value="16">오후 4시</option>
                  <option value="17">오후 5시</option>
                  <option value="18">오후 6시</option>
                  <option value="19">오후 7시</option>
                  <option value="20">오후 8시</option>
                  <option value="21">오후 9시</option>
                  <option value="22">오후 10시</option>
                  <option value="23">오후 11시</option>
                </select>
                <select ref={minuteRef}>
                  <option value="00">00분</option>
                  <option value="10">10분</option>
                  <option value="20">20분</option>
                  <option value="30">30분</option>
                  <option value="40">40분</option>
                  <option value="50">50분</option>
                </select>
              </div>
            </Timediv>
          </TimeModal>
        }
      ></ModalfixTime>
      <Modalroompass
        open={isLogin ? linkModalOpen : false}
        close={closeModal}
        header={
          <ModalContent>
            <Canceldiv>
              <img
                alt="cancel"
                src={cancel}
                onClick={() => {
                  setCopyText(false);
                  setLinkModalOpen(false);
                }}
              />
            </Canceldiv>
            <InviteTextdiv>
              <h4>친구 초대하기</h4>
              <span>친구와 같이 여행계획을 실시간으로 세워보세요!</span>
            </InviteTextdiv>
            <InviteContentDiv>
              <input value={window.location.href} disabled={true}></input>
              <ModalBtn onClick={copyLink}>복사</ModalBtn>
            </InviteContentDiv>
            {copyText ? (
              <CopyConfirmtext>복사되었습니다.</CopyConfirmtext>
            ) : null}
          </ModalContent>
        }
      ></Modalroompass>
      {clickable ? null : (
        <Alertdiv>
          <span>이곳에서 확정된 일정을 확인하세요✈️</span>
        </Alertdiv>
      )}
    </Container>
  );
};

const Form = styled.form`
  position: relative;
  img {
    height: 33px;
    top: 5px;
    left: 12px;
    position: absolute;
    z-index: 9;
  }
`;

const Timediv = styled.div`
  width: 100%;
  display: flex;
  justify-content: space-between;
  div {
    select {
      border: none;
      font-size: 16px;
      margin-left: 5px;
    }
  }
`;

const move = keyframes`
  0%{
    opacity: 1;
  }
  25%{
    opacity: 0;
  }
  50%{
    opacity: 1;
  }
  75%{
    opacity: 0;
  }
  100%{
    opacity: 1;
  }
`;
const Alertdiv = styled.div`
  z-index: 999999;
  position: fixed;
  bottom: 30px;
  width: 100%;
  text-align: center;
  animation: ${move} 2s 3 forwards;
  span {
    font-size: 20px;
  }
`;

const CopyConfirmtext = styled.span`
  font-size: 14px;
  color: ${({ theme }) => theme.colors.mainGreen};
  margin-top: 5px;
`;

const PlaceList = styled.div`
  display: flex;
  flex-direction: row;
  overflow-x: auto;
  white-space: nowrap;
  background-color: inherit;
  z-index: 5;
  scroll-behavior: auto;
  position: absolute;
  bottom: ${(props) => (props.clickable ? "85px" : "115px")};
  padding-left: 30px;
`;

const Infowindow = styled.div`
  background-color: inherit;
  div {
    background-color: white;
    width: 200px;
    display: flex;
    justify-content: center;
    h4 {
      padding-top: 2px;
    }
  }
  span {
    font-size: 14px;
    background-color: white;
    width: 200px;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 5px;
    font-family: "apple1";
    white-space: normal;
    word-break: break-all;
    color: ${({ theme }) => theme.colors.text2};
  }
  button {
    &:first-child {
      background-color: white;
      width: 50%;
      border: none;
      border-top: 1px solid ${({ theme }) => theme.colors.borderColor};
    }
    &:last-child {
      background-color: ${({ theme }) => theme.colors.mainGreen};
      color: white;
      font-size: 14px;
      border: none;
      padding: 7px 0px;
      width: 50%;
      border-radius: 4px;
    }
  }
  a {
    text-decoration: none;
    color: black;
    font-family: "apple2";
    &:hover {
      text-decoration: underline;
    }
  }
`;

const InviteContentDiv = styled.div`
  display: flex;
  align-items: center;
  width: 85%;
  input {
    font-family: "apple1";
  }
`;

const HeadLineDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 13.5vh;
  width: 100%;
  padding: 0px 10px;
  div {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    span {
      margin-right: 12px;
      font-family: "apple3";
    }
    img {
      width: 22px;
      cursor: pointer;
    }
  }
  span {
    font-size: 20px;
    margin-top: -10px;
  }
  small {
    margin-bottom: 5px;
    color: ${({ theme }) => theme.colors.text3};
    font-family: "apple1";
  }
`;

const TimeModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  h4 {
    font-size: 20px;
  }
  span {
    font-size: 16px;
    color: ${({ theme }) => theme.colors.text2};
    margin-bottom: 30px;
  }
`;

const Container = styled.div`
  position: relative;
`;

const PlaceInput = styled.input`
  position: absolute;
  z-index: 2;
  left: 50%;
  transform: translate(-60%, 0);
  width: 78%;
  margin-top: 5px;
  outline: none;
  border: none;
  border-radius: 3px;
  font-size: 16px;
  padding: 3px 30px;
  height: 35px;
  font-family: "apple1";
`;
const PlaceBtn = styled.div`
  background-color: white;
  width: 37px;
  height: 37px;
  border-radius: 50%;
  position: absolute;
  top: 14.3vh;
  right: 25px;
  z-index: 3;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  img {
    width: 30px;
  }
`;
const InviteTextdiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  margin-top: -10px;
  h4 {
    font-size: 20px;
    margin-bottom: 5px;
  }
  span {
    font-size: 15px;
    color: ${({ theme }) => theme.colors.text2};
    margin-top: 5px;
    font-family: "apple1";
  }
`;

const Canceldiv = styled.div`
  position: absolute;
  top: -15px;
  left: -3px;
  cursor: pointer;
`;

const ModalBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.mainGreen};
  border-radius: 5px;
  color: white;
  height: 40px;
  width: 20%;
  border: none;
`;
const ModalContent = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 120px;
  margin-top: 5px;
  margin-bottom: 10px;
  input {
    width: 90%;
    font-size: 15px;
    padding: 5px;
    border-radius: 5px;
    border: 1px solid ${({ theme }) => theme.colors.text3};
    background-color: inherit;
    height: 40px;
    color: ${({ theme }) => theme.colors.text2};
  }
`;

export default MappartR;

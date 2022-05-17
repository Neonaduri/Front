import React, { useState, useEffect, useRef } from "react";
import { Map, MapMarker, Polyline } from "react-kakao-maps-sdk";
import styled from "styled-components";
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
import sharebtn from "../../static/images/icon/shareBtn.png";
import Slide from "../../shared/SlickSlider";
import Modalroompass from "../common/Modalroompass";
import cancel from "../../static/images/icon/cancel.png";
import back from "../../static/images/icon/back.png";
import goright from "../../static/images/icon/goRight.png";

const { kakao } = window;

const MappartR = ({ dayNow, startDay, endDay }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const timeRef = useRef();
  const minuteRef = useRef();
  const keywordRef = useRef();
  const params = useParams();
  const postId = params.postId;
  const thisPlan = useSelector((state) => state.plan.list);
  const [info, setInfo] = useState();
  const [markers, setMarkers] = useState([]);
  const [map, setMap] = useState();
  const [searchPlace, setSearchPlace] = useState("");
  const [polyLineArr, setPolyLineArr] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [linkModalOpen, setLinkModalOpen] = useState(false);
  const [changingKeyword, setChangingKeyword] = useState("");
  const [marker, setMarker] = useState();
  const [hidden, setHidden] = useState(false);
  const [latlng, setLatlng] = useState({
    lat: 37.5,
    lng: 127,
  });

  useEffect(() => {
    const db = getDatabase();
    const fixedLatLngRef = query(
      ref(db, `${postId}/allPlan/day${dayNow}`),
      orderByChild("planTime")
    );
    onValue(fixedLatLngRef, (snapshot) => {
      let arr = [];
      snapshot.forEach((child) => {
        let val = child.val();
        arr.push({ lat: val.lat, lng: val.lng });
      });
      setPolyLineArr(arr);
    });
    return () =>
      onValue(fixedLatLngRef, (snapshot) => {
        let arr = [];
        snapshot.forEach((child) => {
          let val = child.val();
          arr.push({ lat: val.lat, lng: val.lng });
        });
        setPolyLineArr(arr);
      });
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

    ps.keywordSearch(searchPlace, (data, status, _pagination) => {
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
    });
  }, [map, searchPlace]);

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
    setModalOpen(false);
  };

  const changeKeyword = (e) => {
    setChangingKeyword(e.target.value);
  };

  return (
    <Container>
      <HeadLineDiv>
        <div>
          <img
            src={back}
            onClick={() => {
              dispatch(planAction.exitBrowserOnPlanDB(postId));
              history.push("/myplan");
            }}
          />
          <span>{thisPlan.postTitle}</span>
          <span></span>
        </div>
        <small>
          {thisPlan.startDate}({startDay}) ~ {thisPlan.endDate}({endDay})
        </small>
      </HeadLineDiv>
      <PlaceInput
        placeholder="검색어를 입력해주세요."
        onKeyDown={(e) => {
          if (e.code === "Enter") {
            setSearchPlace(changingKeyword);
            // e.target.value = "";
            setLatlng(undefined);
          }
        }}
        onChange={(e) => {
          changeKeyword(e);
        }}
        ref={keywordRef}
        value={changingKeyword}
      ></PlaceInput>
      <PlaceBtn onClick={copyLinkBtnClick}>
        <img src={sharebtn} />
      </PlaceBtn>

      <Map
        center={
          latlng === undefined
            ? {
                lat: 37.5,
                lng: 127,
              }
            : latlng
        }
        style={{
          width: "100%",
          height: "86.5vh",
        }}
        level={latlng === undefined ? 7 : 3}
        onCreate={setMap}
        onClick={() => setInfo("")}
      >
        {markers.map((marker) => (
          <MapMarker
            key={`marker-${marker.content}-${marker.position.lat},${marker.position.lng}`}
            position={marker.position}
            onClick={() => setInfo(marker)}
          >
            {info && info.content === marker.content && (
              <Infowindow>
                <div>
                  <h4>{marker.content}</h4>
                </div>
                <span>
                  <a href={marker.infomation.place_url} target="_blank">
                    {marker.infomation.place_name} 바로가기
                  </a>
                </span>
                <div>
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
      {hidden === false ? (
        <HideBtn
          onClick={() => {
            setHidden(true);
          }}
        >
          <img src={back} />
        </HideBtn>
      ) : (
        <HideBtn
          onClick={() => {
            setHidden(false);
          }}
        >
          <img src={goright} />
        </HideBtn>
      )}

      <PlaceList hidden={hidden}>
        <Slide sliders={markers} dayNow={dayNow} callback={findLatLng} />
      </PlaceList>
      <ModalfixTime
        open={modalOpen}
        close={closeModal}
        header={
          <TimeModal>
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
            <div>
              <button onClick={clickFixPlace}>플랜 확정</button>
            </div>
          </TimeModal>
        }
      ></ModalfixTime>
      <Modalroompass
        open={linkModalOpen}
        close={closeModal}
        header={
          <ModalContent>
            <Canceldiv>
              <img
                src={cancel}
                onClick={() => {
                  setLinkModalOpen(false);
                }}
              />
            </Canceldiv>
            <InviteTextdiv>
              <h4>친구 초대하기</h4>
              <span>초대는 최대 5인까지 가능합니다.</span>
            </InviteTextdiv>
            <InviteContentDiv>
              <input
                defaultValue={window.location.href}
                disabled={true}
              ></input>
              <ModalBtn onClick={copyLink}>복사</ModalBtn>
            </InviteContentDiv>
          </ModalContent>
        }
      ></Modalroompass>
    </Container>
  );
};

const HideBtn = styled.button`
  background-color: ${({ theme }) => theme.colors.mainGreen};
  border: none;
  position: absolute;
  z-index: 9999;
  bottom: 128px;
  left: 5px;
  border-radius: 5px;
  height: 50px;
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
  bottom: 100px;
  padding-left: 30px;
  visibility: ${(props) => (props.hidden ? "hidden" : null)};
`;

const Infowindow = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  span {
    font-size: 14px;
  }
  button {
    background-color: ${({ theme }) => theme.colors.mainGreen};
    color: white;
    border: none;
    padding: 3px 10px;
    border-radius: 4px;
  }
`;

const InviteContentDiv = styled.div`
  display: flex;
  align-items: center;
  width: 85%;
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
    }
  }
  span {
    font-size: 20px;
    margin-top: -7px;
  }
  small {
    color: ${({ theme }) => theme.colors.text3};
  }
`;

const TimeModal = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  div {
    &:first-child {
      width: 80%;
      display: flex;
      justify-content: space-around;
      select {
        width: 40%;
        font-size: 20px;
      }
    }
    &:last-child {
      width: 80%;
      display: flex;
      justify-content: space-around;
      button {
        margin-top: 20px;
        width: 60%;
        padding: 10px 20px;
        border-radius: 10px;
        font-size: 20px;
      }
    }
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
  padding: 3px 5px;
  height: 35px;
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
`;
const InviteTextdiv = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 20px;
  margin-top: -10px;
  h4 {
    font-size: 20px;
  }
  span {
    font-size: 15px;
    color: ${({ theme }) => theme.colors.text2};
    margin-top: 5px;
  }
`;

const Canceldiv = styled.div`
  position: absolute;
  top: -5px;
  left: 5px;
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

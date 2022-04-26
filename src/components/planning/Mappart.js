/* global kakao */
import React, { useEffect } from "react";
import styled from "styled-components";
const { kakao } = window;

const Mappart = () => {
  const [map, setMap] = React.useState();
  // 지도 확대, 축소 컨트롤에서 확대 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
  function zoomIn() {
    map.setLevel(map.getLevel() - 1);
  }

  // 지도 확대, 축소 컨트롤에서 축소 버튼을 누르면 호출되어 지도를 확대하는 함수입니다
  function zoomOut() {
    map.setLevel(map.getLevel() + 1);
  }

  useEffect(() => {
    let mapContainer = document.getElementById("map");
    let options = {
      center: new window.kakao.maps.LatLng(37.5740339, 126.976775),
      level: 4,
    };
    let map = new window.kakao.maps.Map(mapContainer, options);
    setMap(map);
  }, []);
  //클릭이벤트 등록하는 곳
  //   if (map) {
  //     kakao.maps.event.addListener(map, "click", (mouseEvent) => {
  //       const latlng = mouseEvent.latLng;
  //       console.log(`위도는 ${latlng.getLat()},경도는 ${latlng.getLng()} `);
  //     });
  //   }
  // 마커를 표시할 위치입니다
  //   let position = new kakao.maps.LatLng(37.5740339, 126.976775);
  //   let positions = [
  //     {
  //       content:
  //         '    <div class="info">' +
  //         '        <div class="title">' +
  //         "            카카오 스페이스닷원" +
  //         "        </div>" +
  //         '            <div class="desc">' +
  //         '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' +
  //         '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' +
  //         '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
  //         "            </div>" +
  //         "    </div>",
  //       latlng: new kakao.maps.LatLng(37.5735829, 126.982775),
  //     },
  //     {
  //       content:
  //         '    <div class="info">' +
  //         '        <div class="title">' +
  //         "            카카오 스페이스닷원" +
  //         "        </div>" +
  //         '            <div class="desc">' +
  //         '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' +
  //         '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' +
  //         '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
  //         "            </div>" +
  //         "    </div>",
  //       latlng: new kakao.maps.LatLng(37.5740539, 126.976975),
  //     },
  //     {
  //       content:
  //         '    <div class="info">' +
  //         '        <div class="title">' +
  //         "            카카오 스페이스닷원" +
  //         "        </div>" +
  //         '            <div class="desc">' +
  //         '                <div class="ellipsis">제주특별자치도 제주시 첨단로 242</div>' +
  //         '                <div class="jibun ellipsis">(우) 63309 (지번) 영평동 2181</div>' +
  //         '                <div><a href="https://www.kakaocorp.com/main" target="_blank" class="link">홈페이지</a></div>' +
  //         "            </div>" +
  //         "    </div>",
  //       latlng: new kakao.maps.LatLng(37.5741039, 126.978175),
  //     },
  //   ];
  // 마커를 생성합니다
  //   let marker = new kakao.maps.Marker({
  //     position: position,
  //     clickable: true,
  //   });
  // 마커를 지도에 표시합니다.
  //   marker.setMap(map);
  let markers = [];
  let ps = new kakao.maps.services.Places();
  let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  const searchPlaces = () => {
    let keyword = document.getElementById("keyword").value;
    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      alert("키워드를 입력해주세요!");
      return false;
    }
    ps.keywordSearch(keyword, placesSearchCB);
  };
  //위에서 키워드로 장소검색이 완료되면 placesSearchCB 콜백함수 실행됨
  const placesSearchCB = (data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      //검색이 정상적으로 완료되었으면 검색목록과 마커 표출
      displayPlaces(data);
      //페이지 번호 표출
      displayPagination(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
      return;
    }
  };

  const displayPlaces = () => {
    let listEl = document.getElementById();
  };
  return (
    <>
      <div id="map" style={{ width: "700px", height: "600px" }}></div>
      <div id="menu_wrap" class="bg_white">
        <div class="option">
          <div>
            <form onSubmit={searchPlaces}>
              키워드 : <input type="text" id="keyword" size="15"></input>
              <button type="submit">검색하기</button>
            </form>
          </div>
        </div>
        <ul id="placesList"></ul>
        <div id="pagination"></div>
      </div>
      <ZoomBtndiv>
        <button
          onClick={() => {
            zoomIn();
          }}
        >
          +
        </button>
        <button
          onClick={() => {
            zoomOut();
          }}
        >
          -
        </button>
      </ZoomBtndiv>
      <div style={{ listStyle: "none", padding: "20px" }}>
        <li id="placesList"></li>
        <li id="menu_wrap"></li>
      </div>
      <ul id="pagination"></ul>
    </>
  );
};

const ZoomBtndiv = styled.div`
  position: relative;
  bottom: 160px;
  left: 660px;
  z-index: 1;
  display: flex;
  flex-direction: column;
  button {
    background-color: red;
    width: 30px;
    height: 30px;
    background-color: rgba(255, 255, 255, 0.7);
    border: 1px solid black;
  }
`;

export default Mappart;

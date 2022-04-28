/* global kakao */
import React, { useCallback, useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { getDatabase, push, ref, set } from "firebase/database";
import { useParams } from "react-router";

const { kakao } = window;
const Mappart = () => {
  let map;
  let keywordref = useRef();
  let markers = [];
  let ps = new kakao.maps.services.Places();
  let infowindow = new kakao.maps.InfoWindow({ zIndex: 1 });
  const postId = useParams().postId;

  const searchStart = () => {
    return searchPlaces();
  };
  // 키워드 검색을 요청하는 함수입니다
  function searchPlaces() {
    let keyword = keywordref.current.value;
    if (!keyword.replace(/^\s+|\s+$/g, "")) {
      alert("키워드를 입력해주세요!");
      return false;
    }
    // 장소검색 객체를 통해 키워드로 장소검색을 요청합니다
    ps.keywordSearch(keyword, placesSearchCB);
    keywordref.current.value = "";
  }
  const placesSearchCB = (data, status, pagination) => {
    if (status === kakao.maps.services.Status.OK) {
      // 정상적으로 검색이 완료됐으면
      // 검색 목록과 마커를 표출합니다
      displayPlaces(data);
      // 페이지 번호를 표출합니다
      displayPagination(pagination);
    } else if (status === kakao.maps.services.Status.ZERO_RESULT) {
      alert("검색 결과가 존재하지 않습니다.");
      return;
    } else if (status === kakao.maps.services.Status.ERROR) {
      alert("검색 결과 중 오류가 발생했습니다.");
      return;
    }
  };
  function displayPagination(pagination) {
    var paginationEl = document.getElementById("pagination"),
      fragment = document.createDocumentFragment(),
      i;

    // 기존에 추가된 페이지번호를 삭제합니다
    while (paginationEl.hasChildNodes()) {
      paginationEl.removeChild(paginationEl.lastChild);
    }

    for (i = 1; i <= pagination.last; i++) {
      var el = document.createElement("a");
      el.href = "#";
      el.innerHTML = i;

      if (i === pagination.current) {
        el.className = "on";
      } else {
        el.onclick = (function (i) {
          return function () {
            pagination.gotoPage(i);
          };
        })(i);
      }

      fragment.appendChild(el);
    }
    paginationEl.appendChild(fragment);
  }
  function displayPlaces(places) {
    let listEl = document.getElementById("placesList"),
      menuEl = document.getElementById("menu_wrap"),
      fragment = document.createDocumentFragment(),
      bounds = new kakao.maps.LatLngBounds(),
      listStr = "";
    removeAllChildNods(listEl);
    removeMarker();
    for (let i = 0; i < places.length; i++) {
      // 마커를 생성하고 지도에 표시합니다
      let placePosition = new kakao.maps.LatLng(places[i].y, places[i].x),
        marker = addMarker(placePosition, i),
        itemEl = getListItem(i, places[i]); // 검색 결과 항목 Element를 생성합니다
      // 검색된 장소 위치를 기준으로 지도 범위를 재설정하기위해
      // LatLngBounds 객체에 좌표를 추가합니다
      bounds.extend(placePosition);
      // 마커와 검색결과 항목에 mouseover 했을때
      // 해당 장소에 인포윈도우에 장소명을 표시합니다
      // mouseout 했을 때는 인포윈도우를 닫습니다
      (function (marker, title, url, cate, address, road_address, y, x) {
        kakao.maps.event.addListener(marker, "click", function () {
          displayInfowindow(
            marker,
            title,
            url,
            cate,
            address,
            road_address,
            y,
            x
          );
        });

        kakao.maps.event.addListener(map, "click", function () {
          infowindow.close();
        });

        itemEl.onmouseover = function () {
          displayInfowindow(marker, title);
        };

        itemEl.onmouseout = function () {
          infowindow.close();
        };
      })(
        marker,
        places[i].place_name,
        places[i].place_url,
        places[i].category_name,
        places[i].address_name,
        places[i].road_address_name,
        places[i].y,
        places[i].x
      );

      fragment.appendChild(itemEl);
    }
    // 검색결과 항목들을 검색결과 목록 Element에 추가합니다
    listEl.appendChild(fragment);
    menuEl.scrollTop = 0;

    // 검색된 장소 위치를 기준으로 지도 범위를 재설정합니다
    map.setBounds(bounds);
  }
  function getListItem(index, places) {
    var el = document.createElement("li"),
      itemStr = `<div class="info"> <h4>${places.place_name}</h4><h5>${places.category_name}</h5>`;

    if (places.road_address_name) {
      itemStr += "    <h5>" + places.road_address_name + "</h5>";
    } else {
      itemStr += "    <h5>" + places.address_name + "</h5>";
    }
    itemStr += `<h5><a href=${places.place_url} target="_blank">${places.place_name} 바로가기</a></small>`;
    itemStr += '  <h5 class="tel">' + places.phone + "</h5>" + "</div>";

    el.innerHTML = itemStr;
    el.className = "item";

    return el;
  }
  // 마커를 생성하고 지도 위에 마커를 표시하는 함수입니다
  function addMarker(position, idx, title) {
    var imageSrc =
        "https://t1.daumcdn.net/localimg/localimages/07/mapapidoc/marker_number_blue.png", // 마커 이미지 url, 스프라이트 이미지를 씁니다
      imageSize = new kakao.maps.Size(36, 37), // 마커 이미지의 크기
      imgOptions = {
        spriteSize: new kakao.maps.Size(36, 691), // 스프라이트 이미지의 크기
        spriteOrigin: new kakao.maps.Point(0, idx * 46 + 10), // 스프라이트 이미지 중 사용할 영역의 좌상단 좌표
        offset: new kakao.maps.Point(13, 37), // 마커 좌표에 일치시킬 이미지 내에서의 좌표
      },
      markerImage = new kakao.maps.MarkerImage(imageSrc, imageSize, imgOptions),
      marker = new kakao.maps.Marker({
        position: position, // 마커의 위치
        image: markerImage,
      });

    marker.setMap(map); // 지도 위에 마커를 표출합니다
    markers.push(marker); // 배열에 생성된 마커를 추가합니다

    return marker;
  }
  // 지도 위에 표시되고 있는 마커를 모두 제거합니다
  function removeMarker() {
    for (var i = 0; i < markers.length; i++) {
      markers[i].setMap(null);
    }
    markers = [];
  }

  function displayInfowindow(
    marker,
    title,
    url,
    cate,
    address,
    road_address,
    y,
    x
  ) {
    let cover = document.createElement("div");
    let content = document.createElement("div");
    content.style = "padding:5px;z-index:1;";
    content.innerHTML = title;
    let contentBtn = document.createElement("button");
    contentBtn.innerHTML = "일정추가";
    let contentUrl = document.createElement("span");
    let contentUrlA = document.createElement("a");
    contentUrlA.href = url;
    contentUrlA.target = "_blank";
    contentUrlA.innerHTML = `${title} 바로가기`;
    cover.appendChild(content);
    cover.appendChild(contentBtn);
    contentUrl.appendChild(contentUrlA);
    cover.appendChild(contentUrl);

    infowindow.setContent(cover);
    infowindow.open(map, marker);
    contentBtn.onclick = function () {
      const db = getDatabase();
      set(push(ref(db, "postid/" + postId)), {
        postId: postId,
        title: "남자끼리 제주도 여행",
        date: "2022.04.22~2022.04.24",
        tripPlan: [
          {
            day: 1,
            storeTitle: title,
            url,
            category: cate,
            address,
            road_address,
            y,
            x,
          },
        ],
      });
    };
  }
  function removeAllChildNods(el) {
    while (el.hasChildNodes()) {
      el.removeChild(el.lastChild);
    }
  }

  useEffect(() => {
    let container = document.getElementById("map");
    var options = {
      center: new kakao.maps.LatLng(37.5, 127),
      level: 10,
    };
    map = new kakao.maps.Map(container, options);
  }, []);
  return (
    <Container>
      <div style={{ width: "100%", height: "500px" }} id="map">
        <SearchInput
          placeholder="검색어를 입력해주세요"
          ref={keywordref}
          id="keyword"
          onKeyDown={(e) => {
            if (e.keyCode === 13) {
              return searchStart();
            }
          }}
        />
      </div>
      <MenuWrap id="menu_wrap">
        <ul id="placesList"></ul>
        <div id="pagination"></div>
      </MenuWrap>
    </Container>
  );
};
const MenuWrap = styled.div`
  height: 100px;
  overflow: auto;
  position: absolute;
  bottom: 180px;
  z-index: 10000;
  background-color: white;
`;

const SearchInput = styled.input`
  width: 60%;
  z-index: 10000;
  position: absolute;
  border-radius: 15px;
  border: none;
  top: 10px;
  left: 50%;
  font-size: 18px;
  padding: 3px 5px;
  transform: translate(-50%, 0);
  :focus {
    outline: none;
  }
`;

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

export default Mappart;

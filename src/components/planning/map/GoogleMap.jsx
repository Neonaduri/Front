import React, { useCallback, useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";
import styled from "styled-components";
// import RealtimeMakePlan from "../plan/RealtimeMakePlan";

const { google } = window;

const GoogleMap = () => {
  const [lat, setLat] = useState(37.5);
  const [lng, setLng] = useState(126.9);
  const mapRef = useRef();
  const inputRef = useRef();
  const locations = [];
  let map;
  let places;

  const initMap = () => {
    // let localContextMapView = new google.maps.localContext.LocalContextMapView({
    //   element: mapRef.current,
    //   placeTypePreferences: [{ type: "restaurant" }, { type: "cafe" }],
    //   maxPlaceCount: 24,
    // });
    // map = localContextMapView.map;

    // map.setOptions({
    //   center: { lat, lng },
    //   zoom: 13,
    // }); => 로컬 컨텍스트

    map = new google.maps.Map(document.getElementById("map"), {
      center: { lat, lng },
      zoom: 15,
    });

    const request = {
      placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
      fields: ["name", "formatted_address", "place_id", "geometry", "url"],
    };

    let infowindow = new google.maps.InfoWindow();
    const service = new google.maps.places.PlacesService(map);

    window.initMap = initMap;

    getDetails(map, service, request, infowindow);
    let searchBox = new google.maps.places.SearchBox(inputRef.current);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(inputRef.current);
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });

    searchBox.addListener("places_changed", () => {
      onPlacesChange(map, searchBox);
    });
  };

  const onPlacesChange = (map, searchBox, places) => {
    places = searchBox.getPlaces();
    setLat(places[0].geometry.location.lat());
    setLng(places[0].geometry.location.lng());

    for (let i = 0; i < places.length; i++) {
      const lat = places[i].geometry.location.lat();
      const lng = places[i].geometry.location.lng();

      locations.push({ lat, lng });

      // console.log(locations);
      console.log(
        // places[i].name,
        // places[i].formatted_address,
        // lat,
        // lng,
        // places[i].types[0]
        places[i]
      );

      // 검색한 결과에 따른 이름, 주소, 위도&경도
    }

    for (let i = 0; i < locations.length; i++) {
      const myLatLng = { lat: locations[i].lat, lng: locations[i].lng };

      // console.log(myLatLng);
      const marker = new google.maps.Marker({
        position: myLatLng,
        map,
        places,
      });

      marker.addListener("click", () => {
        const content = document.createElement("div");
        const nameElement = document.createElement("h3");
        const placeCategory = document.createElement("span");
        const placeAddressElement = document.createElement("p");

        nameElement.textContent = places[i].name;
        content.appendChild(nameElement);

        placeAddressElement.textContent = places[i].types[0];
        content.appendChild(placeCategory);

        placeAddressElement.textContent = places[i].formatted_address;
        content.appendChild(placeAddressElement);

        let infowindow = new google.maps.InfoWindow({ content });
        infowindow.open({
          anchor: marker,
          map,
          places,
          shouldFocus: false,
        });
      });
    }

    const bounds = new google.maps.LatLngBounds();
    let markers = [];

    if (places.length === 0) return;

    // 예전 마커 삭제
    markers.forEach((marker) => {
      marker.setMap(null);
    });
    markers = [];

    places.forEach((place) => {
      if (!place.geometry || !place.geometry.location) {
        console.log("Returned place contains no geometry");
        return;
      }

      if (place.geometry.viewport) {
        bounds.union(place.geometry.viewport);
      } else {
        bounds.extend(place.geometry.location);
      }
    });
    map.fitBounds(bounds);
  };

  const getDetails = useCallback((map, service, request, infowindow) => {
    service.getDetails(request, (place, status) => {
      if (
        status === google.maps.places.PlacesServiceStatus.OK &&
        place &&
        place.geometry &&
        place.geometry.location
      ) {
        const marker = new google.maps.Marker({
          map,
          position: place.geometry.location,
        });

        google.maps.event.addListener(marker, "click", () => {
          const content = document.createElement("div");
          const nameElement = document.createElement("h2");

          nameElement.textContent = place.name;
          content.appendChild(nameElement);

          const placeIdElement = document.createElement("p");

          placeIdElement.textContent = place.place_id;
          content.appendChild(placeIdElement);

          const placeAddressElement = document.createElement("p");

          placeAddressElement.textContent = place.formatted_address;
          content.appendChild(placeAddressElement);
          infowindow.setContent(content);
          infowindow.open(map, marker);
        });
      }
    });
  }, []);
  window.initMap = initMap;

  useEffect(() => {
    initMap();
  }, [locations[0]]);

  return (
    <>
      <Grid>
        <input
          ref={inputRef}
          type="text"
          id="pac-input"
          placeholder="지역을 검색해주세요 :)"
          style={{
            padding: "10px",
            width: "200px",
            margin: "10px 0 0 5px",
          }}
        />
        <div
          id="map"
          className="map"
          style={{ width: "420px", height: "500px" }}
          ref={mapRef}
        />

        <RouteSection>
          <div>
            <Card>
              <h3>{places}</h3>
              <p>대한민국 서울특별시 노원구 상계6.7동 노해로81길 22-26</p>
              {/* <RealtimeMakePlan /> */}
            </Card>
          </div>
        </RouteSection>

        <RouteSection>
          <Card>
            <h3>롯데백화점</h3>
            <p>대한민국 서울특별시 노원구 상계6.7동 노해로81길 22-26</p>
            {/* <RealtimeMakePlan /> */}
          </Card>
        </RouteSection>
      </Grid>
    </>
  );
};

export default GoogleMap;
const Grid = styled.div`
  position: relative;
  width: 100%;
  height: 100%;
`;

const Card = styled.div``;

const RouteSection = styled.div`
  background-color: wheat;
  border-radius: 20px;
  margin: 10px;
`;

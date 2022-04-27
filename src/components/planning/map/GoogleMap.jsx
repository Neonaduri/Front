import React, { useCallback, useRef } from "react";
import { useEffect } from "react";
import { useState } from "react";

const { google } = window;

const GoogleMap = () => {
  const [lat, setLat] = useState(37.5);
  const [lng, setLng] = useState(126.9);
  const mapRef = useRef();
  const inputRef = useRef();
  let map;

  const initMap = () => {
    let localContextMapView = new google.maps.localContext.LocalContextMapView({
      element: mapRef.current,
      placeTypePreferences: [{ type: "restaurant" }, { type: "cafe" }],
      maxPlaceCount: 24,
    });
    map = localContextMapView.map;

    map.setOptions({
      center: { lat, lng },
      zoom: 13,
    });

    const request = {
      placeId: "ChIJN1t_tDeuEmsRUsoyG83frY4",
      fields: ["name", "formatted_address", "place_id", "geometry"],
    };

    const infowindow = new google.maps.InfoWindow();
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

  const onPlacesChange = (map, searchBox) => {
    const places = searchBox.getPlaces();

    setLat(places[0].geometry.location.lat());
    setLng(places[0].geometry.location.lng());
    console.log(lat, lng);
    // for (let i = 0; i < places.length; i++) {
    // console.log(places[i].name, places[i].formatted_address, lat, lng);
    // 검색한 결과에 따른 이름, 주소, 위도&경도
    // }

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

  useEffect(() => {
    initMap();
  }, [lat, lng]);

  return (
    <>
      <input
        ref={inputRef}
        type="text"
        id="pac-input"
        placeholder="지역을 검색해주세요 :)"
        style={{
          padding: "10px",
          width: "200px",
          margin: "10px 0 0 30px",
        }}
      />
      <div
        id="map"
        className="map"
        style={{ width: "500px", height: "500px" }}
        ref={mapRef}
      />
    </>
  );
};

export default GoogleMap;

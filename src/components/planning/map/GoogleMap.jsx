import React, { useEffect, useRef } from "react";
import SearchArea from "./SearchArea";
const { google } = window;

const GoogleMap = () => {
  const mapRef = useRef();

  const initMap = () => {
    const location = { lat: 37.541, lng: 126.986 };
    new window.google.maps.Map(mapRef.current, {
      center: location,
      zoom: 10,
    });
  };

  useEffect(() => {
    initMap();
  }, [initMap]);

  return (
    <>
      <div
        className="map"
        style={{ width: "500px", height: "500px" }}
        ref={mapRef}
      />
    </>
  );
};

export default GoogleMap;

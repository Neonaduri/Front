import React, { useCallback, useEffect, useRef, useState } from "react";
import GoogleMap from "google-map-react";
import styled from "styled-components";
const { google } = window;

const Mappart = () => {
  const mapRef = useRef(null);
  let map;
  let infowindow;
  const initMap = () => {
    map = new google.maps.Map(mapRef.current, {
      zoom: 15,
      center: { lat: 37.5216167, lng: 126.9672631 },
    });
    const input = document.getElementById("pac-input");
    const searchBox = new google.maps.places.SearchBox(input);
    map.controls[google.maps.ControlPosition.TOP_LEFT].push(input);
    // Bias the SearchBox results towards current map's viewport.
    map.addListener("bounds_changed", () => {
      searchBox.setBounds(map.getBounds());
    });

    let markers = [];
    // Listen for the event fired when the user selects a prediction and retrieve
    // more details for that place.
    searchBox.addListener("places_changed", () => {
      const places = searchBox.getPlaces();
      if (places.length == 0) {
        return;
      }

      // Clear out the old markers.
      markers.forEach((marker) => {
        marker.setMap(null);
      });
      markers = [];

      // For each place, get the icon, name and location.
      const bounds = new google.maps.LatLngBounds();

      places.forEach((place) => {
        if (!place.geometry || !place.geometry.location) {
          console.log("Returned place contains no geometry");
          return;
        }

        const icon = {
          url: place.icon,
          size: new google.maps.Size(71, 71),
          origin: new google.maps.Point(0, 0),
          anchor: new google.maps.Point(17, 34),
          scaledSize: new google.maps.Size(25, 25),
        };
        const placeLat = place.geometry.location.lat();
        const placeLng = place.geometry.location.lng();
        console.log({ placeLat, placeLng });
        // Create a marker for each place.
        markers.push(
          new google.maps.Marker({
            map,
            icon,
            title: place.name,
            position: place.geometry.location,
          })
        );
        if (place.geometry.viewport) {
          // Only geocodes have viewport.
          bounds.union(place.geometry.viewport);
        } else {
          bounds.extend(place.geometry.location);
        }
      });
      map.fitBounds(bounds);
    });
  };

  useEffect(() => {
    initMap();
  }, []);
  return (
    <Container>
      <input
        id="pac-input"
        className="controls"
        type="text"
        placeholder="Search Box"
      />
      <div
        style={{ width: "70%", height: "700px" }}
        id="map"
        ref={mapRef}
      ></div>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
`;
const Search = styled.div`
  width: 20%;
`;
const Map = styled.div`
  width: 50%;
`;
export default Mappart;

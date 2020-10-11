import React, { useState, useEffect } from "react";
import { GoogleMap } from "@react-google-maps/api";

import mapStyles from "../styles/mapStyles";
import MapContent from "./MapContent";
import { Coord, getShadowCoord } from "../utils/sun";
import { Height } from "./MainLayout";
import { useDebounce } from "react-use";
import { DateTime } from "luxon";
import styled from "styled-components";

interface MapProps {
  map: google.maps.Map | null;
  setMap: (map: google.maps.Map | null) => void;
  date: DateTime;
  height: Height;
  debouncedCenter: google.maps.LatLng;
  setDebouncedCenter: (center: google.maps.LatLng) => void;
  markers: Array<Coord>;
  setMarkers: React.Dispatch<React.SetStateAction<Array<Coord>>>;
  shadowMarkers: Array<Coord>;
  setShadowMarkers: React.Dispatch<React.SetStateAction<Array<Coord>>>;
}

const MapContainer = styled.div`
  width: 100vw;
  height: calc(100vh + 3rem);
  position: fixed;
  top: -1.5rem;
  left: 0;
`;

const containerStyle = {
  width: "100%",
  height: "100%",
};

const options: google.maps.MapOptions = {
  disableDefaultUI: true,
  styles: mapStyles,
  tilt: 0,
};

const Map: React.FC<MapProps> = ({
  map,
  setMap,
  date,
  height,
  debouncedCenter,
  setDebouncedCenter,
  markers,
  setMarkers,
  shadowMarkers,
  setShadowMarkers,
}) => {
  const [center, setCenter] = useState<google.maps.LatLng>(debouncedCenter);

  const onMapLoad = React.useCallback(
    (map: google.maps.Map) => {
      setMap(map);
    },
    [setMap],
  );

  const onMapClick = React.useCallback(
    (e: google.maps.MouseEvent) => {
      const lat = e.latLng.lat();
      const lng = e.latLng.lng();

      const { lat: shadowLat, lng: shadowLng } = getShadowCoord(
        date.toJSDate(),
        lat,
        lng,
        parseInt(height.height, 10) * height.type, // floors to meters conversion
      );
      setShadowMarkers(current => [
        ...current,
        {
          lat: shadowLat,
          lng: shadowLng,
        },
      ]);
      setMarkers(current => [
        ...current,
        {
          lat,
          lng,
        },
      ]);
    },
    [date, height, setMarkers, setShadowMarkers],
  );

  useEffect(() => {
    let newShadowMarkers: Array<Coord> = [];

    markers.forEach(({ lat, lng }) => {
      newShadowMarkers.push(
        getShadowCoord(date.toJSDate(), lat, lng, parseInt(height.height, 10) * height.type),
      ); // floors to meters conversion
    });
    setShadowMarkers(newShadowMarkers);
  }, [date, markers, setShadowMarkers, height]);

  const onCenterChanged = React.useCallback(() => {
    const lat = map?.getCenter().lat();
    const lng = map?.getCenter().lng();
    if (lat && lng) {
      setCenter(new google.maps.LatLng(lat, lng));
    }
  }, [map, setCenter]);

  useDebounce(
    () => {
      if (!center.equals(debouncedCenter)) {
        setDebouncedCenter(center);
      }
    },
    500,
    [center],
  );

  return (
    <MapContainer>
      <GoogleMap
        mapContainerStyle={containerStyle}
        zoom={debouncedCenter.equals(new google.maps.LatLng(50, 20)) ? 5 : 15}
        center={debouncedCenter}
        options={options}
        onLoad={onMapLoad}
        onClick={onMapClick}
        onCenterChanged={onCenterChanged}>
        <MapContent
          markers={markers}
          setMarkers={setMarkers}
          shadowMarkers={shadowMarkers}
          date={date}
          center={debouncedCenter}
        />
      </GoogleMap>
    </MapContainer>
  );
};

export default Map;

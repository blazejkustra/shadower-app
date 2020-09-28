import React, { useState, useEffect } from "react";
import { GoogleMap } from "@react-google-maps/api";

import mapStyles from "../styles/mapStyles";
import MapContent from "./MapContent";
import { Coord, getShadowCoord } from "../utils/sun";
import { Height } from "./MainLayout";
import { useDebounce } from "react-use";

interface MapProps {
  map: google.maps.Map | null;
  setMap: (map: google.maps.Map | null) => void;
  date: moment.Moment;
  height: Height;
  center: google.maps.LatLng;
  setCenter: (center: google.maps.LatLng) => void;
}

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const options: google.maps.MapOptions = {
  disableDefaultUI: true,
  mapTypeControl: true,
  zoomControlOptions: {
    position: 9,
  },
  styles: mapStyles,
  mapTypeControlOptions: {
    position: 9,
    mapTypeIds: ["satellite", "roadmap"],
  },
  tilt: 0,
};

const Map: React.FC<MapProps> = ({
  map,
  setMap,
  date,
  height,
  center: debouncedCenter,
  setCenter: setDebouncedCenter,
}) => {
  const [markers, setMarkers] = useState<Array<Coord>>([
    { lat: 50.085363020659436, lng: 19.846802311638804 },
  ]);
  const [shadowMarkers, setShadowMarkers] = useState<Array<Coord>>([]);
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

      setMarkers(current => [
        ...current,
        {
          lat,
          lng,
        },
      ]);

      const { lat: shadowLat, lng: shadowLng } = getShadowCoord(
        date.toDate(),
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
    },
    [date, height],
  );

  useEffect(() => {
    let newShadowMarkers: Array<Coord> = [];

    markers.forEach(({ lat, lng }) => {
      newShadowMarkers.push(
        getShadowCoord(date.toDate(), lat, lng, parseInt(height.height, 10) * height.type),
      ); // floors to meters conversion
    });

    setShadowMarkers(newShadowMarkers);
  }, [date, markers, height]);

  const onCenterChanged = React.useCallback(() => {
    const lat = map?.getCenter().lat();
    const lng = map?.getCenter().lng();
    if (lat && lng) {
      setCenter(new google.maps.LatLng(lat, lng));
    }
  }, [map, setCenter]);

  useDebounce(
    () => {
      setDebouncedCenter(center);
    },
    1000,
    [center],
  );

  return (
    <>
      <button
        style={{ zIndex: 1000, position: "absolute", top: "10rem" }}
        onClick={() => {
          setMarkers([]);
          setShadowMarkers([]);
        }}>
        reset
      </button>

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
    </>
  );
};

export default Map;

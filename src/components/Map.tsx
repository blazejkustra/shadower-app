import React, { useState, useEffect } from "react";
import { GoogleMap } from "@react-google-maps/api";

import mapStyles from "../styles/mapStyles";
import MapContent from "./MapContent";
import { Coord, getShadowCoord } from "../utils/sun";

interface MapProps {
  map: google.maps.Map | null;
  setMap: (map: google.maps.Map | null) => void;
  date: moment.Moment;
}

const containerStyle = {
  width: "100vw",
  height: "100vh",
};

const center = {
  lat: 50.049683,
  lng: 19.944544,
};

const zoom = 18;

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

const Map: React.FC<MapProps> = ({ map, setMap, date }) => {
  const [markers, setMarkers] = useState<Array<Coord>>([]);
  const [shadowMarkers, setShadowMarkers] = useState<Array<Coord>>([]);

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

      const { lat: shadowLat, lng: shadowLng } = getShadowCoord(date.toDate(), lat, lng, 10);
      setShadowMarkers(current => [
        ...current,
        {
          lat: shadowLat,
          lng: shadowLng,
        },
      ]);
    },
    [date],
  );

  useEffect(() => {
    let newShadowMarkers: Array<Coord> = [];

    markers.forEach(({ lat, lng }) => {
      newShadowMarkers.push(getShadowCoord(date.toDate(), lat, lng, 10));
    });

    setShadowMarkers(newShadowMarkers);
  }, [date, markers]);

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
        zoom={zoom}
        center={center}
        options={options}
        onLoad={onMapLoad}
        onClick={onMapClick}>
        <MapContent
          markers={markers}
          setMarkers={setMarkers}
          shadowMarkers={shadowMarkers}
          date={date}
        />
      </GoogleMap>
    </>
  );
};

export default Map;

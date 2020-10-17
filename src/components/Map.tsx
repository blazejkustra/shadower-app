import React, { useState, useEffect } from "react";
import { GoogleMap } from "@react-google-maps/api";

import mapStyles from "../styles/mapStyles";
import MapContent from "./MapContent";
import { Coord, getShadowCoord } from "../utils/sun";
import { Height } from "./MainLayout";
import { useDebounce } from "react-use";
import { DateTime, Duration } from "luxon";
import styled from "styled-components";
import { MapType } from "./MapFunctions";

interface MapProps {
  map: google.maps.Map | null;
  setMap: (map: google.maps.Map | null) => void;
  date: DateTime;
  timezone: string;
  height: Height[];
  debouncedCenter: google.maps.LatLng;
  setDebouncedCenter: (center: google.maps.LatLng) => void;
  activeIndex: number;
  markers: Array<Array<Coord>>;
  setMarkers: React.Dispatch<React.SetStateAction<Array<Array<Coord>>>>;
  shadowMarkers: Array<Array<Coord>>;
  setShadowMarkers: React.Dispatch<React.SetStateAction<Array<Array<Coord>>>>;
  mapType: MapType;
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
  gestureHandling: "greedy",
};

const Map: React.FC<MapProps> = ({
  map,
  setMap,
  date,
  timezone,
  height,
  debouncedCenter,
  setDebouncedCenter,
  activeIndex,
  markers,
  setMarkers,
  shadowMarkers,
  setShadowMarkers,
  mapType,
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
      const objectCoord = { lat: e.latLng.lat(), lng: e.latLng.lng() };

      const coordAlreadyExist = markers[activeIndex].some(
        marker => marker.lat === objectCoord.lat && marker.lng === objectCoord.lng,
      );
      if (coordAlreadyExist) {
        return;
      }

      const dateWithTimezone = DateTime.fromISO(date.toISO(), { zone: timezone });
      const dateAtCenter = date.plus(
        Duration.fromObject({ hours: date.hour - dateWithTimezone.hour }),
      );

      const shadowCoord = getShadowCoord(
        dateAtCenter,
        objectCoord.lat,
        objectCoord.lng,
        parseInt(height[activeIndex].height, 10) * height[activeIndex].type,
      );

      setShadowMarkers(current => {
        return current.map((markersGroup, groupIndex) =>
          groupIndex === activeIndex ? [...markersGroup, shadowCoord] : markersGroup,
        );
      });

      setMarkers(current => {
        return current.map((markersGroup, groupIndex) =>
          groupIndex === activeIndex ? [...markersGroup, objectCoord] : markersGroup,
        );
      });
    },
    [date, height, markers, setMarkers, setShadowMarkers, activeIndex, timezone],
  );

  useEffect(() => {
    let newShadowMarkers: Array<Array<Coord>> = [[], [], [], []];

    markers.forEach((markersGroup, groupIndex) => {
      markersGroup.forEach(({ lat, lng }) => {
        const dateWithTimezone = DateTime.fromISO(date.toISO(), { zone: timezone });
        const dateAtCenter = date.plus(
          Duration.fromObject({ hours: date.hour - dateWithTimezone.hour }),
        );
        newShadowMarkers[groupIndex].push(
          getShadowCoord(
            dateAtCenter,
            lat,
            lng,
            parseInt(height[groupIndex].height, 10) * height[groupIndex].type,
          ),
        );
      });
    });

    setShadowMarkers(newShadowMarkers);
  }, [date, markers, setShadowMarkers, height, timezone]);

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
        zoom={5}
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
          timezone={timezone}
          center={debouncedCenter}
          activeIndex={activeIndex}
          mapType={mapType}
        />
      </GoogleMap>
    </MapContainer>
  );
};

export default Map;

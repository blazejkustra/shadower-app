import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { SmallButton } from "./atoms/Buttons";
import { mediaQuery } from "./theme";

export enum MapType {
  Satellite = "satellite",
  Map = "roadmap",
}

interface MapFunctionsProps {
  map: google.maps.Map | null;
  mapType: MapType;
  setMapType: React.Dispatch<React.SetStateAction<MapType>>;
  setCenter: (center: google.maps.LatLng) => void;
}

const ButtonWrapper = styled.div`
  display: flex;
  justify-content: flex-end;
  align-items: flex-end;
  margin-bottom: 0.5rem;

  ${mediaQuery.sm} {
    padding-right: 0.5rem;
  }
`;

const MapTypeButton = styled(SmallButton)`
  height: 2.125rem;
`;

const LocationButton = styled(SmallButton)`
  width: 2.125rem;
  height: 2.125rem;

  padding: 0.3125rem;
  margin-left: 0.5rem;
`;

const Icon = styled.img`
  pointer-events: none;
`;

const MapFunctions: React.FC<MapFunctionsProps> = ({ map, mapType, setMapType, setCenter }) => {
  const [isLocationLoading, setLocationLoading] = useState(false);
  useEffect(() => {
    if (map) {
      map.setMapTypeId(mapType);
    }
  }, [map, mapType]);

  const getLocation = () => {
    const showPosition = ({ coords }: Position) => {
      setCenter(new google.maps.LatLng(coords.latitude, coords.longitude));
      map?.setZoom(17);
      setLocationLoading(false);
    };

    const onError = () => {
      setLocationLoading(false);
    };

    if (navigator.geolocation) {
      setLocationLoading(true);
      navigator.geolocation.getCurrentPosition(showPosition, onError);
    }
  };

  return (
    <ButtonWrapper>
      {mapType === MapType.Map ? (
        <>
          <MapTypeButton onClick={() => setMapType(MapType.Satellite)}>
            Satellite View
          </MapTypeButton>
          <LocationButton onClick={() => getLocation()}>
            {isLocationLoading ? (
              <Icon src="icons/loading.svg" />
            ) : (
              <Icon src="icons/compass.svg" />
            )}
          </LocationButton>
        </>
      ) : (
        <>
          <MapTypeButton white onClick={() => setMapType(MapType.Map)}>
            Map View
          </MapTypeButton>
          <LocationButton white onClick={() => getLocation()}>
            {isLocationLoading ? (
              <Icon src="icons/loading.svg" />
            ) : (
              <Icon src="icons/compass-black.svg" />
            )}
          </LocationButton>
        </>
      )}
    </ButtonWrapper>
  );
};

export default MapFunctions;

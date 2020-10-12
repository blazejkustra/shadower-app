import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { SmallButton } from "./atoms/Buttons";

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
  margin-bottom: 0.5rem;
`;

const LastButton = styled(SmallButton)`
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
          <SmallButton onClick={() => setMapType(MapType.Satellite)}>Satellite View</SmallButton>
          <LastButton onClick={() => getLocation()}>
            {isLocationLoading ? (
              <Icon src="icons/loading.svg" />
            ) : (
              <Icon src="icons/compass.svg" />
            )}
          </LastButton>
        </>
      ) : (
        <>
          <SmallButton white onClick={() => setMapType(MapType.Map)}>
            Map View
          </SmallButton>
          <LastButton white onClick={() => getLocation()}>
            {isLocationLoading ? (
              <Icon src="icons/loading.svg" />
            ) : (
              <Icon src="icons/compass-black.svg" />
            )}
          </LastButton>
        </>
      )}
    </ButtonWrapper>
  );
};

export default MapFunctions;

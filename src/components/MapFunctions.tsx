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
}

const StyledButton = styled(SmallButton)`
  box-shadow: 0px 16px 16px 0px rgb(9, 14, 37, 0.15);
`;

const MapFunctions: React.FC<MapFunctionsProps> = ({ map, mapType, setMapType }) => {
  useEffect(() => {
    if (map) {
      map.setMapTypeId(mapType);
    }
  }, [map, mapType]);

  return (
    <div>
      {mapType === MapType.Map ? (
        <StyledButton onClick={() => setMapType(MapType.Satellite)}>Satellite View</StyledButton>
      ) : (
        <StyledButton white onClick={() => setMapType(MapType.Map)}>
          Map View
        </StyledButton>
      )}
    </div>
  );
};

export default MapFunctions;

import React, { useEffect, useState } from "react";
import styled from "styled-components";

import { SmallButton } from "./atoms/Buttons";

enum MapType {
  Satellite = "satellite",
  Map = "roadmap",
}

const StyledButton = styled(SmallButton)`
  position: absolute;
  box-shadow: 0px 16px 16px 0px rgb(9, 14, 37, 0.15);
  bottom: 8rem;
  right: 0rem;
`;

const TypePicker: React.FC<{ map: google.maps.Map | null }> = ({ map }) => {
  const [mapType, setMapType] = useState(MapType.Map);

  useEffect(() => {
    if (map) {
      map.setMapTypeId(mapType);
    }
  }, [map, mapType]);

  return (
    <>
      {mapType === MapType.Map ? (
        <StyledButton onClick={() => setMapType(MapType.Satellite)}>Satellite View</StyledButton>
      ) : (
        <StyledButton onClick={() => setMapType(MapType.Map)}>Map View</StyledButton>
      )}
    </>
  );
};

export default TypePicker;

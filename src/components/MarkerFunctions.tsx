import React from "react";
import styled from "styled-components";

import { SmallButton } from "./atoms/Buttons";
import { Coord } from "../utils/sun";
import { MapType } from "./MapFunctions";

interface MarkersFunctionsProps {
  setMarkers: React.Dispatch<React.SetStateAction<Array<Coord>>>;
  setShadowMarkers: React.Dispatch<React.SetStateAction<Array<Coord>>>;
  mapType: MapType;
}

const StyledButton = styled(SmallButton)`
  box-shadow: 0px 16px 16px 0px rgb(9, 14, 37, 0.1);
`;

const MarkersFunctions: React.FC<MarkersFunctionsProps> = ({
  setMarkers,
  setShadowMarkers,
  mapType,
}) => {
  return (
    <div>
      <StyledButton
        white={mapType === MapType.Satellite}
        style={{ marginRight: "1rem" }}
        onClick={() => {
          setMarkers([]);
          setShadowMarkers([]);
        }}>
        Reset all
      </StyledButton>
      <StyledButton
        white={mapType === MapType.Satellite}
        onClick={() => {
          setMarkers([]);
          setShadowMarkers([]);
        }}>
        Add new shape
      </StyledButton>
    </div>
  );
};

export default MarkersFunctions;

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

const Button = styled(SmallButton)`
  margin-bottom: 0.5rem;
`;

const FirstButton = styled(Button)`
  margin-right: 0.5rem;
`;

const MarkersFunctions: React.FC<MarkersFunctionsProps> = ({
  setMarkers,
  setShadowMarkers,
  mapType,
}) => {
  return (
    <div>
      <FirstButton
        white={mapType === MapType.Satellite}
        onClick={() => {
          setMarkers([]);
          setShadowMarkers([]);
        }}>
        Reset all
      </FirstButton>
      <Button
        white={mapType === MapType.Satellite}
        onClick={() => {
          setMarkers([]);
          setShadowMarkers([]);
        }}>
        Add new shape
      </Button>
    </div>
  );
};

export default MarkersFunctions;

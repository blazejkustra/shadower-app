import React from "react";
import styled from "styled-components";

import { SmallButton } from "./atoms/Buttons";
import { Coord } from "../utils/sun";
import { MapType } from "./MapFunctions";

interface MarkersFunctionsProps {
  setMarkers: React.Dispatch<React.SetStateAction<Array<Array<Coord>>>>;
  setShadowMarkers: React.Dispatch<React.SetStateAction<Array<Array<Coord>>>>;
  mapType: MapType;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const ButtonWrapper = styled.div`
  display: flex;
  margin-bottom: 0.5rem;
`;

const ShapeButton = styled(SmallButton)<{ active: boolean }>`
  width: 34px;
  padding: 0;
  margin-left: 0.5rem;

  font-size: 1rem;
  font-weight: ${props => (props.active ? 700 : 400)};
  background-color: ${p =>
    p.white
      ? p.active
        ? p.theme.colors.dark10
        : p.theme.colors.white
      : p.active
      ? p.theme.colors.purple70
      : p.theme.colors.purple100};
`;

const MarkersFunctions: React.FC<MarkersFunctionsProps> = ({
  setMarkers,
  setShadowMarkers,
  mapType,
  activeIndex,
  setActiveIndex,
}) => {
  return (
    <ButtonWrapper>
      <SmallButton
        white={mapType === MapType.Satellite}
        onClick={() => {
          setMarkers([[], [], [], []]);
          setShadowMarkers([[], [], [], []]);
        }}>
        Reset all
      </SmallButton>
      {["A", "B", "C", "D"].map((key, index) => (
        <ShapeButton
          key={key}
          white={mapType === MapType.Satellite}
          active={activeIndex === index}
          onClick={() => setActiveIndex(index)}>
          {key}
        </ShapeButton>
      ))}
    </ButtonWrapper>
  );
};

export default MarkersFunctions;

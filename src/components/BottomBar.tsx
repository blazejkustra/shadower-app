import React from "react";

import styled from "styled-components";

import "rc-slider/assets/index.css";
import { Grid } from "react-styled-flexboxgrid";
import { mediaQuery } from "./theme";
import TimePicker from "./TimePicker";
import MapFunctions from "./MapFunctions";
import MarkerFunctions from "./MarkerFunctions";
import { Coord } from "../utils/sun";
import { MapType } from "./MapFunctions";

interface BottomBarProps {
  date: moment.Moment;
  setDate: (value: moment.Moment) => void;
  map: google.maps.Map | null;
  setMarkers: React.Dispatch<React.SetStateAction<Array<Coord>>>;
  setShadowMarkers: React.Dispatch<React.SetStateAction<Array<Coord>>>;
  mapType: MapType;
  setMapType: React.Dispatch<React.SetStateAction<MapType>>;
}

const Bar = styled.div`
  position: absolute;
  left: 0rem;
  bottom: 2rem;
  width: 100%;
  z-index: 10;

  ${mediaQuery.sm} {
    bottom: 0rem;
  }
`;

const StyledGrid = styled(Grid)`
  position: relative;
  background-color: ${props => props.theme.colors.white};
  box-shadow: 0px 24px 24px 0px rgb(9, 14, 37, 0.1);
  border-radius: 1rem;
  padding: 1rem 3rem 3rem 3rem;

  ${mediaQuery.sm} {
    border-radius: 0rem;
  }
`;

const FunctionsWrapper = styled.div`
  position: absolute;
  bottom: 8rem;
  left: 0rem;
  width: 100%;
  display: flex;
  justify-content: space-between;
`;

const BottomBar: React.FC<BottomBarProps> = ({
  date,
  setDate,
  map,
  setMarkers,
  setShadowMarkers,
  mapType,
  setMapType,
}) => {
  return (
    <Bar>
      <StyledGrid>
        <FunctionsWrapper>
          <MarkerFunctions
            setMarkers={setMarkers}
            setShadowMarkers={setShadowMarkers}
            mapType={mapType}
          />
          <MapFunctions map={map} mapType={mapType} setMapType={setMapType} />
        </FunctionsWrapper>
        <TimePicker date={date} setDate={setDate} />
      </StyledGrid>
    </Bar>
  );
};

export default BottomBar;

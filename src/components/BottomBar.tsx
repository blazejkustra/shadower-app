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
import { DateTime } from "luxon";

interface BottomBarProps {
  timezone: string;
  date: DateTime;
  setDate: (value: DateTime) => void;
  map: google.maps.Map | null;
  setMarkers: React.Dispatch<React.SetStateAction<Array<Coord>>>;
  setShadowMarkers: React.Dispatch<React.SetStateAction<Array<Coord>>>;
  mapType: MapType;
  setMapType: React.Dispatch<React.SetStateAction<MapType>>;
  center: google.maps.LatLng;
  setCenter: (center: google.maps.LatLng) => void;
}

const Bar = styled.div`
  position: absolute;
  bottom: 2rem;
  left: 0rem;
  z-index: 30;

  width: 100%;

  ${mediaQuery.sm} {
    bottom: 0rem;
  }
`;

const StyledGrid = styled(Grid)`
  padding: 0;
`;

const FunctionsWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;

  ${mediaQuery.sm} {
    padding: 0 0.5rem;
  }
`;

const BottomBar: React.FC<BottomBarProps> = ({
  date,
  setDate,
  map,
  setMarkers,
  setShadowMarkers,
  mapType,
  setMapType,
  center,
  timezone,
  setCenter,
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
          <MapFunctions map={map} mapType={mapType} setMapType={setMapType} setCenter={setCenter} />
        </FunctionsWrapper>
        <TimePicker timezone={timezone} date={date} setDate={setDate} center={center} />
      </StyledGrid>
    </Bar>
  );
};

export default BottomBar;

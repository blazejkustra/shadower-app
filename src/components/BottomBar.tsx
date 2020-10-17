import React from "react";

import styled from "styled-components";

import "rc-slider/assets/index.css";
import { Grid } from "react-styled-flexboxgrid";
import { mediaQuery } from "./theme";
import TimePicker from "./TimePicker";
import MapFunctions from "./MapFunctions";
import { MapType } from "./MapFunctions";
import { DateTime } from "luxon";

interface BottomBarProps {
  timezone: string;
  date: DateTime;
  setDate: (value: DateTime) => void;
  map: google.maps.Map | null;
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

const BottomBar: React.FC<BottomBarProps> = ({
  date,
  setDate,
  map,
  mapType,
  setMapType,
  center,
  timezone,
  setCenter,
}) => {
  return (
    <Bar>
      <StyledGrid>
        <MapFunctions map={map} mapType={mapType} setMapType={setMapType} setCenter={setCenter} />
        <TimePicker timezone={timezone} date={date} setDate={setDate} center={center} />
      </StyledGrid>
    </Bar>
  );
};

export default BottomBar;

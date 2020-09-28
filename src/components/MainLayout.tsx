import React, { useState, useEffect } from "react";
import { usePosition } from "../utils/hooks";

import NavBar from "./NavBar";
import Map from "./Map";
import TimePicker from "./TimePicker";

import styled from "styled-components";
import moment from "moment";

export enum HeightType {
  Meters = 1,
  Floors = 3,
}

export interface Height {
  type: HeightType;
  height: string;
}

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
`;

const MainLayout: React.FC = () => {
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [date, setDate] = useState<moment.Moment>(moment());
  const [height, setHeight] = useState<Height>({ type: HeightType.Floors, height: "1" });
  const { center, setCenter } = usePosition();

  useEffect(() => {
    // TODO delete
    // console.log(height);
  }, [height]);

  return (
    <Layout>
      <NavBar
        map={map}
        date={date}
        setDate={setDate}
        height={height}
        setHeight={setHeight}
        center={center}
      />
      <TimePicker date={date} setDate={setDate} />
      <Map
        setMap={setMap}
        map={map}
        date={date}
        height={height}
        center={center}
        setCenter={setCenter}
      />
    </Layout>
  );
};

export default MainLayout;

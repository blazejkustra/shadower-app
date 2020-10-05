import React, { useState, useEffect } from "react";
import { usePosition } from "../utils/hooks";

import NavBar from "./NavBar";
import Map from "./Map";
import BottomBar from "./BottomBar";
import { Coord } from "../utils/sun";
import { MapType } from "./MapFunctions";

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
// TODO:
// dodac wprowadzenie - instrukcje
// dodac znak x na usuniecie markera
// funkcja dodawania wielu budynkow
// usunac cien przesuwaka na sliderze
// zmienic 6am 6pm na sliderze jesli chodzi o godziny zachodu wschodu
// ogarnac
// ladowanie oraz error ladowania mapy
// lokalizacja wlasna jako przycisk na dole
// zmienic styl mapy
// 

const MainLayout: React.FC = () => {
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [date, setDate] = useState<moment.Moment>(moment());
  const [height, setHeight] = useState<Height>({ type: HeightType.Floors, height: "1" });
  const [markers, setMarkers] = useState<Array<Coord>>([]);
  const [shadowMarkers, setShadowMarkers] = useState<Array<Coord>>([]);
  const [mapType, setMapType] = useState(MapType.Map);

  const { center, setCenter } = usePosition();

  useEffect(() => {
    // TODO delete
    // console.log(map);
  }, [map]);

  return (
    <Layout>
      <NavBar
        map={map}
        date={date}
        setDate={setDate}
        height={height}
        setHeight={setHeight}
        center={center}
        setMarkers={setMarkers}
        setShadowMarkers={setShadowMarkers}
      />
      <BottomBar
        map={map}
        date={date}
        setDate={setDate}
        setMarkers={setMarkers}
        setShadowMarkers={setShadowMarkers}
        mapType={mapType}
        setMapType={setMapType}
      />
      <Map
        setMap={setMap}
        map={map}
        date={date}
        height={height}
        debouncedCenter={center}
        setDebouncedCenter={setCenter}
        markers={markers}
        setMarkers={setMarkers}
        shadowMarkers={shadowMarkers}
        setShadowMarkers={setShadowMarkers}
      />
    </Layout>
  );
};

export default MainLayout;

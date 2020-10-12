import React, { useState, useEffect } from "react";

import TopBar from "./TopBar";
import Map from "./Map";
import BottomBar from "./BottomBar";
import { Coord } from "../utils/sun";
import { MapType } from "./MapFunctions";

import styled from "styled-components";
import { DateTime } from "luxon";
import tzLookup from "tz-lookup";

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
// blad z markerem w tym samym miejscu
// poszukac wiecej bledow, zwalidowac dlugosc cieni
// dokladnosc stawiania markerow, zmienic number na long number

const MainLayout: React.FC = () => {
  const [map, setMap] = React.useState<google.maps.Map | null>(null);
  const [date, setDate] = useState<DateTime>(DateTime.local());
  const [timezone, setTimezone] = useState<string>("");
  const [height, setHeight] = useState<Height>({ type: HeightType.Floors, height: "1" });
  const [markers, setMarkers] = useState<Array<Array<Coord>>>([[], [], [], []]);
  const [shadowMarkers, setShadowMarkers] = useState<Array<Array<Coord>>>([[], [], [], []]);
  const [activeIndex, setActiveIndex] = useState<number>(0);
  const [mapType, setMapType] = useState(MapType.Map);
  const [center, setCenter] = useState<google.maps.LatLng>(new google.maps.LatLng(50, 20));

  useEffect(() => {
    setTimezone(tzLookup(center.lat(), center.lng()));
  }, [center]);

  return (
    <Layout>
      <TopBar
        map={map}
        date={date}
        setDate={setDate}
        height={height}
        setHeight={setHeight}
        center={center}
      />
      <BottomBar
        map={map}
        timezone={timezone}
        date={date}
        setDate={setDate}
        setMarkers={setMarkers}
        setShadowMarkers={setShadowMarkers}
        mapType={mapType}
        setMapType={setMapType}
        center={center}
        setCenter={setCenter}
        activeIndex={activeIndex}
        setActiveIndex={setActiveIndex}
      />
      <Map
        setMap={setMap}
        map={map}
        date={date}
        timezone={timezone}
        height={height}
        debouncedCenter={center}
        setDebouncedCenter={setCenter}
        activeIndex={activeIndex}
        markers={markers}
        setMarkers={setMarkers}
        shadowMarkers={shadowMarkers}
        setShadowMarkers={setShadowMarkers}
        mapType={mapType}
      />
    </Layout>
  );
};

export default MainLayout;

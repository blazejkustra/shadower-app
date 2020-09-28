import React, { useCallback, useState } from "react";
import { Coord, isDay } from "../utils/sun";
import { Circle, Polygon, GroundOverlay } from "@react-google-maps/api";
import styled from "styled-components";
interface MapContentProps {
  markers: Array<Coord>;
  setMarkers: (markers: Array<Coord>) => void;
  shadowMarkers: Array<Coord>;
  date: moment.Moment;
  center: google.maps.LatLng | null;
}

interface selectProps {
  marker: Coord;
  index: number;
}

const circleOptions = {
  fillColor: "#5300D0",
  fillOpacity: 1,
  strokeOpacity: 0,
  strokeWeight: 1,
  clickable: true,
  draggable: true,
  zIndex: 3,
};

const circleHoverOptions = {
  fillColor: "#6F12DE",
  fillOpacity: 1,
  strokeOpacity: 0,
  strokeWeight: 1,
  clickable: true,
  draggable: true,
  zIndex: 3,
};

const polygonOptions = {
  fillColor: "#BB96EF",
  fillOpacity: 1,
  strokeColor: "#5300D0",
  strokeOpacity: 1,
  strokeWeight: 3,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: true,
  zIndex: 2,
};

const ShadowPolygonOptions = {
  fillColor: "#090E25",
  fillOpacity: 0.25,
  strokeWeight: 0,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1,
};

const MapContent: React.FC<MapContentProps> = ({
  markers,
  setMarkers,
  shadowMarkers,
  date,
  center,
}) => {
  const [markerHovered, setHover] = useState<Coord | null>(null);

  const onCircleDrag = useCallback(
    (e: google.maps.MouseEvent, index: number) => {
      setMarkers(
        markers.map((marker, markerIndex) => {
          if (markerIndex === index) {
            return { lat: e.latLng.lat(), lng: e.latLng.lng() };
          } else {
            return marker;
          }
        }),
      );
    },
    [markers, setMarkers],
  );

  const deleteMarker = useCallback(
    (markerToDelete: Coord, indexToDelete: number) => {
      setMarkers(
        markers.filter((marker, index) => markerToDelete !== marker && indexToDelete !== index),
      );
    },
    [markers, setMarkers],
  );

  const showShadows = isDay(date.toDate(), center?.lat(), center?.lng());

  return (
    <>
      {markers.map((marker, index) => (
        <Circle
          key={`${marker.lat}-${marker.lng}-${index}-circle`}
          center={marker}
          radius={1.5}
          options={marker === markerHovered ? circleHoverOptions : circleOptions}
          onDragStart={() => setHover(null)}
          onDragEnd={e => onCircleDrag(e, index)}
          onMouseOver={() => setHover(marker)}
          onMouseOut={() => setHover(null)}
          onClick={() => deleteMarker(marker, index)}
        />
      ))}
      <Polygon paths={markers} options={polygonOptions} />
      {showShadows &&
        markers.map((_, index) => {
          const polygon = [
            markers[index],
            shadowMarkers[index],
            shadowMarkers[(index + 1) % shadowMarkers.length],
            markers[(index + 1) % shadowMarkers.length],
          ];

          return polygon.some(p => !p) ? null : (
            <Polygon key={index} paths={polygon} options={ShadowPolygonOptions} />
          );
        })}
    </>
  );
};

export default MapContent;

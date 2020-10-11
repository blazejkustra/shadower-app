import React, { useCallback, useState } from "react";
import { Coord, isDay } from "../utils/sun";
import { getShadowPolygons } from "../utils/polygons";
import { Circle, Polygon } from "@react-google-maps/api";
import { DateTime } from "luxon";

interface MapContentProps {
  markers: Array<Array<Coord>>;
  setMarkers: React.Dispatch<React.SetStateAction<Array<Array<Coord>>>>;
  shadowMarkers: Array<Array<Coord>>;
  date: DateTime;
  center: google.maps.LatLng | null;
  activeIndex: number;
}

const circleOptions = {
  fillColor: "#5300D0",
  fillOpacity: 1,
  strokeWeight: 0,
  clickable: true,
  draggable: true,
  zIndex: 3,
};

const circleHoverOptions = {
  fillColor: "#6F12DE",
  fillOpacity: 1,
  strokeWeight: 0,
  clickable: true,
  draggable: true,
  zIndex: 3,
};

const transparentPolygonOptions = {
  fillColor: "#8A30FD",
  fillOpacity: 0.3,
  strokeColor: "#5300D0",
  strokeOpacity: 1,
  strokeWeight: 3,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
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
  activeIndex,
}) => {
  const [markerHovered, setHover] = useState<Coord | null>(null);

  const onCircleDrag = useCallback(
    (e: google.maps.MouseEvent, index: number) => {
      const newCoord = { lat: e.latLng.lat(), lng: e.latLng.lng() };

      setMarkers(current => {
        return current.map((markersGroup, groupIndex) =>
          groupIndex === activeIndex
            ? markersGroup.map((marker, markerIndex) => {
                if (markerIndex === index) {
                  return newCoord;
                } else {
                  return marker;
                }
              })
            : markersGroup,
        );
      });
    },
    [setMarkers, activeIndex],
  );

  const deleteMarker = useCallback(
    (markerToDelete: Coord, indexToDelete: number) => {
      setMarkers(current => {
        return current.map((markersGroup, groupIndex) =>
          groupIndex === activeIndex
            ? markersGroup.filter(
                (marker, index) => markerToDelete !== marker && indexToDelete !== index,
              )
            : markersGroup,
        );
      });
    },
    [setMarkers, activeIndex],
  );

  const showShadow = isDay(date.toJSDate(), center?.lat(), center?.lng());
  const shadowPolygons = showShadow
    ? markers.map((markerGroup, index) => getShadowPolygons(markerGroup, shadowMarkers[index]))
    : [markers];

  return (
    <>
      {markers.map((markerGroup, groupIndex) => {
        return markerGroup.map((marker, index) => {
          if (groupIndex === activeIndex) {
            return (
              <Circle
                key={`${marker.lat}-${marker.lng}-${index}-${groupIndex}`}
                center={marker}
                radius={1}
                options={marker === markerHovered ? circleHoverOptions : circleOptions}
                onDragStart={() => setHover(null)}
                onDragEnd={e => onCircleDrag(e, index)}
                onMouseOver={() => setHover(marker)}
                onMouseOut={() => setHover(null)}
                onClick={() => deleteMarker(marker, index)}
              />
            );
          }
        });
      })}
      <Polygon paths={markers} options={transparentPolygonOptions} />
      {shadowPolygons.map((shadowPolygon, index: number) => (
        <Polygon paths={shadowPolygon} options={ShadowPolygonOptions} key={index} />
      ))}
    </>
  );
};

export default MapContent;

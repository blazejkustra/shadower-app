import React, { useState, useCallback } from "react";
import { Coord } from "../utils/sun";
import { Circle, Polygon, InfoWindow } from "@react-google-maps/api";

interface MapContentProps {
  markers: Array<Coord>;
  setMarkers: (markers: Array<Coord>) => void;
  shadowMarkers: Array<Coord>;
  date: moment.Moment;
}

interface selectProps {
  marker: Coord;
  index: number;
}

const circleOptions = {
  fillColor: "#cccfd3",
  fillOpacity: 1,
  strokeOpacity: 0,
  strokeWeight: 1,
  clickable: true,
  draggable: true,
  zIndex: 3,
};

const polygonOptions = {
  fillColor: "#f2f2f2",
  fillOpacity: 1,
  strokeColor: "#cccfd3",
  strokeOpacity: 1,
  strokeWeight: 1,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: true,
  zIndex: 2,
};

const ShadowPolygonOptions = {
  fillColor: "#e5e7e8",
  fillOpacity: 1,
  strokeColor: "#e5e7e8",
  strokeOpacity: 1,
  strokeWeight: 1,
  clickable: false,
  draggable: false,
  editable: false,
  geodesic: false,
  zIndex: 1,
};

const MapContent: React.FC<MapContentProps> = ({ markers, setMarkers, shadowMarkers, date }) => {
  const [selected, setSelected] = useState<selectProps | null>(null);

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

  const deleteMarker = useCallback(() => {
    if (selected) {
      setMarkers(
        markers.filter((marker, index) => marker !== selected.marker && index !== selected.index),
      );
      setSelected(null);
    }
  }, [markers, setMarkers, selected]);

  return (
    <>
      {markers.map((marker, index) => (
        <Circle
          key={`${marker.lat}-${marker.lng}-${index}-circle`}
          center={marker}
          radius={1.5}
          options={circleOptions}
          onDragEnd={e => onCircleDrag(e, index)}
          onClick={() => setSelected({ marker, index })}
        />
      ))}
      <Polygon paths={markers} options={polygonOptions} />
      {shadowMarkers.map((_, index) => {
        return (
          <Polygon
            paths={[
              markers[index],
              shadowMarkers[index],
              shadowMarkers[(index + 1) % shadowMarkers.length],
              markers[(index + 1) % shadowMarkers.length],
            ]}
            options={ShadowPolygonOptions}
          />
        );
      })}
      {selected && (
        <InfoWindow
          position={{ lat: selected.marker.lat, lng: selected.marker.lng }}
          onCloseClick={() => setSelected(null)}>
          <button onClick={deleteMarker}>Delete</button>
        </InfoWindow>
      )}
    </>
  );
};

export default MapContent;

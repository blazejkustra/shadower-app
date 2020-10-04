import React, { useCallback, useState } from "react";
import { Coord, isDay } from "../utils/sun";
import { Circle, Polygon } from "@react-google-maps/api";

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
  fillOpacity: 0,
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

// const mapCoordsToTurf = (coords: Array<Coord>): GeoJSON.Feature<GeoJSON.Polygon> => {
//   const coordsArray: Array<Array<number>> = [];

//   for (let i = 0; i < coords.length; i++) {
//     coordsArray.push([coords[i].lat, coords[i].lng]);
//   }
//   coordsArray.push([coords[0].lat, coords[0].lng]);

//   return turf.polygon([coordsArray]);
// };

// const mapTurfToCoords = (
//   turfObject: GeoJSON.Feature<GeoJSON.Polygon | GeoJSON.MultiPolygon>,
// ): Array<Coord> => {
//   const coords: Array<Coord> = [];
//   const turfCoords = (turfObject.geometry.coordinates as any) as number[][]; //TODO

//   for (let i = 1; i < turfCoords.length; i++) {
//     coords.push({ lat: turfCoords[i][0], lng: turfCoords[i][1] });
//   }

//   return coords;
// };

// const getShadowPolygon = (coords: Array<Coord>, shadowCoords: Array<Coord>) => {
//   const polygons: Array<GeoJSON.Feature<GeoJSON.Polygon>> = [];

//   for (let i = 0; i < coords.length; i++) {
//     polygons.push(
//       mapCoordsToTurf([
//         coords[i],
//         shadowCoords[i],
//         shadowCoords[(i + 1) % shadowCoords.length],
//         coords[(i + 1) % shadowCoords.length],
//       ]),
//     );
//   }

//   let turfPolygon = polygons[0];

//   for (let i = 1; i < polygons.length; i++) {
//     turfPolygon = (turf.union(turfPolygon, polygons[i]) as any) as GeoJSON.Feature<GeoJSON.Polygon>;
//   }

//   return mapTurfToCoords(turfPolygon);
// };
// if (turf) {
//   var poly1 = turf.polygon([
//     [
//       [50.0868384335779, 19.84216571682739],
//       [50.07576784656587, 19.84246612423706],
//       [50.07540979983343, 19.859889753997802],
//       [50.087031182347566, 19.85864520901489],
//       [50.0868384335779, 19.84216571682739],
//     ],
//   ]);
//   var poly2 = turf.polygon(
//     [
//       [
//         [50.080945454248486, 19.85566259259033],
//         [50.07023159432548, 19.85746503704834],
//         [50.07180164123266, 19.875746973693847],
//         [50.08221223055893, 19.870039232910155],
//         [50.080945454248486, 19.85566259259033],
//       ],
//     ],
//     { fill: "#00f" },
//   );

//   var union = turf.union(poly1, poly2);
//   console.log(union);
// }
// const turfCoords = mapCoordsToTurf(markers);
// let shadowCoords: Array<Coords> = [];
// if (markers.length >= 4) {
//   shadowCoords = getShadowPolygon(markers, shadowMarkers);
// }

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
            shadowMarkers[(index + 1) % markers.length],
            markers[(index + 1) % markers.length],
          ];
          return polygon.some(p => !p) ? null : (
            <Polygon key={index} paths={polygon} options={ShadowPolygonOptions} />
          );
        })}
    </>
  );
};

export default MapContent;

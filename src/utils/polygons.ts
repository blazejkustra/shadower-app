import { Coord } from "./sun";
import * as turf from "@turf/helpers";
import unkinkPolygon from "@turf/unkink-polygon";

export const getClockwisePolygon = (polygon: Array<Coord>) => {
  let sum = 0;
  for (let i = 0; i < polygon.length; i++) {
    const nextI = (i + 1) % polygon.length;
    sum += (polygon[nextI].lat - polygon[i].lat) * (polygon[nextI].lng + polygon[i].lng);
  }
  return sum < 0 ? polygon : polygon.reverse();
};

const mapCoordsToTurf = (coords: Array<Coord>): GeoJSON.Feature<GeoJSON.Polygon> => {
  const normalCoords: Array<Array<number>> = [];

  for (let i = 0; i < coords.length; i++) {
    normalCoords.push([coords[i].lat, coords[i].lng]);
  }
  normalCoords.push([coords[0].lat, coords[0].lng]);

  return turf.polygon([normalCoords]);
};

const mapTurfToCoords = (turfObject: GeoJSON.Feature<GeoJSON.Polygon>): Array<Coord> => {
  const normalCoords: Array<Coord> = [];
  const turfCoords = (turfObject.geometry.coordinates[0] as any) as number[][];

  for (let i = 0; i < turfCoords.length - 1; i++) {
    normalCoords.push({ lat: turfCoords[i][0], lng: turfCoords[i][1] });
  }

  return normalCoords;
};

export const getUnkinkedPolygon = (markers: Array<Coord>) => {
  if (markers.length <= 3) {
    return [getClockwisePolygon(markers)];
  }

  const turfPolygon = mapCoordsToTurf(markers);
  const turfUnkikedPolygons: GeoJSON.FeatureCollection<GeoJSON.Polygon> = unkinkPolygon(
    turfPolygon,
  );

  const normalUnkikedPolygons = turfUnkikedPolygons.features.map(feature => {
    return getClockwisePolygon(mapTurfToCoords(feature));
  });

  return normalUnkikedPolygons;
};

export const getShadowPolygons = (markers: Array<Coord>, shadowMarkers: Array<Coord>) => {
  if (markers.length === 2) {
    return [getClockwisePolygon([markers[0], shadowMarkers[0], shadowMarkers[1], markers[1]])];
  }

  const shadowPolygons = markers
    .map((_, index) => {
      const polygon = [
        markers[index],
        shadowMarkers[index],
        shadowMarkers[(index + 1) % markers.length],
        markers[(index + 1) % markers.length],
      ];

      if (polygon.some(item => !item)) {
        return [];
      }

      return getClockwisePolygon(polygon);
    })
    .filter(item => item);

  shadowPolygons.push(...getUnkinkedPolygon(markers));
  return shadowPolygons;
};

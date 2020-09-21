import SunCalc from "suncalc";

interface SunPosition {
  altitude: number;
  azimuth: number;
}

export interface Coord {
  lat: number;
  lng: number;
}

export const getSunPosition = (date: Date, lat: number, lng: number): SunPosition => {
  const { altitude, azimuth } = SunCalc.getPosition(date, lat, lng);
  return { altitude, azimuth: azimuth };
};

export const getShadowCoord = (date: Date, lat: number, lng: number, height: number): Coord => {
  if (!height) {
    return { lat, lng };
  }

  const { altitude, azimuth } = getSunPosition(date, lat, lng);
  const length = height / Math.tan(altitude) / 111111;
  const horizontal = length * Math.cos(azimuth);
  const vertical = length * Math.sin(azimuth);

  return { lat: lat + horizontal, lng: lng + vertical };
};

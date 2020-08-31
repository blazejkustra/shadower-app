import SunCalc from "suncalc";

interface SunPositionParams {
  date: Date;
  lat: number;
  lng: number;
}

interface SunPositionResult {
  altitude: number;
  azimuth: number;
}

const getSunPosition = (date: Date, lat: number, lng: number): SunPositionResult => {
  return SunCalc.getPosition(date, lat, lng);
};

export default getSunPosition;

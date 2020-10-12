import SunCalc from "suncalc";
import { DateTime } from "luxon";

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

export const getShadowCoord = (date: DateTime, lat: number, lng: number, height: number): Coord => {
  if (!height) {
    return { lat, lng };
  }

  const { altitude, azimuth } = getSunPosition(date.toJSDate(), lat, lng);
  const length = height / Math.tan(altitude) / 111111;
  const horizontal = length * Math.cos(azimuth);
  const vertical = length * Math.sin(azimuth);

  return { lat: lat + horizontal, lng: lng + vertical };
};

export const isDay = (date: Date, lat?: number, lng?: number): boolean => {
  if (!lat || !lng) {
    return false;
  }
  const { sunrise, sunset } = SunCalc.getTimes(date, lat, lng);

  const startOfDay = new Date(sunrise.getTime() + 10000 * 60);
  const EndOfDay = new Date(sunset.getTime() - 10000 * 60);

  if (date >= startOfDay && date <= EndOfDay) {
    return true;
  }

  return false;
};

export const getSunriseSunsetMinuteValues = (
  date: DateTime,
  zone: string,
  lat?: number,
  lng?: number,
) => {
  if (!lat || !lng || !zone) {
    return {};
  }

  const { sunrise, sunset } = SunCalc.getTimes(date.toJSDate(), lat, lng);

  if (isNaN(sunrise.getTime()) || isNaN(sunset.getTime())) {
    return { error: "POLAR_NIGHT_DAY" };
  }

  const sunriseEnd = DateTime.fromISO(sunrise.toISOString(), {
    zone,
  });
  const sunsetStart = DateTime.fromISO(sunset.toISOString(), {
    zone,
  });

  // console.log(sunriseEnd.toString(), sunsetStart.toString());
  const sunriseMinutes = sunriseEnd.hour * 60 + ((Math.round(sunriseEnd.minute / 5) * 5) % 60);
  const sunsetMinutes = sunsetStart.hour * 60 + ((Math.round(sunsetStart.minute / 5) * 5) % 60);

  return { sunriseMinutes, sunsetMinutes };
};

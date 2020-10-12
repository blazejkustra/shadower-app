import React, { useEffect, useState } from "react";
import CSS from "csstype";

import { useDebounce } from "react-use";
import { DateTime } from "luxon";
import styled from "styled-components";

import "rc-slider/assets/index.css";
import Slider from "rc-slider";
import { mediaQuery } from "./theme";
import { getSunriseSunsetMinuteValues } from "../utils/sun";

interface PickerProps {
  timezone: string;
  date: DateTime;
  setDate: (value: DateTime) => void;
  center: google.maps.LatLng;
}

const SliderWrapper = styled.div`
  background-color: ${props => props.theme.colors.white};
  border-radius: 1rem;
  width: 100%;
  height: 6.875rem;

  padding: 1rem 3rem;
  box-shadow: 0px 24px 24px 0px rgb(9, 14, 37, 0.1);

  ${mediaQuery.sm} {
    border-radius: 0rem;
    box-shadow: 0px -24px 24px 0px rgb(9, 14, 37, 0.1);
  }
`;

const SliderContainer = styled.div`
  position: relative;

  .rc-slider-handle:active {
    box-shadow: none;
    background-color: ${props => props.theme.colors.purple85} !important;
  }
`;

const CurrentTime = styled.div`
  width: 4.75rem;
  margin-right: auto;
  margin-bottom: 1rem;
  font-weight: 500;
  font-size: 1rem;
  line-height: 1rem;
`;

const handleStyle: CSS.Properties = {
  marginTop: "-0.9rem",
  width: "2rem",
  height: "2rem",
  border: "none",
  backgroundColor: "#5300D0",
  zIndex: 20,
};

const trackStyle: CSS.Properties = {
  backgroundColor: "#F3EFFB",
  marginTop: "-0.125rem",
  height: "0.5rem",
};

const railStyle: CSS.Properties = {
  backgroundColor: "#F3EFFB",
  marginTop: "-0.125rem",
  height: "0.5rem",
};

const dotStyle: CSS.Properties = {
  display: "none",
};

const StyledIcon = styled.img<{ position: number; edge?: boolean }>`
  position: absolute;
  z-index: 10;
  pointer-events: none;

  top: 1.675rem;
  left: calc(${props => props.position}% - ${props => (props.edge ? "0.75rem" : "0.625rem")});
`;

const Label = styled.div<{ position: number; edge?: boolean }>`
  position: absolute;
  top: 3.5rem;
  left: calc(${props => props.position}% - ${props => (props.edge ? "1.25rem" : "1.75rem")});
  min-width: 3.5rem;

  color: #787a87;
  cursor: pointer;
`;

const TimePicker: React.FC<PickerProps> = ({ date, setDate, center, timezone }) => {
  const [value, setValue] = useState(Math.round((date.hour * 60 + date.minute) / 5) * 5);
  const [sunriseValue, setSunriseValue] = useState(360);
  const [sunsetValue, setSunsetValue] = useState(1080);
  const [iconsVisible, setIconsVisible] = useState(true);

  const onChange = (value: number) => {
    setValue(value);
  };

  useDebounce(
    () => {
      setDate(
        date.set({
          hour: Math.floor(value / 60),
          minute: value % 60,
        }),
      );
    },
    10,
    [value],
  );

  useEffect(() => {
    const dateAtCenter = DateTime.fromISO(DateTime.local().set({ hour: 12, minute: 0 }).toISO(), {
      zone: timezone,
    });
    const { sunriseMinutes, sunsetMinutes, error } = getSunriseSunsetMinuteValues(
      dateAtCenter,
      timezone,
      center.lat(),
      center.lng(),
    );

    if (error) {
      setIconsVisible(false);
    }

    if (sunriseMinutes && sunsetMinutes) {
      setSunriseValue(sunriseMinutes);
      setSunsetValue(sunsetMinutes);
      setIconsVisible(true);
    }
  }, [center, date, timezone]);

  const middayValue = Math.round((sunriseValue + sunsetValue) / 10) * 5;

  let marks = {
    0: "12 AM",
    [sunriseValue]: "SUNRISE",
    [middayValue]: "MIDDAY",
    [sunsetValue]: "SUNSET",
    1435: "12 AM",
  };

  const time = date.toFormat("h:mm a");

  const sunrisePosition = (sunriseValue / 1435) * 100;
  const sunsetPosition = (sunsetValue / 1435) * 100;
  const middayPosition = (sunrisePosition + sunsetPosition) / 2;

  return (
    <SliderWrapper>
      <SliderContainer>
        <CurrentTime style={{ marginLeft: `calc(${value / 14.35}% - 2rem)` }}>{time}</CurrentTime>
        <StyledIcon src="/icons/slider-12am.svg" alt="Moon" position={0} edge />
        {iconsVisible && (
          <>
            <StyledIcon src="/icons/slider-6am.svg" alt="Sunrise" position={sunrisePosition} />
            <StyledIcon src="/icons/slider-12pm.svg" alt="Sun" position={middayPosition} />
            <StyledIcon src="/icons/slider-6pm.svg" alt="Sunset" position={sunsetPosition} />
          </>
        )}
        <StyledIcon src="/icons/slider-12am.svg" alt="Moon" position={100} edge />
        {Object.entries(marks).map(([position, value], index) =>
          iconsVisible || index === 0 || index === 4 ? (
            <Label
              key={`${position}${value}`}
              position={(parseFloat(position) / 1435) * 100}
              edge={index === 0 || index === 4}
              onClick={() => setValue(parseInt(position))}>
              {value}
            </Label>
          ) : null,
        )}
        <Slider
          max={1435}
          step={5}
          value={value}
          onChange={(value: number) => onChange(value)}
          handleStyle={handleStyle}
          trackStyle={trackStyle}
          dotStyle={dotStyle}
          railStyle={railStyle}
        />
      </SliderContainer>
    </SliderWrapper>
  );
};

export default TimePicker;

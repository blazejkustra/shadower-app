import React, { useState } from "react";
import CSS from "csstype";

import { useDebounce } from "react-use";
import moment from "moment";
import styled from "styled-components";

import "rc-slider/assets/index.css";
import Slider from "rc-slider";

interface PickerProps {
  date: moment.Moment;
  setDate: (value: moment.Moment) => void;
}

const marks = {
  0: { style: { color: "#787A87", width: "4.5rem", top: "0.5rem" }, label: "12 AM" },
  360: { style: { color: "#787A87", width: "4.5rem", top: "0.5rem" }, label: "6 AM" },
  720: { style: { color: "#787A87", width: "4.5rem", top: "0.5rem" }, label: "12 PM" },
  1080: { style: { color: "#787A87", width: "4.5rem", top: "0.5rem" }, label: "6 PM" },
  1435: { style: { color: "#787A87", width: "4.5rem", top: "0.5rem" }, label: "12 AM" },
};

const SliderWrapper = styled.div`
  position: relative;
  z-index: 30;
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

const StyledSliderIcon = styled.img<{ position: number; edge?: boolean }>`
  position: absolute;
  z-index: 10;
  pointer-events: none;

  top: 1.675rem;
  left: calc(${props => props.position}% - ${props => (props.edge ? "0.75rem" : "0.625rem")});
`;

const TimePicker: React.FC<PickerProps> = ({ date, setDate }) => {
  const [value, setValue] = useState(date.hour() * 60 + date.minute());

  const onChange = (value: number) => {
    setValue(value);
  };

  useDebounce(
    () => {
      let newDate = date.clone();
      newDate.set({
        hour: Math.floor(value / 60),
        minute: value % 60,
      });
      setDate(newDate);
    },
    10,
    [value],
  );

  const time = date.format("hh:mm A");

  return (
    <SliderWrapper>
      <CurrentTime style={{ marginLeft: `calc(${value / 14.35}% - 2rem)` }}>{time}</CurrentTime>
      <StyledSliderIcon src="/icons/slider-12am.svg" position={0} edge />
      <StyledSliderIcon src="/icons/slider-6am.svg" position={25} />
      <StyledSliderIcon src="/icons/slider-12pm.svg" position={50} />
      <StyledSliderIcon src="/icons/slider-6pm.svg" position={75} />
      <StyledSliderIcon src="/icons/slider-12am.svg" position={100} edge />
      <Slider
        max={1435}
        step={5}
        value={value}
        marks={marks}
        onChange={(value: number) => onChange(value)}
        handleStyle={handleStyle}
        trackStyle={trackStyle}
        dotStyle={dotStyle}
        railStyle={railStyle}
      />
    </SliderWrapper>
  );
};

export default TimePicker;

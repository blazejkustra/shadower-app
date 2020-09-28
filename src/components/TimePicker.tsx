import React, { useState } from "react";

import Slider from "rc-slider";
import "rc-slider/assets/index.css";
import { useDebounce } from "react-use";
import moment from "moment";
import styled from "styled-components";

interface PickerProps {
  date: moment.Moment;
  setDate: (value: moment.Moment) => void;
}

const marks = {
  0: <strong>12:00 am</strong>,
  360: "6:00 am",
  720: "",
  1080: "18:00 am",
  1435: {
    style: {
      color: "red",
    },
    label: <strong>100°C</strong>,
  },
};

const TimePickerWrapper = styled.div`
  position: absolute;
  bottom: 100px;
  left: 100px;
  z-index: 100;
  width: 60%;
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

  return (
    <TimePickerWrapper>
      {date.format("h:mm a")}
      <Slider
        max={1435}
        step={5}
        value={value}
        marks={marks}
        onChange={(value: number) => onChange(value)}
      />
    </TimePickerWrapper>
  );
};

export default TimePicker;

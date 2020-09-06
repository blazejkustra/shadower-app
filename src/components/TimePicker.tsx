import React from "react";
import styled from "styled-components";

import "rc-time-picker/assets/index.css";
import RcTimePicker from "rc-time-picker";
import moment from "moment";

interface PickerProps {
  date: moment.Moment;
  setDate: (value: moment.Moment) => void;
}

const TimePickerWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

const StyledTimePicker = styled(RcTimePicker)`
  & .rc-time-picker-panel-select-option-selected {
    background-color: #edeffe;
    font-weight: normal;
  }

  & .rc-time-picker-panel-select,
  & .rc-time-picker-input,
  & .rc-time-picker-panel-input {
    font-family: "Roboto", sans-serif;
    font-size: 1rem;
    padding: 0.5rem;
    cursor: pointer;

    ::-webkit-scrollbar {
      width: 0;
      height: 0;
    }
  }
`;

const TimePicker: React.FC<PickerProps> = ({ date, setDate }) => {
  return (
    <TimePickerWrapper>
      <StyledTimePicker
        defaultValue={date}
        showSecond={false}
        clearIcon={<div />}
        onChange={value => {
          let newDate = date.clone();
          newDate.set({
            hour: value.get("hour"),
            minute: value.get("minute"),
          });
          setDate(newDate);
        }}
      />
    </TimePickerWrapper>
  );
};

export default TimePicker;

import React from "react";
import styled from "styled-components";

import "react-day-picker/lib/style.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
// @ts-ignore
import { formatDate, parseDate } from "react-day-picker/moment";
import moment from "moment";

interface PickerProps {
  date: moment.Moment;
  setDate: (value: moment.Moment) => void;
}

const DatePickerWrapper = styled.div`
  width: 100%;
  margin-top: 1rem;
`;

const inputStyle = {
  fontFamily: "Roboto, sans-serif",
  fontSize: "1rem",
  padding: "0.5rem",
  width: "100%",
};

const DatePicker: React.FC<PickerProps> = ({ date, setDate }) => {
  return (
    <DatePickerWrapper>
      <DayPickerInput
        value={date.toDate()}
        onDayChange={value => {
          let newDate = moment(value);
          newDate.set({
            hour: date.get("hour"),
            minute: date.get("minute"),
          });
          setDate(newDate);
        }}
        formatDate={formatDate}
        parseDate={parseDate}
        placeholder="MM/DD/YYYY"
        inputProps={{ style: inputStyle }}
      />
    </DatePickerWrapper>
  );
};

export default DatePicker;

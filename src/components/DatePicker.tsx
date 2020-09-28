import React from "react";
import styled from "styled-components";

import "react-day-picker/lib/style.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
// @ts-ignore
import { formatDate, parseDate } from "react-day-picker/moment";
import moment from "moment";

import { InputInfo } from "../styles/DropdownStyles";
interface PickerProps {
  date: moment.Moment;
  setDate: (value: moment.Moment) => void;
}

const DatePickerWrapper = styled.div`
  input {
    width: 100%;
    padding: 0.7rem 1rem;
    z-index: 12;

    outline: none;
    font: unset;
    font-size: 1.125rem;
    line-height: 1.625rem;
    color: ${props => props.theme.colors.dark100};

    ::placeholder {
      color: ${props => props.theme.colors.dark55};
    }

    border: 1px solid ${props => props.theme.colors.purple100};
    border-radius: 0.3125rem;
    background-color: ${props => props.theme.colors.white};

    :hover {
      background-color: ${props => props.theme.colors.purple5};
    }

    :focus {
      background-color: ${props => props.theme.colors.purple10};
      border-radius: 0.3125rem 0.3125rem 0 0;
    }
  }

  .DayPicker-Day--today {
    color: black;
    font-weight: 600;
  }

  .DayPicker-Day--selected:not(.DayPicker-Day--disabled):not(.DayPicker-Day--outside) {
    background-color: ${props => props.theme.colors.purple100};
  }

  .DayPicker-Day {
    padding: 0.5rem 0.6rem;
  }

  .DayPicker:not(.DayPicker--interactionDisabled)
    .DayPicker-Day:not(.DayPicker-Day--disabled):not(.DayPicker-Day--selected):not(.DayPicker-Day--outside):hover {
    background-color: ${props => props.theme.colors.purple10};
  }

  .DayPickerInput-OverlayWrapper {
    margin-top: -1px;
  }

  .DayPickerInput-Overlay {
    box-shadow: none;
  }

  .DayPicker-wrapper {
    border: 1px solid ${props => props.theme.colors.purple100};
    border-radius: 0 0.3125rem 0.3125rem 0.3125rem;
  }
`;

const DatePicker: React.FC<PickerProps> = ({ date, setDate }) => {
  return (
    <DatePickerWrapper>
      <InputInfo>Date</InputInfo>
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
      />
    </DatePickerWrapper>
  );
};

export default DatePicker;

import React from "react";
import styled from "styled-components";

import "react-day-picker/lib/style.css";
import DayPickerInput from "react-day-picker/DayPickerInput";
// @ts-ignore
import { formatDate, parseDate } from "react-day-picker/moment";
import { DateTime } from "luxon";

import { mediaQuery } from "./theme";
import { InputInfo } from "../styles/DropdownStyles";

interface PickerProps {
  date: DateTime;
  setDate: (value: DateTime) => void;
}

const InputContainer = styled.div`
  position: relative;
`;

const CalendarImage = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  pointer-events: none;
  margin: 0.75rem;
  ${mediaQuery.sm} {
    margin: 0.5rem;
  }
`;

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

    ${mediaQuery.sm} {
      font-size: 1rem;
      line-height: 1rem;
      padding: 0.5rem 1rem;
    }
  }

  .DayPickerInput {
    width: 100%;
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
      <InputContainer>
        <DayPickerInput
          value={date.toJSDate()}
          onDayChange={value => {
            setDate(
              DateTime.fromJSDate(value).set({
                hour: date.get("hour"),
                minute: date.get("minute"),
              }),
            );
          }}
          onChange={(e: React.FocusEvent<HTMLDivElement>) => {
            e.target.blur();
          }}
          formatDate={formatDate}
          parseDate={parseDate}
          placeholder="MM/DD/YYYY"
        />
        <CalendarImage src="/icons/calendar.svg" alt="Map pin icon" />
      </InputContainer>
    </DatePickerWrapper>
  );
};

export default DatePicker;

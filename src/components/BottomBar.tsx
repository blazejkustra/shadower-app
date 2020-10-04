import React from "react";

import styled from "styled-components";

import "rc-slider/assets/index.css";
import { Grid } from "react-styled-flexboxgrid";
import { mediaQuery } from "./theme";
import TimePicker from "./TimePicker";
import TypePicker from "./TypePicker";
import { SmallButton } from "./atoms/Buttons";
import { Coord } from "../utils/sun";

interface BottomBarProps {
  date: moment.Moment;
  setDate: (value: moment.Moment) => void;
  map: google.maps.Map | null;
  setMarkers: React.Dispatch<React.SetStateAction<Array<Coord>>>;
  setShadowMarkers: React.Dispatch<React.SetStateAction<Array<Coord>>>;
}

const Bar = styled.div`
  position: absolute;
  left: 0rem;
  bottom: 2rem;
  width: 100%;
  z-index: 10;

  ${mediaQuery.sm} {
    bottom: 0rem;
  }
`;

const StyledGrid = styled(Grid)`
  position: relative;
  background-color: ${props => props.theme.colors.white};
  box-shadow: 0px 24px 24px 0px rgb(9, 14, 37, 0.1);
  border-radius: 1rem;
  padding: 1rem 3rem 3rem 3rem;

  ${mediaQuery.sm} {
    border-radius: 0rem;
  }
`;

const FunctionsButtonWrapper = styled.div`
  position: absolute;
  bottom: 8rem;
  left: 0rem;
`;

const StyledButton = styled(SmallButton)`
  box-shadow: 0px 16px 16px 0px rgb(9, 14, 37, 0.1);
`;

const BottomBar: React.FC<BottomBarProps> = ({
  date,
  setDate,
  map,
  setMarkers,
  setShadowMarkers,
}) => {
  return (
    <Bar>
      <StyledGrid>
        <TimePicker date={date} setDate={setDate} />
        <FunctionsButtonWrapper>
          <StyledButton
            style={{ marginRight: "1rem" }}
            onClick={() => {
              setMarkers([]);
              setShadowMarkers([]);
            }}>
            Reset all
          </StyledButton>
          <StyledButton
            onClick={() => {
              setMarkers([]);
              setShadowMarkers([]);
            }}>
            Add new shape
          </StyledButton>
        </FunctionsButtonWrapper>
        <TypePicker map={map} />
      </StyledGrid>
    </Bar>
  );
};

export default BottomBar;

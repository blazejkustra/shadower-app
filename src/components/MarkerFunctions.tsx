import React from "react";
import styled from "styled-components";

import { SmallButton } from "./atoms/Buttons";
import { Coord } from "../utils/sun";
import { InputInfo } from "../styles/DropdownStyles";
import { mediaQuery } from "./theme";
import { useMobile } from "../styles/styles";

interface MarkersFunctionsProps {
  setMarkers: React.Dispatch<React.SetStateAction<Array<Array<Coord>>>>;
  setShadowMarkers: React.Dispatch<React.SetStateAction<Array<Array<Coord>>>>;
  activeIndex: number;
  setActiveIndex: (index: number) => void;
}

const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  justify-content: flex-start;

  margin-top: 1rem;

  ${mediaQuery.sm} {
    margin: 1rem;
  }
`;

const Container = styled.div`
  background-color: ${props => props.theme.colors.white};
  box-shadow: 0px 24px 24px 0px rgb(9, 14, 37, 0.1);
  border-radius: 1rem;
  padding: 1rem;
`;

const ButtonWrapper = styled.div`
  display: flex;
`;

const ResetButton = styled(SmallButton)`
  position: absolute;
  top: 0;
  right: 0;

  margin: 0.5rem;
`;

const ShapeButton = styled(SmallButton)<{ active: boolean }>`
  width: 34px;
  padding: 0;
  margin-right: 0.5rem;

  font-size: 1rem;
  font-weight: ${props => (props.active ? 700 : 400)};
  background-color: ${p => (p.active ? p.theme.colors.purple70 : p.theme.colors.purple100)};
`;

const MarkersFunctions: React.FC<MarkersFunctionsProps> = ({
  setMarkers,
  setShadowMarkers,
  activeIndex,
  setActiveIndex,
}) => {
  const isMobile = useMobile();

  if (isMobile) {
    return (
      <ResetButton
        onClick={() => {
          setMarkers([[], [], [], []]);
          setShadowMarkers([[], [], [], []]);
        }}>
        Reset all
      </ResetButton>
    );
  }

  return (
    <Wrapper>
      <Container>
        <InputInfo>Shapes</InputInfo>
        <ButtonWrapper>
          {["A", "B", "C", "D"].map((key, index) => (
            <ShapeButton
              key={key}
              active={activeIndex === index}
              onClick={() => setActiveIndex(index)}>
              {key}
            </ShapeButton>
          ))}
          <SmallButton
            onClick={() => {
              setMarkers([[], [], [], []]);
              setShadowMarkers([[], [], [], []]);
            }}>
            Reset all
          </SmallButton>
        </ButtonWrapper>
      </Container>
    </Wrapper>
  );
};

export default MarkersFunctions;

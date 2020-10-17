import React, { useState } from "react";
import {
  InputWrapper,
  Input,
  Dropdown,
  DropdownStyle,
  DropdownList,
  DropdownOption,
  InputInfo,
} from "../styles/DropdownStyles";
import { Height, HeightType } from "./MainLayout";
import styled from "styled-components";
import { mediaQuery } from "./theme";

const HeightWrapper = styled(InputWrapper)`
  width: 50%;
`;

const TypeWrapper = styled(InputWrapper)`
  width: calc(50% + 5px);
  margin-left: -5px;
`;

const InputContainer = styled.div`
  position: relative;
  display: flex;
`;

const ChevronImage = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  pointer-events: none;
  margin: 0.875rem;

  ${mediaQuery.sm} {
    margin: 0.5rem;
  }
`;

interface SearchProps {
  heights: Array<Height>;
  setHeight: React.Dispatch<React.SetStateAction<Array<Height>>>;
  activeIndex: number;
}

const HeightPicker: React.FC<SearchProps> = ({ heights, setHeight, activeIndex }) => {
  const [inputFocused, setFocus] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setHeight(current =>
        current.map((heightGroup, groupIndex) =>
          activeIndex === groupIndex ? { ...heightGroup, height: "0" } : heightGroup,
        ),
      );
      return;
    }

    const value = parseInt(e.target.value, 10).toString();
    if (value.match(/^[1-9][0-9]*$|^0$/)) {
      setHeight(current =>
        current.map((heightGroup, groupIndex) =>
          activeIndex === groupIndex ? { ...heightGroup, height: value } : heightGroup,
        ),
      );
    }
  };

  const handleSelect = (type: string) => {
    if (type === "Floors") {
      setHeight(current =>
        current.map((heightGroup, groupIndex) =>
          activeIndex === groupIndex ? { ...heightGroup, type: HeightType.Floors } : heightGroup,
        ),
      );
    } else {
      setHeight(current =>
        current.map((heightGroup, groupIndex) =>
          activeIndex === groupIndex ? { ...heightGroup, type: HeightType.Meters } : heightGroup,
        ),
      );
    }
  };

  return (
    <>
      <InputInfo>Height</InputInfo>
      <InputContainer>
        <HeightWrapper>
          <Input
            value={heights[activeIndex].height}
            onChange={handleInput}
            placeholder="Object height"
          />
        </HeightWrapper>

        <TypeWrapper
          openOnFocus
          onSelect={handleSelect}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}>
          <Input value={heights[activeIndex].type === HeightType.Floors ? "Floors" : "Meters"} />
          <DropdownStyle portal={false} />
          <Dropdown>
            <DropdownList persistSelection>
              <DropdownOption
                value={heights[activeIndex].type === HeightType.Meters ? "Floors" : "Meters"}
              />
            </DropdownList>
          </Dropdown>
        </TypeWrapper>
        <ChevronImage
          src={inputFocused ? "/icons/chevron-up.svg" : "/icons/chevron-down.svg"}
          alt="Map pin icon"
        />
      </InputContainer>
    </>
  );
};

export default HeightPicker;

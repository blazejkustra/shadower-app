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
  height: Height;
  setHeight: React.Dispatch<Height>;
}

const HeightPicker: React.FC<SearchProps> = ({ height, setHeight }) => {
  const [inputFocused, setFocus] = useState(false);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.value === "") {
      setHeight({ ...height, height: "0" });
      return;
    }

    const value = parseInt(e.target.value, 10).toString();
    if (value.match(/^[1-9][0-9]*$|^0$/)) {
      setHeight({ ...height, height: value });
    }
  };

  const handleSelect = (type: string) => {
    if (type === "Floors") {
      setHeight({ ...height, type: HeightType.Floors });
    } else {
      setHeight({ ...height, type: HeightType.Meters });
    }
  };

  return (
    <>
      <InputInfo>Height</InputInfo>
      <InputContainer>
        <HeightWrapper>
          <Input value={height.height} onChange={handleInput} placeholder="Object height" />
        </HeightWrapper>

        <TypeWrapper
          openOnFocus
          onSelect={handleSelect}
          onFocus={() => setFocus(true)}
          onBlur={() => setFocus(false)}>
          <Input value={height.type === HeightType.Floors ? "Floors" : "Meters"} />
          <DropdownStyle portal={false} />
          <Dropdown>
            <DropdownList persistSelection>
              <DropdownOption value={height.type === HeightType.Meters ? "Floors" : "Meters"} />
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

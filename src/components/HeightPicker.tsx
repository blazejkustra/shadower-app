import React from "react";
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

const HeightWrapper = styled(InputWrapper)`
  width: 50%;
`;

const TypeWrapper = styled(InputWrapper)`
  width: 50%;
  margin-left: -5px;
`;

const InputContainer = styled.div`
  display: flex;
`;

interface SearchProps {
  height: Height;
  setHeight: React.Dispatch<Height>;
}

const HeightPicker: React.FC<SearchProps> = ({ height, setHeight }) => {
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

        <TypeWrapper openOnFocus onSelect={handleSelect}>
          <Input value={height.type === HeightType.Floors ? "Floors" : "Meters"} />
          <DropdownStyle portal={false} />
          <Dropdown>
            <DropdownList persistSelection>
              <DropdownOption value="Floors" />
              <DropdownOption value="Meters" />
            </DropdownList>
          </Dropdown>
        </TypeWrapper>
      </InputContainer>
    </>
  );
};

export default HeightPicker;

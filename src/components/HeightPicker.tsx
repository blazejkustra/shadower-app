import React from "react";
import { Combobox, ComboboxInput } from "@reach/combobox";
import styled from "styled-components";

interface SearchProps {
  height: string;
  setHeight: (value: string) => void;
}

const SearchWrapper = styled(Combobox)`
  width: 100%;
  margin-top: 1rem;
`;

const SearchInput = styled(ComboboxInput)`
  padding: 0.5rem;
  font-size: 1rem;
  width: 100%;
`;

const HeightPicker: React.FC<SearchProps> = ({ height, setHeight }) => {
  const handleInput = (e: any) => {
    const value = e.target.value;
    if (value.match(/^[1-9][0-9]*$|^0$|^$/)) {
      setHeight(value);
    }
  };

  return (
    <SearchWrapper>
      <SearchInput value={height} onChange={handleInput} placeholder="Floors" />
    </SearchWrapper>
  );
};

export default HeightPicker;

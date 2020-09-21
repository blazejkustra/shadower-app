import React, { useCallback } from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";
import styled from "styled-components";
import { noSpacing } from "./atoms/text";

interface SearchProps {
  map: google.maps.Map | null;
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

const Dropdown = styled(ComboboxPopover)`
  background-color: white;
  border: 1px solid black;

  z-index: 11;
`;

const DropdownList = styled(ComboboxList)`
  ${noSpacing}
  list-style-type: none;
`;

const DropdownOption = styled(ComboboxOption)`
  background-color: white;
  padding: 0.25rem 0.5rem;
  cursor: pointer;

  &:hover {
    background-color: #ccc;
  }
`;

const Search: React.FC<SearchProps> = ({ map }) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: new google.maps.LatLng(43.6532, -79.3832),
      radius: 500 * 1000,
    },
    debounce: 300,
  });

  const handleInput = (e: any) => {
    setValue(e.target.value);
  };

  const handleSelect = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const addresses = await getGeocode({ address });
      const { lat, lng } = await getLatLng(addresses[0]);
      moveMapTo({ lat, lng });
    } catch (error) {
      console.log("Error: ", error); // TODO
    }
  };

  const moveMapTo = useCallback(
    ({ lat, lng }) => {
      map?.panTo(new google.maps.LatLng(lat, lng));
      map?.setZoom(18);
    },
    [map],
  );

  return (
    <SearchWrapper onSelect={handleSelect}>
      <SearchInput
        value={value}
        onChange={handleInput}
        disabled={!ready}
        placeholder="Search your location"
      />
      <Dropdown>
        <DropdownList>
          {status === "OK" &&
            data.map(({ id, description }, index) => (
              <DropdownOption key={`${id}-${index}`} value={description} />
            ))}
        </DropdownList>
      </Dropdown>
    </SearchWrapper>
  );
};

export default Search;

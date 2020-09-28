import React, { useCallback, useRef } from "react";
import {
  InputWrapper,
  Input,
  Dropdown,
  DropdownStyle,
  DropdownList,
  DropdownOption,
  InputInfo,
} from "../styles/DropdownStyles";
import usePlacesAutocomplete, { getGeocode, getLatLng } from "use-places-autocomplete";

interface SearchProps {
  map: google.maps.Map | null;
  center: google.maps.LatLng;
}

const Search: React.FC<SearchProps> = ({ map, center }) => {
  const inputRef = useRef<HTMLElement>(null);

  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    requestOptions: {
      location: center,
      radius: 500 * 1000,
    },
    debounce: 300,
  });

  const moveMapTo = useCallback(
    ({ lat, lng }) => {
      map?.panTo(new google.maps.LatLng(lat, lng));
      map?.setZoom(18);
    },
    [map],
  );

  const handleInput = (e: any) => {
    setValue(e.target.value);
  };

  const handleSubmit = async (address: string) => {
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

  return (
    <InputWrapper onSelect={handleSubmit}>
      <InputInfo>Location</InputInfo>
      <Input
        ref={inputRef}
        value={value}
        onChange={handleInput}
        onKeyPress={(e: KeyboardEvent) => {
          if (e.key === "Enter") {
            inputRef?.current?.blur();
            handleSubmit(value);
          }
        }}
        disabled={!ready}
        placeholder="Start typing to search location"
        empty={!value}
      />
      {status === "OK" && (
        <>
          <DropdownStyle portal={false} />
          <Dropdown>
            <DropdownList>
              {data.map(({ id, description }, index) => (
                <DropdownOption key={`${id}-${index}`} value={description} />
              ))}
            </DropdownList>
          </Dropdown>
        </>
      )}
    </InputWrapper>
  );
};

export default Search;

import React, { useCallback, useState } from "react";
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
import styled from "styled-components";
import { mediaQuery } from "./theme";

const ErrorText = styled.span`
  color: red;
`;

const InputContainer = styled.div`
  position: relative;
`;

const LocationImage = styled.img`
  position: absolute;
  top: 0;
  right: 0;
  pointer-events: none;
  margin: 0.75rem;

  ${mediaQuery.sm} {
    margin: 0.5rem;
  }
`;

const DeleteContainer = styled.div`
  position: absolute;
  top: 0.3125rem;
  right: 0.3125rem;
  border-radius: 0.3125rem;

  width: 2.5rem;
  height: 2.5rem;

  cursor: pointer;

  :hover {
    background-color: rgb(83, 0, 208, 0.1);
  }

  :active {
    background-color: rgb(83, 0, 208, 0.1);
  }

  ${mediaQuery.sm} {
    top: 0.25rem;
    right: 0.25rem;

    width: 2rem;
    height: 2rem;
  }
`;

const DeleteImg = styled.img`
  padding-top: 0.5rem;
  margin: auto;

  ${mediaQuery.sm} {
    padding-top: 0.375rem;
    width: 1.25rem;
  }
`;

interface SearchProps {
  map: google.maps.Map | null;
  center: google.maps.LatLng;
}

const Search: React.FC<SearchProps> = ({ map, center }) => {
  const [deleteIconSrc, setDeleteIconSrc] = useState("/icons/delete.svg");
  const [error, setError] = useState<string | null>(null);
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
      map?.setZoom(19);
    },
    [map],
  );

  const handleInput = (e: any) => {
    setValue(e.target.value);
    setError(null);
  };

  const handleDelete = () => {
    setValue("");
    setError(null);
  };

  const handleSubmit = async (address: string) => {
    setValue(address, false);
    clearSuggestions();

    try {
      const addresses = await getGeocode({ address });
      const { lat, lng } = await getLatLng(addresses[0]);
      moveMapTo({ lat, lng });
    } catch (error) {
      setError(error.toString());
    }
  };

  return (
    <InputWrapper onSelect={handleSubmit}>
      <InputInfo>
        Location
        <ErrorText>
          {error === "ZERO_RESULTS" ? "(No address matched your search)" : null}
        </ErrorText>
      </InputInfo>
      <InputContainer>
        <Input
          value={value}
          onChange={handleInput}
          onKeyPress={(e: KeyboardEvent) => {
            if (e.key === "Enter") {
              handleSubmit(value);
            }
          }}
          disabled={!ready}
          placeholder="Start typing to search location"
        />
        {value ? (
          <DeleteContainer
            onClick={() => handleDelete()}
            onMouseOver={() => setDeleteIconSrc("/icons/delete-purple.svg")}
            onMouseOut={() => setDeleteIconSrc("/icons/delete.svg")}>
            <DeleteImg src={deleteIconSrc} alt="Delete icon" />
          </DeleteContainer>
        ) : (
          <LocationImage src="/icons/map-pin.svg" alt="Map pin icon" />
        )}
      </InputContainer>
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

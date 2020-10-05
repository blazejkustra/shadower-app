import {
  Combobox,
  ComboboxInput,
  ComboboxPopover,
  ComboboxList,
  ComboboxOption,
} from "@reach/combobox";
import { ListboxOption, Listbox } from "@reach/listbox";
import styled from "styled-components";
import { noSpacing } from "../components/atoms/text";

export const InputWrapper = styled(Combobox)`
  width: 100%;

  font-family: "Manrope", sans-serif;
`;

export const Input = styled(ComboboxInput)`
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
  }
`;

export const Dropdown = styled(ComboboxPopover)`
  border: 1px solid ${props => props.theme.colors.purple100};
  border-width: 0px 1px 1px 1px;
  border-radius: 0 0 0.3125rem 0.3125rem;
  overflow: hidden;
  perspective: 1px;

  z-index: 11;

  [data-user-value] {
    font-weight: 600;
  }
  [data-suggested-value] {
    font-weight: 400;
  }
`;

export const DropdownStyle = styled(ComboboxPopover)`
  margin-top: -0.375rem;
  height: 0.375rem;
  border: 1px solid ${props => props.theme.colors.purple100};
  border-width: 0px 1px 0px 1px;
`;

export const DropdownList = styled(ComboboxList)`
  ${noSpacing}
  list-style-type: none;
`;

export const DropdownOption = styled(ComboboxOption)`
  cursor: pointer;
  width: 100%;
  padding: 0.7rem 1rem;

  outline: none;
  font: unset;
  font-size: 1.125rem;
  line-height: 1.625rem;
  color: ${props => props.theme.colors.dark100};

  background-color: ${props => props.theme.colors.white};

  :hover {
    background-color: ${props => props.theme.colors.purple5};
  }
`;

export const InputInfo = styled.p`
  ${noSpacing}

  font-size: 1rem;
  font-weight: 500;
  line-height: 1.5rem;

  padding-bottom: 0.5rem;
`;

export const StyledListbox = styled(Listbox)`
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
  }
`;

export const StyledListboxOption = styled(ListboxOption)`
  cursor: pointer;
  width: 100%;
  padding: 0.7rem 1rem;

  outline: none;
  font: unset;
  font-size: 1.125rem;
  line-height: 1.625rem;
  color: ${props => props.theme.colors.dark100};

  background-color: ${props => props.theme.colors.white};

  :hover {
    background-color: ${props => props.theme.colors.purple5};
  }
`;

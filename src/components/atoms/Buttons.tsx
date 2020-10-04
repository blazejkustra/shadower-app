import styled from "styled-components";

const Button = styled.button`
  background-color: ${props => props.theme.colors.purple100};
  color: ${props => props.theme.colors.white};
  border: none;
  border-radius: 0.3125rem;

  outline: none;
  cursor: pointer;

  :hover {
    background-color: ${props => props.theme.colors.purple85};
  }

  :active {
    background-color: ${props => props.theme.colors.purple70};
  }

  :disabled {
    background-color: ${props => props.theme.colors.dark25};
    color: ${props => props.theme.colors.dark5};
  }
`;

export const BigButton = styled(Button)`
  padding: 0.7625rem 0;

  font-size: 1.125rem;
  line-height: 1.625rem;
`;

export const SmallButton = styled(Button)`
  padding: 0.625rem 0.75rem;

  font-size: 0.875rem;
  font-weight: 500;
  line-height: 0.875rem;
`;

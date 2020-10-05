import styled, { css } from "styled-components";

const purpleButton = css`
  background-color: ${props => props.theme.colors.purple100};
  color: ${props => props.theme.colors.white};

  :hover {
    background-color: ${props => props.theme.colors.purple85};
  }

  :active {
    background-color: ${props => props.theme.colors.purple70};
  }
`;

const whiteButton = css`
  background-color: ${props => props.theme.colors.white};
  color: ${props => props.theme.colors.dark100};

  :hover {
    background-color: ${props => props.theme.colors.dark5};
  }

  :active {
    background-color: ${props => props.theme.colors.dark10};
  }
`;

const Button = styled.button<{ white?: boolean }>`
  border: none;
  border-radius: 0.3125rem;
  font: unset;
  font-weight: 500;
  font-family: "Manrope", sans-serif;

  outline: none;
  cursor: pointer;

  ${props => (props.white ? whiteButton : purpleButton)}

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
  line-height: 0.875rem;
`;

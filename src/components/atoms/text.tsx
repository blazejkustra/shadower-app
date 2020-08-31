import "react";
import styled, { css } from "styled-components";
import { mediaQuery } from "../theme";

export const noSpacing = css`
  margin: 0;
  padding: 0;
`;

export const P = styled.p`
  font-family: ${props => props.theme.font.primary};
  font-weight: ${props => props.theme.fontWeight.regular};
  color: ${props => props.theme.colors.dark};
  line-height: 1.625rem;
  font-size: 1rem;
`;

export const H2 = styled.h2`
    ${noSpacing}
    font-family: ${props => props.theme.font.secondary};
    font-weight: ${props => props.theme.fontWeight.regular};
`;

export const H4 = styled.h4`
    ${noSpacing}
    font-family: ${props => props.theme.font.primary};
`;

export const H6 = styled.h6`
    ${noSpacing}
    font-family: ${props => props.theme.font.secondary};
    font-weight: ${props => props.theme.fontWeight.regular};
`;

export const SectionName = styled(H6)`
  color: ${props => (props.color ? props.color : props.theme.colors.orange)};
  font-size: 0.75rem;
  font-weight: ${props => props.theme.fontWeight.regular};
  text-transform: uppercase;
  line-height: 1.75rem;
`;

export const SectionTitle = styled(H2)`
  font-size: 3.75rem;
  line-height: 3.75rem;
  font-weight: ${props => props.theme.fontWeight.regular};
  letter-spacing: -0.125rem;
  color: ${props => props.theme.colors.dark};

  ${mediaQuery.sm} {
    font-size: 2.25rem;
    line-height: 2.25rem;
    letter-spacing: 0;
  }
`;

export const SectionContent = styled(P)`
  font-size: 1.125rem;
  line-height: 2rem;

  ${mediaQuery.sm} {
    font-size: 1rem;
    line-height: 1.625rem;
  }
`;

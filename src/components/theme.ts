import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    white: "#ffffff",
    dark100: "#090E25",
    dark85: "#2E3246",
    dark70: "#535666",
    dark55: "#787A87",
    dark40: "#9D9FA8",
    dark25: "#C1C3C9",
    dark10: "#E6E7E9",
    dark5: "#F3F3F4",
    purple100: "#5300D0",
    purple85: "#640BD8",
    purple70: "#6F12DE",
    purple25: "#BB96EF",
    purple10: "#F3EFFB",
    purple5: "#FAF6FE",
  },
  font: {
    primary: "Montserrat, Ubuntu",
    secondary: "RobotoSlab, Ubuntu",
  },
  fontWeight: {
    bold: 700,
    extraBold: 800,
    semiBold: 600,
    medium: 500,
    regular: 400,
  },
  flexboxgrid: {
    gridSize: 12,
    gutterWidth: 1.25,
    outerMargin: 1.5,
    mediaQuery: "only screen",
    container: {
      sm: 46, // rem
      md: 61, // rem
      lg: 74, // rem
    },
    breakpoints: {
      xs: 0, // em
      xsm: 36, //em
      sm: 48, // em
      md: 64, // em
      lg: 77, // em
    },
  },
};

export const mediaQuery = {
  xs: `@media (max-width: 0em)`,
  xsm: `@media (max-width: 35.9375em)`,
  sm: `@media (max-width: 47.9375em)`,
  md: `@media (max-width: 63.9375em)`,
  lg: `@media (max-width: 76.9375em)`,
  overLg: `@media (min-width: 1780px)`,
};

import { DefaultTheme } from "styled-components";

export const theme: DefaultTheme = {
  colors: {
    orange: "#F85E11",
    lightOrange: "#FF7047",
    dark: "#231F21",
    white: "#ffffff",
    gray: "#F4F2F3",
    ashy: "#dddbd8",
    soil: "#E2DDD7",
    darkSoil: "#D6CFC7",
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
  xsm: `@media (max-width: 36em)`,
  sm: `@media (max-width: 48em)`,
  md: `@media (max-width: 64em)`,
  lg: `@media (max-width: 77em)`,
  overLg: `@media (min-width: 1780px)`,
};

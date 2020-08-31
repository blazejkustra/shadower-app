import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      orange: "#F85E11";
      lightOrange: "#FF7047";
      dark: "#231F21";
      white: "#ffffff";
      gray: "#F4F2F3";
      ashy: "#dddbd8";
      soil: "#E2DDD7";
      darkSoil: "#D6CFC7";
    };
    font: {
      primary: "Montserrat, Ubuntu";
      secondary: "RobotoSlab, Ubuntu";
    };
    fontWeight: {
      bold: 700;
      extraBold: 800;
      semiBold: 600;
      medium: 500;
      regular: 400;
    };
    flexboxgrid: {
      gridSize: number;
      gutterWidth: number;
      outerMargin: number;
      mediaQuery: "only screen";
      container: {
        sm: number;
        md: number;
        lg: number;
      };
      breakpoints: {
        xs: number;
        xsm: number;
        sm: number;
        md: number;
        lg: number;
      };
    };
  }
}

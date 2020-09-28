import "styled-components";

declare module "styled-components" {
  export interface DefaultTheme {
    colors: {
      white: string;
      dark100: string;
      dark85: string;
      dark70: string;
      dark55: string;
      dark40: string;
      dark25: string;
      dark10: string;
      dark5: string;
      purple100: string;
      purple85: string;
      purple70: string;
      purple25: string;
      purple10: string;
      purple5: string;
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

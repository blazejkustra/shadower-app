import { useMedia } from "react-use";
import { theme } from "../components/theme";

export const useMobile = (): boolean => {
  return useMedia(`(max-width: ${theme.flexboxgrid.breakpoints.xsm}rem)`);
};

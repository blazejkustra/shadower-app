import React from "react";
import "./styles/global.css";
import MainLayout from "./components/MainLayout";
import { ThemeProvider } from "styled-components";
import { theme } from "./components/theme";
import "@reach/combobox/styles.css";

import { getSunPosition } from "./utils/sun";
import moment from "moment";

// import moment from "moment";
// const date = moment().add(10, "hour").toDate();
// console.log(date);
const data = getSunPosition(moment().toDate(), 50.049683, 19.944544);
console.log(data.azimuth);
console.log(data);
// const sunPosition = {
//   lat: defaultProps.center.lat + 0.1 * Math.cos(data.azimuth),
//   lng: defaultProps.center.lng + 0.1 * Math.sin(data.azimuth),
// };

const App: React.FC = () => {
  return (
    <ThemeProvider theme={theme}>
      <MainLayout />
    </ThemeProvider>
  );
};

export default App;

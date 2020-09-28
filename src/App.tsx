import React from "react";
import "./styles/global.css";
import MainLayout from "./components/MainLayout";
import { ThemeProvider } from "styled-components";
import { theme } from "./components/theme";
import "@reach/combobox/styles.css";
import { useLoadScript } from "@react-google-maps/api";

const libraries = ["places"];

const App: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    libraries,
  });

  if (loadError) return <p>Error</p>; // TODO
  if (!isLoaded) return <p>Loading...</p>; //TODO

  return (
    <ThemeProvider theme={theme}>
      <MainLayout />
    </ThemeProvider>
  );
};

export default App;

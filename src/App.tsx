import React from "react";
import "./styles/global.css";
import MainLayout from "./components/MainLayout";
import { ThemeProvider } from "styled-components";
import { theme } from "./components/theme";
import "@reach/combobox/styles.css";
import { useLoadScript } from "@react-google-maps/api";
import styled from "styled-components";

const libraries = ["places"];

const Loader = styled.img`
  display: block;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
`;

const ErrorText = styled.h2`
  display: block;
  margin: auto;
  position: absolute;
  top: 50%;
  left: 0;
  right: 0;
  text-align: center;
`;

const App: React.FC = () => {
  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAP_KEY,
    libraries,
  });

  if (loadError) return <ErrorText>Google Maps error.</ErrorText>;
  if (!isLoaded) return <Loader src="/icons/loading.svg" />;

  return (
    <ThemeProvider theme={theme}>
      <MainLayout />
    </ThemeProvider>
  );
};

export default App;

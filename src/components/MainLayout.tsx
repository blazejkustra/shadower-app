import React from "react";
import NavBar from "./NavBar";
import GoogleMap from "./GoogleMap";
import styled from "styled-components";

const Layout = styled.div`
  width: 100vw;
  height: 100vh;
`;

const MainLayout: React.FC = () => {
  return (
    <Layout>
      <NavBar />
      <GoogleMap />
    </Layout>
  );
};

export default MainLayout;

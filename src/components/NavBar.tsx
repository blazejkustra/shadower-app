import React from "react";
import styled from "styled-components";
import { Grid, Col, Row } from "react-styled-flexboxgrid";

const Bar = styled.div`
  position: fixed;
  z-index: 9999;

  left: 0;
  top: 0;

  width: 100vw;
  height: 4rem;

  background-color: red;
`;

const NavBar: React.FC = () => {
  return (
    <Bar>
      <Grid>
        <Row>
          <Col xs={6}>1</Col>
          <Col xs={6}>2</Col>
        </Row>
      </Grid>
    </Bar>
  );
};

export default NavBar;

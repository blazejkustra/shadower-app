import React from "react";
import styled from "styled-components";

import Search from "./Search";
import DatePicker from "./DatePicker";
import TimePicker from "./TimePicker";

import { Grid, Col, Row } from "react-styled-flexboxgrid";

interface NavBarProps {
  map: google.maps.Map | null;
  date: moment.Moment;
  setDate: (date: moment.Moment) => void;
}

const Bar = styled.div`
  position: fixed;
  z-index: 10;

  left: 0rem;
  top: 0rem;

  width: 100vw;
  height: 4rem;
`;

const NavBar: React.FC<NavBarProps> = ({ map, date, setDate }) => {
  return (
    <Bar>
      <Grid>
        <Row>
          <Col xs={12} sm={8}>
            <Search map={map} />
          </Col>

          <Col xs={6} sm={2}>
            <DatePicker date={date} setDate={setDate} />
          </Col>
          <Col xs={6} sm={2}>
            <TimePicker date={date} setDate={setDate} />
          </Col>
        </Row>
      </Grid>
    </Bar>
  );
};

export default NavBar;

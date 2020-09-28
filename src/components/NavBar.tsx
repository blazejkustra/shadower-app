import React from "react";
import styled from "styled-components";

import Search from "./Search";
import DatePicker from "./DatePicker";
import HeightPicker from "./HeightPicker";
import { Height } from "./MainLayout";
import { mediaQuery } from "./theme";

import { Grid, Col, Row } from "react-styled-flexboxgrid";

interface NavBarProps {
  map: google.maps.Map | null;
  date: moment.Moment;
  setDate: (value: moment.Moment) => void;
  height: Height;
  setHeight: (value: Height) => void;
  center: google.maps.LatLng;
}

const Bar = styled.div`
  position: absolute;
  left: 0rem;
  top: 2rem;
  width: 100%;
  z-index: 10;

  ${mediaQuery.sm} {
    top: 0rem;
  }
`;

const StyledGrid = styled(Grid)`
  background-color: ${props => props.theme.colors.white};
  border-radius: 1rem;
  padding: 1rem;

  ${mediaQuery.sm} {
    border-radius: 0rem;
  }
`;

const SearchCol = styled(Col)`
  ${mediaQuery.md} {
    margin-bottom: 1rem;
  }
`;

const Button = styled.button`
  width: 100%;
  background-color: ${props => props.theme.colors.purple100};
  border: none;
  border-radius: 0.3125rem;
  padding: 0.7625rem 0;
  margin-top: 2rem;

  outline: none;
  cursor: pointer;
  font-size: 1.125rem;
  line-height: 1.625rem;
  color: ${props => props.theme.colors.white};

  :hover {
    background-color: ${props => props.theme.colors.purple85};
  }

  :active {
    background-color: ${props => props.theme.colors.purple70};
  }

  :disabled {
    background-color: ${props => props.theme.colors.dark25};
    color: ${props => props.theme.colors.dark5};
  }
`; //TODO move somewhere else

const NavBar: React.FC<NavBarProps> = ({ map, date, setDate, height, setHeight, center }) => {
  return (
    <Bar>
      <StyledGrid>
        <Row>
          <SearchCol xs={12} sm={12} md={5}>
            <Search map={map} center={center} />
          </SearchCol>
          <Col xs={4} sm={4} md={2}>
            <DatePicker date={date} setDate={setDate} />
          </Col>
          <Col xs={4} sm={4} md={3}>
            <HeightPicker height={height} setHeight={setHeight} />
          </Col>
          <Col xs={4} sm={4} md={2}>
            <Button>Show results</Button> {/* TODO: use this button */}
          </Col>
        </Row>
      </StyledGrid>
    </Bar>
  );
};

export default NavBar;

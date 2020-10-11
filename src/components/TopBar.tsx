import React from "react";
import styled from "styled-components";

import Search from "./Search";
import DatePicker from "./DatePicker";
import HeightPicker from "./HeightPicker";
import { Height } from "./MainLayout";
import { mediaQuery } from "./theme";
import { DateTime } from "luxon";

import { Grid, Col, Row } from "react-styled-flexboxgrid";

interface TopBarProps {
  map: google.maps.Map | null;
  date: DateTime;
  setDate: (value: DateTime) => void;
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
  box-shadow: 0px 24px 24px 0px rgb(9, 14, 37, 0.1);
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

  ${mediaQuery.sm} {
    margin-bottom: 0.5rem;
  }
`;

const TopBar: React.FC<TopBarProps> = ({ map, date, setDate, height, setHeight, center }) => {
  return (
    <Bar>
      <StyledGrid>
        <Row>
          <SearchCol xs={12} sm={12} md={5}>
            <Search map={map} center={center} />
          </SearchCol>
          <Col xs={6} sm={6} md={3}>
            <DatePicker date={date} setDate={setDate} />
          </Col>
          <Col xs={6} sm={6} md={4}>
            <HeightPicker height={height} setHeight={setHeight} />
          </Col>
        </Row>
      </StyledGrid>
    </Bar>
  );
};

export default TopBar;

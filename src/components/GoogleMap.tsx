import React from "react";
import GoogleMapReact from "google-map-react";
import styled from "styled-components";
import getSunPosition from "../utils/getPosition";
import moment from "moment";

interface MarkerProps {
  lat: number;
  lng: number;
}

const MapContainer = styled.div`
  width: 100vw;
  height: 100vh;
`;

const Marker = styled.div<MarkerProps>`
  width: 10px;
  height: 10px;
  background-color: red;
`;

const defaultProps = {
  center: {
    lat: 50.049683,
    lng: 19.944544,
  },
  zoom: 8,
};

const GoogleMap: React.FC = () => {
  // const date = moment().add(10, "hour").toDate();
  // console.log(date);
  const data = getSunPosition(moment().toDate(), defaultProps.center.lat, defaultProps.center.lng);
  console.log(data.azimuth / Math.PI);
  const sunPosition = {
    lat: defaultProps.center.lat + 0.1 * Math.cos(data.azimuth + Math.PI),
    lng: defaultProps.center.lng + 0.1 * Math.sin(data.azimuth + Math.PI),
  };
  return (
    <MapContainer>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "" }} // TODO
        defaultCenter={defaultProps.center}
        defaultZoom={defaultProps.zoom}>
        <Marker lat={defaultProps.center.lat} lng={defaultProps.center.lng} />
        <Marker lat={sunPosition.lat} lng={sunPosition.lng} />
      </GoogleMapReact>
    </MapContainer>
  );
};

export default GoogleMap;

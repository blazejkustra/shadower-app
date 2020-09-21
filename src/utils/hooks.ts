import { useState, useEffect } from "react";
export const useGeolocation = () => {
  const [position, setPosition] = useState<google.maps.LatLng>();
  const [error, setError] = useState<null | string>(null);

  const onChange = ({ coords }: Position) => {
    setPosition(new google.maps.LatLng(coords.latitude, coords.longitude));
  };

  const onError = (error: PositionError) => {
    setError(error.message);
  };

  useEffect(() => {
    const geolocation = navigator.geolocation;
    if (!geolocation) {
      setError("Geolocation is not supported");
      return;
    }

    geolocation.getCurrentPosition(onChange, onError);
  }, [navigator.geolocation]);

  return { position, error };
};

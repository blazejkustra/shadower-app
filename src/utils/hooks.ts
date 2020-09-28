import { useState, useEffect } from "react";

export const usePosition = () => {
  const [center, setCenter] = useState<google.maps.LatLng>(new google.maps.LatLng(50, 20));
  const [error, setError] = useState<string | null>(null);

  const onChange = ({ coords }: Position) => {
    setCenter(new google.maps.LatLng(coords.latitude, coords.longitude));
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
  }, []);

  return { center, setCenter, error };
};

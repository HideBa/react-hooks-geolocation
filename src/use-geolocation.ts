import { useCallback, useEffect, useState } from "react";

export type Location = {
  latitude: number;
  longitude:number;
  altitude:number|null;
}

type LocationMetaInfo = {
  altitudeAccuracy: number|null;
  accuracy: number|null;
  heading: number|null
  speed: number|null;
}


type ErrType = "userDeny"

type Err  = {
  type: ErrType,
  message: string
}


export default ({onGeoLocationApiActive, active}:{onGeoLocationApiActive: () => void, active: boolean}) => {
  const [isControlledGeoLocationApiActive, activateControlledGeoLocationApi] = useState(false);
  const isActive = isControlledGeoLocationApiActive || active;
  const [currentLocation, setCurrentLocation] = useState<Location>();
  const [locationMetaInfo, setLocationMetaInfo] = useState<LocationMetaInfo>();
  const [locationErr, setLocationErr] = useState<string>();
  const [isGettingLocation, setIsGettingLocation] = useState(false);
  useEffect(() => {
    if (!isActive) return;
    navigator.geolocation.getCurrentPosition(
      (pos: GeolocationPosition) => {
        setCurrentLocation({
          latitude: pos.coords.latitude,
          longitude: pos.coords.longitude,
          altitude:pos.coords.altitude
        });
        setLocationMetaInfo({
          altitudeAccuracy: pos.coords.altitudeAccuracy,
          accuracy: pos.coords.accuracy,
          heading: pos.coords.heading,
          speed: pos.coords.speed
      }),
      (posErr: GeolocationPositionError) => {
        setLocationErr(posErr.message);
      },
    );
  }, [isActive]);

  const handleGeoLocationGet = useCallback(() => {
    console.log(`click`);
    activateControlledGeoLocationApi(true);
    setIsGettingLocation(true);
  }, [activateControlledGeoLocationApi, setIsGettingLocation]);

  useEffect(() => {
    if (!isActive || !currentLocation) return;
    setIsGettingLocation(false);
  }, [setIsGettingLocation, isActive, currentLocation]);

  useEffect(() => {
    console.log(currentLocation);
  }, [currentLocation]);


  return {
    handleGeoLocationGet,
    currentLocation,
    loading: isGettingLocation,
  };
}
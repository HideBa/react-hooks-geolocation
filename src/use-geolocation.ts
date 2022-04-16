import { useCallback, useEffect, useState } from 'react';
import {
  Args,
  Err,
  ErrType,
  MetaInfo,
  GeolocationPosition,
  GeolocationPositionError,
  Location,
} from './types';

export default ({
  geolocation = navigator.geolocation,
  defaultActive = true,
  onGeolocationChange,
}: Args) => {
  const [isActive, setActivate] = useState(defaultActive);
  const [location, setLocation] = useState<Location>();
  const [metaInfo, setMetaInfo] = useState<MetaInfo>();
  const [locationErr, setLocationErr] = useState<Err>();
  const [loading, setLoading] = useState(false);

  let watchId: number | undefined = undefined;

  useEffect(() => {
    if (!isActive) return;
    update();
  }, [isActive]);

  useEffect(() => {
    onGeolocationChange?.(location, metaInfo);
  }, [onGeolocationChange, location, metaInfo]);

  const handleSetData = useCallback((pos: GeolocationPosition) => {
    setLocation({
      latitude: pos.coords.latitude,
      longitude: pos.coords.longitude,
      altitude: pos.coords.altitude,
    });
    setMetaInfo({
      altitudeAccuracy: pos.coords.altitudeAccuracy,
      accuracy: pos.coords.accuracy,
      heading: pos.coords.heading,
      speed: pos.coords.speed,
    });
    setLoading(false);
    setLocationErr(undefined);
  }, []);

  const handleErr = useCallback((err: GeolocationPositionError) => {
    setLocation(undefined);
    setMetaInfo(undefined);
    setLoading(false);
    setLocationErr({ type: convertErr(err.code), message: err.message });
  }, []);

  const activate = useCallback(() => {
    setActivate(true);
  }, []);

  const update = useCallback(() => {
    setLoading(true);
    geolocation.getCurrentPosition(handleSetData, handleErr);
  }, [geolocation]);

  const watch = useCallback(() => {
    watchId = geolocation.watchPosition(handleSetData, handleErr);
  }, [geolocation, handleSetData, handleErr]);

  const unwatch = useCallback(() => {
    if (typeof watchId === 'undefined') return;
    geolocation.clearWatch(watchId);
  }, [watchId, geolocation]);

  return {
    activate,
    update,
    watch,
    unwatch,
    metaInfo,
    locationErr,
    location,
    loading,
  };
};

const convertErr = (errCode: number): ErrType => {
  switch (errCode) {
    case 1:
      return 'PERMISSION_DENIED';
    case 2:
      return 'POSITION_UNAVAILABLE';
    case 3:
      return 'TIMEOUT';
    default:
      return 'OTHER';
  }
};

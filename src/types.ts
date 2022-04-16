export type GeolocationPositionError = {
  readonly code: number;
  readonly message: string;
  readonly PERMISSION_DENIED: number;
  readonly POSITION_UNAVAILABLE: number;
  readonly TIMEOUT: number;
};

type GeolocationCoordinates = {
  readonly accuracy: number;
  readonly altitude: number | null;
  readonly altitudeAccuracy: number | null;
  readonly heading: number | null;
  readonly latitude: number;
  readonly longitude: number;
  readonly speed: number | null;
};

type EpochTimeStamp = number;

export type GeolocationPosition = {
  readonly coords: GeolocationCoordinates;
  readonly timestamp: EpochTimeStamp;
};

export type Location = {
  latitude: number;
  longitude: number;
  altitude: number | null;
};

export type MetaInfo = {
  altitudeAccuracy: number | null;
  accuracy: number | null;
  heading: number | null;
  speed: number | null;
};

export type ErrType =
  | 'PERMISSION_DENIED'
  | 'POSITION_UNAVAILABLE'
  | 'TIMEOUT'
  | 'OTHER';

export type Err = {
  type: ErrType;
  message: string;
};

export type Args = {
  defaultActive?: boolean;
  onGeolocationChange?: (location?: Location, metaInfo?: MetaInfo) => void;
  geolocation?: Geolocation;
};

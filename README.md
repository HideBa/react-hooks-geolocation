# react-hooks-geolocation
react-hooks-geolocation is React hooks which allows you to handle geolocation API easily with less code.

# Getting Started
Install:

```
npm install react react-hooks-geolocation
# or
yarn add react react-hooks-geolocation
```

# Usage
```
import useGeolocation from "react-hooks-geolocation";

  const {location,loading,metaInfo, activate, update, watch, unwatch} = useGeolocation({defaultActive: false, (loc, meta) => {console.log(loc, meta)});

  //Watch geolocation
  const handleWatchLocation = () => {
    watch();
  };

  //Release event handler of watching geolocation
  const handleUnwatchLocation = () => {
    unwatch();
  };

  //Get controll of activation
  const activateGeolocation = () => {
    activate();
  };

  //Update geolocation whenever you want
  const handleUpdateGeolocation = () => {
    update();
  }

  return(
    <div>
      {
        loading ? "loading" : {location.latitude}
      }
    </div>
  )
```

Type
```

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

```

# License
[MIT License](./LICENSE)
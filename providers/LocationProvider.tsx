import React, { useEffect, useState } from "react";
import * as Location from "expo-location";

export const LocationContext = React.createContext({
  location: {
    latitude: 0,
    longitude: 0,
    displayName: "",
    granted: false,
  },
  setLocation: (val) => {},
});

export const LocationProvider = ({ children }) => {
  const [location, setLocation] = useState(null);
  const [errorMsg, setErrorMsg] = useState(null);

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        setErrorMsg("Permission to access location was denied");
        return;
      }

      let location = await Location.getCurrentPositionAsync({});
      console.log("collected location", location);
      if (location)
        setLocation({
          latitude: location.coords?.latitude || 0,
          longitude: location.coords?.longitude || 0,
          displayName: "",
          granted: true,
        });
    })();
  }, []);

  //let text = "Waiting..";
  //if (errorMsg) {
  //  text = errorMsg;
  //} else if (location) {
  //  text = JSON.stringify(location);
  //  console.log(
  //    "Location",
  //    location.coords.latitude,
  //    location.coords.longitude
  //  );
  //}

  return (
    <LocationContext.Provider value={{ location, setLocation }}>
      {children}
    </LocationContext.Provider>
  );
};

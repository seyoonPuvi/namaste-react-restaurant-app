import { createContext } from "react";

const LocationContext = createContext({
  lattitude: "",
  longtitude: "",
  isLocationActive: "",
  updateLocation: () => {},
});

export default LocationContext;

import { ReactNode } from "react";
import { useEffect } from "react";
import { useState } from "react";
import { createContext } from "react";
import api from "../services/api";

type ComponentProps = {
  children: ReactNode;
};

export type DriverProps = {
  driverId: string;
  driverName: string;
  driverPicture: string;
};

export type CordType = {
  driverId: string;
  latitude: number;
  longitude: number;
  accuracy: number;
  heading: number;
  altitude: number;
  altitudeAccuracy: number;
  speed: number;
  timestamp: string;
  maxTimestamp: string;
};

type LocationObject = {
  cords: CordType[];
  drivers: DriverProps[];
  cordOnFocus: CordType;
  setCordsOnFocus: (driverId: string) => void;
  zoom?: number;
};

export const LocationContext = createContext({} as LocationObject);

export function LocationContextProvider(props: ComponentProps) {
  const [zoom, setZoom] = useState(15);

  const [counter, setCounter] = useState(0);

  const [cords, setCords] = useState<CordType[]>([]);
  const [drivers, setDrivers] = useState<DriverProps[]>([]);

  const [cordOnFocus, changeCordsOnFocus] = useState<CordType>({
    accuracy: 0,
    altitude: 0,
    altitudeAccuracy: 0,
    driverId: "0",
    heading: 0,
    maxTimestamp: "",
    speed: 0,
    timestamp: "",
    latitude: -25.5415553,
    longitude: -54.5508768,
  });

  useEffect(() => {
    api.get("all_last_coordinates").then((r) => {
      const data = r.data;
      setCords(data.coordinates);
    });

    api.get("all_drivers").then((r) => {
      const data = r.data;
      setDrivers(data);
    });
  }, [counter]);

  function setCordsOnFocus(driverId: string) {
    console.log("oi");
    const vet = cords.filter((i) => {
      return i.driverId === driverId;
    });
    console.log(vet[0].longitude);
    setZoom(zoom + 1);
    changeCordsOnFocus(vet[0]);
  }

  return (
    <LocationContext.Provider
      value={{ cordOnFocus, setCordsOnFocus, cords, drivers, zoom }}
    >
      {props.children}
    </LocationContext.Provider>
  );
}

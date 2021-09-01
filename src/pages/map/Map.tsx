import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import L from "leaflet";
import carIcon from "../../assets/car.png";
import "./map.scss";

import { useContext } from "react";
import { LocationContext } from "../../contexts/Location";
import { useEffect } from "react";

function getIcon() {
  return L.icon({
    iconUrl: carIcon,

    iconSize: [50, 29],
  });
}

function MyComponent() {
  const { cordOnFocus } = useContext(LocationContext);
  const map = useMapEvents({});

  useEffect(() => {
    map.flyTo(
      { lat: cordOnFocus.latitude, lng: cordOnFocus.longitude },
      map.getZoom()
    );
  }, [cordOnFocus, map]);

  return null;
}

export function Map() {
  const { cords } = useContext(LocationContext);

  return (
    <div id="map-cont">
      <MapContainer
        style={{ width: "100%", height: "100%", zIndex: 0 }}
        center={[-25.5415553, -54.5508768]}
        zoom={13}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://tiles.stadiamaps.com/tiles/alidade_smooth/{z}/{x}/{y}{r}.png"
        />
        {cords.map((i) => {
          return (
            <Marker
              key={i.driverId}
              icon={getIcon()}
              position={[i.latitude, i.longitude]}
            ></Marker>
          );
        })}

        <MyComponent />
      </MapContainer>
    </div>
  );
}
/*

*/

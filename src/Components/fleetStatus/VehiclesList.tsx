import { DriverProps, LocationContext } from "../../contexts/Location";
import carIcon from "../../assets/car.png";
import { useContext } from "react";
import { useEffect } from "react";
import { useState } from "react";
import api from "../../services/api";
import { getElapsedTime } from "../../utils/time";

type Params = {
  content: DriverProps[];
};

export function VehiclesList({ content }: Params) {
  const { setCordsOnFocus } = useContext(LocationContext);

  return (
    <div id="scroll-zone">
      <ul id="vehicles-list">
        {content.map((i) => {
          return (
            <li onClick={() => setCordsOnFocus(i.driverId)} key={i.driverId}>
              <img src={carIcon} alt="carIcon" />
              <div className="text">
                <h4>{i.driverName}</h4>
                <Last driverId={i.driverId} />
              </div>
              <strong>90km/h</strong>
              <div className="status-ball"></div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

function Last({ driverId }: { driverId: string }) {
  const [lasCord, setLastCord] = useState("");

  const getDriverLocationTime = async (id: string) => {
    const result = await api.get(`last_coordinate/driver_id=${id}`);
    if (result) {
      setLastCord(getElapsedTime(result.data[0].timestamp));
    } else {
      setLastCord("indefinido");
    }
  };

  useEffect(() => {
    getDriverLocationTime(driverId);
  }, [driverId]);

  return <p>{`Última atualização: ${lasCord}`}</p>;
}

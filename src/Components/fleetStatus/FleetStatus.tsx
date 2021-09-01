import "./fleetStatus.scss";
import { useState } from "react";
import { useContext } from "react";
import { LocationContext } from "../../contexts/Location";
import { useEffect } from "react";
import io from "socket.io-client";
import { MessageSquare } from "react-feather";
import { useRef } from "react";
import { VehiclesList } from "./VehiclesList";
import { MsgList } from "./MsgList";
import { ContactsPage } from "./ContactsPage";
import { MsgPage } from "./MsgPage";
import { MessageContextProvider } from "../../contexts/Messages";

const vet = [
  1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20,
];

export function FleetStatus() {
  const [currentTab, setCurrentTab] = useState(0);
  const { drivers } = useContext(LocationContext);
  const [driverOnFocus, setDriverOnFocus] = useState("");

  return (
    <div id="fleet-status-container">
      <div id="status-menu">
        <div
          onClick={() => setCurrentTab(0)}
          className={`status-menu-item ${currentTab === 0 ? "clicked" : ""}`}
        >
          <h3>Usuários</h3>
        </div>

        <div
          onClick={() => {
            setCurrentTab(1);
          }}
          className={`status-menu-item ${
            currentTab === 1 || currentTab === 2 ? "clicked" : ""
          }`}
        >
          <h3>Mensagens</h3>
        </div>
      </div>

      <div id="content">
        {currentTab === 0 ? <VehiclesList content={drivers} /> : ""}
        <MessageContextProvider>
          {currentTab === 1 ? (
            <ContactsPage goToChat={() => setCurrentTab(2)} />
          ) : (
            ""
          )}
          {currentTab === 2 ? <MsgPage goBack={() => setCurrentTab(1)} /> : ""}
        </MessageContextProvider>
      </div>
    </div>
  );
}

/**
 * 
 *  {currentTab === 1 ? (
          <div onClick={() => setCurrentTab(2)} id="new-msg-btn">
            <MessageSquare />
          </div>
        ) : (
          ""
        )}
 */

import "../../styles/global.scss";
import "./navBar.scss";
import { AuthContext } from "../../contexts/Auth";
import { useContext } from "react";
import Logo from "../../assets/logo-header.svg";

import {
  Map,
  Truck,
  Settings,
  Users,
  TrendingUp,
  PhoneCall,
  Layers,
  BarChart2,
  Compass,
  CheckSquare,
  LogOut,
  Menu,
  XCircle,
} from "react-feather";
import { useState } from "react";
import { LayoutContext } from "../../contexts/Layout";

export function NavBar() {
  const { currentLayout, setCurrentLayout } = useContext(LayoutContext);
  const { signOut } = useContext(AuthContext);
  const [active, setActive] = useState(false);

  function toggleBar() {
    setActive(!active);
  }

  return (
    <div id="side-bar" className={active ? "open" : "close"}>
      <ul>
        <li
          className={`list-item ${active ? "open" : "close"}`}
          onClick={toggleBar}
        >
          {active ? <XCircle /> : <Menu />}
          {active ? <img id="nav-logo" src={Logo} alt="Logo" /> : null}
        </li>
        <li
          onClick={() => setCurrentLayout("map")}
          className={`list-item ${currentLayout === "map" ? "current" : ""} ${
            active ? "open" : "close"
          }`}
        >
          <Map />
          <h2>Mapa</h2>
        </li>
        <li
          onClick={() => setCurrentLayout("drivers")}
          className={`list-item ${
            currentLayout === "drivers" ? "current" : ""
          } ${active ? "open" : "close"}`}
        >
          <Users />
          <h2>Motoristas</h2>
        </li>
        <li
          onClick={() => setCurrentLayout("fleet")}
          className={`list-item ${currentLayout === "fleet" ? "current" : ""} ${
            active ? "open" : "close"
          }`}
        >
          <Truck />
          <h2>Minha Frota</h2>
        </li>
        <li
          onClick={() => setCurrentLayout("settings")}
          className={`list-item ${
            currentLayout === "settings" ? "current" : ""
          } ${active ? "open" : "close"}`}
        >
          <Settings />
          <h2>Configurações</h2>
        </li>

        <li
          onClick={() => setCurrentLayout("finances")}
          className={`list-item ${
            currentLayout === "finances" ? "current" : ""
          } ${active ? "open" : "close"}`}
        >
          <TrendingUp />
          <h2>Finanças</h2>
        </li>
        <li
          onClick={() => setCurrentLayout("calls")}
          className={`list-item ${currentLayout === "calls" ? "current" : ""} ${
            active ? "open" : "close"
          }`}
        >
          <PhoneCall />
          <h2>Chamadas</h2>
        </li>
        <li
          onClick={() => setCurrentLayout("filters")}
          className={`list-item ${
            currentLayout === "filters" ? "current" : ""
          } ${active ? "open" : "close"}`}
        >
          <Layers />
          <h2>Filtros</h2>
        </li>
        <li
          onClick={() => setCurrentLayout("estatistics")}
          className={`list-item ${
            currentLayout === "estatistics" ? "current" : ""
          } ${active ? "open" : "close"}`}
        >
          <BarChart2 />
          <h2>Estatística</h2>
        </li>
        <li
          onClick={() => setCurrentLayout("routes")}
          className={`list-item ${
            currentLayout === "routes" ? "current" : ""
          } ${active ? "open" : "close"}`}
        >
          <Compass />
          <h2>Rotas</h2>
        </li>
        <li
          onClick={() => setCurrentLayout("checks")}
          className={`list-item ${
            currentLayout === "checks" ? "current" : ""
          } ${active ? "open" : "close"}`}
        >
          <CheckSquare />
          <h2>Check-Lists</h2>
        </li>
        <li
          onClick={signOut}
          className={`list-item ${active ? "open" : "close"}`}
        >
          <LogOut />
          <h2>Log out</h2>
        </li>
      </ul>
    </div>
  );
}

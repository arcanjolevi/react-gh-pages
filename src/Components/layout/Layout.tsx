import { NavBar } from "../navBar/NavBar";
import "../../styles/global.scss";
import "./layoutScreen.scss";
import { Map } from "../../pages/map/Map";
import { FleetStatus } from "../fleetStatus/FleetStatus";
import { useContext } from "react";
import { LayoutContext, Layout as LayoutProps } from "../../contexts/Layout";
import { CheckLists } from "../../pages/checklists/CheckLists";
import { Drivers } from "../../pages/drivers/Drivers";
import { Estatistics } from "../../pages/Estatistics/Estatistics";
import { Filters } from "../../pages/Filters/Filters";
import { Finances } from "../../pages/Finances/Finances";
import { Fleet } from "../../pages/fleet/Fleet";
import { FleetRoutes } from "../../pages/fleetRoutes/fleetRoutes";
import { Settings } from "../../pages/settings/Settings";
import { Calls } from "../../pages/calls/Calls";
import { ProfileBall } from "../profileBall/ProfileBall";

function getCurrentLayout(param: LayoutProps) {
  switch (param) {
    case "calls":
      return <Calls />;
    case "checks":
      return <CheckLists />;
    case "drivers":
      return <Drivers />;
    case "estatistics":
      return <Estatistics />;
    case "filters":
      return <Filters />;
    case "finances":
      return <Finances />;
    case "fleet":
      return <Fleet />;
    case "map":
      return <Map />;
    case "routes":
      return <FleetRoutes />;
    case "settings":
      return <Settings />;
  }
}

export function Layout() {
  const { currentLayout } = useContext(LayoutContext);
  return (
    <>
      <div id="layout-screen-container">
        <NavBar />
        <ProfileBall />
        {getCurrentLayout(currentLayout)}
        <FleetStatus />
      </div>
    </>
  );
}

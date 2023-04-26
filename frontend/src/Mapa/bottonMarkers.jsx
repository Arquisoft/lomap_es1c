import * as React from 'react';
import { SpeedDial } from "@mui/material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import RoomIcon from "@mui/icons-material/Room";
import SpeedDialAction from '@mui/material/SpeedDialAction';
import RouteIcon from '@mui/icons-material/Route';
import {useTranslation} from "react-i18next"
import EditRouteInfo from '../Sidebar/rutas/EditInfoRoute';

export default function OpenIconSpeedDial({canClick,openInfo, changeDrawerContent, restoreDefautlDrawerContent, userPlaces, API_route_calls}) {
  const [t, i18n] = useTranslation("global");


  function activateClick(){
    canClick(true);
    openInfo(true);
  }

  function createRoute() {
    canClick(false);
    openInfo(false);

    console.log("--")

    changeDrawerContent(
      <EditRouteInfo
        returnFunction = {restoreDefautlDrawerContent}
        route = {null}
        userPlaces = {userPlaces}
        API_route_calls = {API_route_calls}
      />
    )
  }

  const actions = [
    { icon: <RoomIcon onClick={activateClick} />, name: "add" },
    { icon: <RouteIcon onClick={createRoute}/>, name: "createRoute" },
  ];

  return (
    <SpeedDial 
    ariaLabel="SpeedDial openIcon example"
    sx={{ position: 'absolute', bottom: 120, right: 10 }}
    icon={<SpeedDialIcon />}
    >
       {actions.map((action) => (
        <SpeedDialAction
          key={action.name}
          icon={action.icon}
          tooltipTitle={t("locations."+action.name)}
        />
        ))}
    </SpeedDial>
  );
}
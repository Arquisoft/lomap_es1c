import * as React from 'react';
import { SpeedDial } from "@mui/material";
import SpeedDialIcon from "@mui/material/SpeedDialIcon";
import RoomIcon from "@mui/icons-material/Room";
import SpeedDialAction from '@mui/material/SpeedDialAction';
import RouteIcon from '@mui/icons-material/Route';
import EditRouteInfo from '../Sidebar/cards/EditInfoRoute';

export default function OpenIconSpeedDial({canClick,openInfo, changeDrawerContent, restoreDefautlDrawerContent}) {

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
      />
    )
  }

  const actions = [
    { icon: <RoomIcon onClick={activateClick} />, name: 'Añadir Marcador' },
    { icon: <RouteIcon onClick={createRoute}/>, name: 'Crear Ruta' },
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
          tooltipTitle={action.name}
        />
        ))}
    </SpeedDial>
  );
}
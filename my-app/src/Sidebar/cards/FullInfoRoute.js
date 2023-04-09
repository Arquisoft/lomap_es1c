import React from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditInfoRoute from './EditInfoRoute';

export default function FullRouteInfo({route, returnFunction, changeDrawerContent, userPlaces, API_route_calls}) {
    function allowEdit() {
        changeDrawerContent(
            <EditInfoRoute
                route = {route}
                changeDrawerContent={changeDrawerContent}
                returnFunction={() => changeDrawerContent(this)}
                userPlaces = {userPlaces}
                API_route_calls = {API_route_calls}
            />
        )
    }

    function displayRoute() {

    }

    function deleteRoute() {
        API_route_calls.API_deleteRoute(route.id)
    }

    return (
        <>
        <IconButton onClick={returnFunction}><ArrowBackIcon/></IconButton>
        <h1>{route.name}</h1>
        {
            route.locations.map(
                location => (
                    <p key={location.id}>
                        {location.name}
                    </p>
                )
            )
        }
        <IconButton onClick={allowEdit}><EditIcon/></IconButton>
        <IconButton><TravelExploreIcon/></IconButton>
        <IconButton onClick={deleteRoute}><DeleteIcon/></IconButton>
        </>
    )
}
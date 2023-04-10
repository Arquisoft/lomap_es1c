import React, { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import TravelExploreIcon from '@mui/icons-material/TravelExplore';
import DeleteIcon from '@mui/icons-material/Delete';
import EditInfoRoute from './EditInfoRoute';
import LoadingButton from '@mui/lab/LoadingButton';

export default function FullRouteInfo({route, returnFunction, changeDrawerContent, userPlaces, API_route_calls}) {
    const [loading, setLoading] = useState(false)
    
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

    async function deleteRoute() {
        setLoading(true)
        await API_route_calls.API_deleteRoute(route.id)
        setLoading(false)
        returnFunction()
    }

    return (
        <>
        <IconButton onClick={returnFunction}><ArrowBackIcon/></IconButton>
        <h1>{route.name}</h1>
        <h3>{route.description}</h3>

        <h3>{"Lugares: "}</h3>
        <ul>
        {
            route.locations.map(
                location => (
                    <li key={location.id}>
                        {location.name}
                    </li>
                )
            )
        }
        </ul>

        <br></br>
        <div className="card--line1">
            <IconButton onClick={allowEdit}><EditIcon/></IconButton>
            {/* <IconButton><TravelExploreIcon/></IconButton> */}


            <LoadingButton
                color="secondary"
                onClick={deleteRoute}
                loading={loading}
                loadingPosition="start"
                startIcon={<DeleteIcon />}
                variant="contained"
            >
                <span>Borrar</span>
            </LoadingButton>
        </div>

        </>
    )
}
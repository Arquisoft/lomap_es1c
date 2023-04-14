import React, { useState } from "react";
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Button, IconButton, Tooltip } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import EditInfoRoute from './EditInfoRoute';
import LoadingButton from '@mui/lab/LoadingButton';
import { useTranslation } from "react-i18next";

export default function FullRouteInfo({route, returnFunction, changeDrawerContent, userPlaces, API_route_calls}) {
    const [loading, setLoading] = useState(false)
    const [t] = useTranslation("global");
    
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

    async function deleteRoute() {
        setLoading(true)
        await API_route_calls.API_deleteRoute(route.id)
        setLoading(false)
        returnFunction()
    }

    return (
        <>
        <Tooltip
            title={t("sidebar.back-arrow-text")}
            placement="bottom"
        >
            <IconButton
                onClick={returnFunction}
                disabled={loading}
            >
                <ArrowBackIcon/>
            </IconButton>
        </Tooltip>
        <h1>{route.name}</h1>
        <h3>{route.description}</h3>

        <h3>{t("sidebar.route.places-in-route")}</h3>
        <ul>
        {
            route.locations.map(
                location => (
                    <li key={location.id+"_li"}>
                        {location.name}
                    </li>
                )
            )
        }
        </ul>

        <br></br>
        <div className="card--line1">
            <Button
                onClick={allowEdit}
                disabled={loading}
                startIcon={<EditIcon/>}
                variant="contained"
            >
                <span>{t("sidebar.edit-button")}</span>
            </Button>

            <LoadingButton
                onClick={deleteRoute}
                loading={loading}
                loadingPosition="start"
                startIcon={<DeleteIcon />}
                variant="contained"
            >
                <span>{t("sidebar.delete-button")}</span>
            </LoadingButton>
        </div>
        </>
    )
}
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import EditInfoRoute from "./EditInfoRoute";
import PlaceCard from "../lugares/PlaceCard";

export default function FullRouteInfo(props) {
    const {route, returnFunction, changeDrawerContent, userPlaces, API_route_calls} = props
    const [loading, setLoading] = useState(false)
    const [t] = useTranslation("global");
    
    function allowEdit() {
        changeDrawerContent(
            <EditInfoRoute
                route = {route}
                changeDrawerContent={changeDrawerContent}
                returnTo = {<FullRouteInfo {...props} />}
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

	function allowEdit() {
		changeDrawerContent(
			<EditInfoRoute
				route={route}
				changeDrawerContent={changeDrawerContent}
				returnFunction={() => changeDrawerContent(this)}
				userPlaces={userPlaces}
				API_route_calls={API_route_calls}
			/>
		);
	}

	return (
		<>
			<Tooltip title={t("sidebar.back-arrow-text")} placement="bottom">
				<IconButton
					onClick={returnFunction}
					disabled={loading}
					data-testid="return-button"
				>
					<ArrowBackIcon />
				</IconButton>
			</Tooltip>
			<h1 data-testid="full_info_route_name">{route.name}</h1>
			<h3 data-testid="full_info_route_description">{route.description}</h3>

			<br></br>

			<h3 data-testid="list-title">{t("sidebar.route.places-in-route")}</h3>
			{route.locations.map((location) => (
				<PlaceCard
					key = {location.id}
					place = {location}
					changeDrawerContent = {changeDrawerContent}
					categorias = {[]}	// TODO
					setPosition = {props.setPosition}
					API_location_calls = {props.API_location_calls}
					isUserPlace = {true}
					returnTo = {<FullRouteInfo {...props} />}
					userPlaces = {userPlaces}
				/>
			))}

			<br></br>
			<div className="card--line1">
				<Button
					onClick={allowEdit}
					disabled={loading}
					startIcon={<EditIcon />}
					variant="contained"
					data-testid="edit-button"
				>
					<span>{t("sidebar.edit-button")}</span>
				</Button>

				<LoadingButton
					onClick={deleteRoute}
					loading={loading}
					loadingPosition="start"
					startIcon={<DeleteIcon />}
					variant="contained"
					data-testid="delete-button"
				>
					<span>{t("sidebar.delete-button")}</span>
				</LoadingButton>
			</div>
		</>
	);
}

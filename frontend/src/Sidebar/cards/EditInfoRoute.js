import AddIcon from "@mui/icons-material/Add";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { IconButton, Tooltip } from "@mui/material";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

const modifications = {
	ADD: "add",
	DELETE: "delete",
	REORDER: "reorder",
};

export default function EditRouteInfo({
	route,
	changeDrawerContent,
	returnTo,
	userPlaces,
	API_route_calls,
}) {
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState(route == null ? "" : route.name);
	const [description, setDescription] = useState(route == null ? "" : route.description);
	const [locations, setLocations] = useState(
		route == null ? [] : route.locations
	);
	const [t] = useTranslation("global");

	const [anchorMenu, setAnchorMenu] = useState(false);

	function handleNameChange(event) {
		setName(event.target.value);
	}

	function handleDescriptionChange(event) {
		setDescription(event.target.value);
	}

	const [locationsModifications, setLocationsModifications] = useState([]);

	async function save() {
		let modification
		if (name.trim().length>0  &&  description.trim().length>0) {
			setLoading(true);
			if (route == null) {
				const newId = (await API_route_calls.API_addRoute(name, description)).data.id
				for (modification of locationsModifications) {
					await modification.execute(newId);
				}
			} else {
				if (name !== route.name || description !== route.description) {
					await API_route_calls.API_updateRouteInfo(route.id, name, description);

				}
				for (modification of locationsModifications) {
					await modification.execute(route.id);
				}
			}
			setLoading(false);
		}
		changeDrawerContent(null);
	}

	function clickOnNewLocation(locationId) {
		setLocations((current) => [
			...current,
			userPlaces.find((l) => l.id === locationId),
		]);
		setLocationsModifications((current) => [
			...current,
			{
				type: modifications.ADD,
				locationID: locationId,
				execute: (routeID) =>
					API_route_calls.API_addLocationToRoute(routeID, locationId),
			},
		]);
		setAnchorMenu(null);
	}

	function removeLocation(locationId) {
        setLocations((current) => (current.filter(location => location.id !== locationId)))

        const hasBeenAddedInThisModification = locationsModifications
            .filter(modification => (modification.type===modifications.ADD  &&  modification.locationID===locationId))
            .length>0

        // Remove the unnecessary locations
        setLocationsModifications((current) => current.filter(modification => modification.locationID!==locationId))

        // Only add the DELETE modification if that location was already stored
        if (!hasBeenAddedInThisModification) {
            setLocationsModifications(current => [...current, {
                type: modifications.DELETE,
                locationID: locationId,
                execute: (routeID) => API_route_calls.API_deleteLocationFromRoute(routeID, locationId)
            }])
        }
    }

	return (
		<>
			<Tooltip
				title={t("sidebar.back-arrow-text")}
				placement="bottom"
			>
				<IconButton
					data-testid="back-button"
					onClick={() => changeDrawerContent(null)}
					disabled={loading}
				>
					<ArrowBackIcon />
				</IconButton>
			</Tooltip>
			<br></br>
			<TextField
				inputProps={{"data-testid":"text-field-title"}}
				label={t("sidebar.route.route-name")}
				defaultValue={name}
				onChange={handleNameChange}
				disabled={loading}
			/>
			<br></br>
			<TextField
				inputProps={{"data-testid":"text-field-description"}}
				label={t("sidebar.route.route-description")}
				defaultValue={description}
				onChange={handleDescriptionChange}
				disabled={loading}
			/>
			<div className="card--line1">
				<h3 data-testid="your-locations-title">{t("sidebar.route.places-in-route")}</h3>
				<Tooltip
					title={t("sidebar.route.add-location-button")}
					placement="bottom"
				>
					<IconButton
						data-testid="add-button"
						onClick={(event) => setAnchorMenu(event.currentTarget)}
						disabled={loading}
					>
						<AddIcon />
					</IconButton>
				</Tooltip>
			</div>

			<Menu
				anchorEl={anchorMenu}
				open={Boolean(anchorMenu)}
				onClose={() => setAnchorMenu(null)}
				data-testid="menu-add-locations"
			>
				{userPlaces
					.filter((location) => !locations.find((l) => l.id === location.id))
					.map((location) => (
						<MenuItem
							key={location.id + "mnitem"}
							onClick={() => {clickOnNewLocation(location.id); setAnchorMenu(null);}}
							data-testid={location.id + "_mnitem"}
							disabled={loading}
						>
							{location.name}
						</MenuItem>
					))}
			</Menu>

			<ul>
			{locations.map((location) => (
				<li key={location.id+"_li"} data-testid={location.id+"_li"}>
				<div key={location.id + "div"} className="card--line1">
					<p key={location.id+"_p"} data-testid={"location_list_name_"+location.id}>{location.name}</p>
					<Tooltip
						title={t("sidebar.route.remove-location-button")}
						placement="bottom"
					>
						<IconButton
							key={location.id + "_db"}
							onClick={() => removeLocation(location.id)}
							data-testid={"location_detetebutton_"+location.id}
							disabled={loading}
						>
							<DeleteIcon />
						</IconButton>
					</Tooltip>
				</div>
				</li>
			))}
			</ul>

			<br></br>

			<LoadingButton
				data-testid="save-button"
				color="secondary"
				onClick={save}
				loading={loading}
				loadingPosition="start"
				startIcon={<SaveIcon />}
				variant="contained"
			>
				<span>{t("sidebar.route.save-route-button")}</span>
			</LoadingButton>
		</>
	);
}

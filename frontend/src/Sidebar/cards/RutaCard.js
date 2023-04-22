import FullscreenIcon from "@mui/icons-material/Fullscreen";
import { IconButton } from "@mui/material";
import React from "react";
import FullRouteInfo from "./FullInfoRoute";

export default function RutaCard(props) {
	async function showFullRouteInfo() {
		const routeLocations = await props.API_route_calls.API_getRouteByID(
			props.route.id
		);
		props.route.locations = routeLocations;
		props.changeDrawerContent(
			<FullRouteInfo
				key={props.route.id}
				route={props.route}
				returnFunction={() => props.changeDrawerContent(null)}
				changeDrawerContent={props.changeDrawerContent}
				userPlaces={props.userPlaces}
				API_route_calls={props.API_route_calls}
			/>
		);
	}

	return (
		<div className="card" data-testid={"route_card_" + props.route.id}>
			<hr />
			<h3 data-testid={"route_card_title_text_" + props.route.id}>
				{props.route.name}
			</h3>
			<p data-testid={"route_card_description_text_" + props.route.id}>
				{props.route.description}
			</p>
			<IconButton
				data-testid={"full_screen_button_" + props.route.id}
				onClick={showFullRouteInfo}
			>
				<FullscreenIcon />
			</IconButton>
		</div>
	);
}

import React from "react";
import FullRouteInfo from "./FullInfoRoute";

export default function RutaCard(props) {
	async function showFullRouteInfo() {
		const routeLocations = await props.API_route_calls.getRouteByID(
			props.route.id
		);
		props.route.locations = routeLocations;
		props.changeDrawerContent(
			<FullRouteInfo
				key={props.route.id}
				route={props.route}
				changeDrawerContent={props.changeDrawerContent}
				userPlaces={props.userPlaces}
				API_route_calls={props.API_route_calls}
				API_location_calls={props.API_location_calls}
				setPosition = {props.setPosition}
				categorias = {props.categorias}
				loggedInUserwebId = {props.loggedInUserwebId}
				returnTo = {props.returnTo}
				getFriendName = {props.getFriendName}
			/>
		);
	}

	return (
		<div
			onClick={showFullRouteInfo}
			className="card"
			data-testid={"route_card_" + props.route.id}
		>
			<h3 data-testid={"route_card_title_text_" + props.route.id}>
				{props.route.name}
			</h3>
			<p data-testid={"route_card_description_text_" + props.route.id}>
				{props.route.description}
			</p>
		</div>
	);
}

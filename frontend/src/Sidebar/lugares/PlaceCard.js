import React from "react";
import FullInfoPlace from "./FullInfoPlace";

export default function LugarCard(props) {
	const place = props.place;

	async function showFullInfo() {
		if (props.setDisableComponents)
			{props.setDisableComponents(true)}
		var fullPlace = await props.API_location_calls.API_getPlaceById(place.author,place.id);

		props.changeDrawerContent(
			<FullInfoPlace
				place={fullPlace}
				setPosition={props.setPosition}
				returnFunction={() => props.changeDrawerContent(null)}
				changeDrawerContent={props.changeDrawerContent}
				returnTo={props.returnTo}
				categorias={props.categorias}
				API_location_calls={props.API_location_calls}
				userPlaces={props.userPlaces}
				loggedInUserwebId = {props.loggedInUserwebId}
			/>
			);
		if (props.setDisableComponents)
			{props.setDisableComponents(false)}
	}

	const maxTextLength = 15;

	return (
		<div className="card" onClick={showFullInfo} disabled={props.disableComponents}>
			<div className="card--line1">
				<h3>
					{place.name.substring(0, maxTextLength)}{" "}
					{place.name.length > maxTextLength && " ..."}
				</h3>
				{place.category && <p>{place.category}</p>}
			</div>
		</div>
	);
}

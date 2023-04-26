import React from "react";
import FullInfoPlace from "./FullInfoPlace";

export default function LugarCard(props) {
	const place = props.place;

	async function showFullInfo() {
		// TODO: es diferente si es un lugar de un amigo o del usuario
		var fullPlace
		if (true) {
			fullPlace = await props.API_location_calls.API_getPlaceById(place.id);
		} else {
			// fullPlace = await props.
		}

		props.changeDrawerContent(
			<FullInfoPlace
				place={fullPlace}
				setPosition={props.setPosition}
				returnFunction={() => props.changeDrawerContent(null)}
				changeDrawerContent={props.changeDrawerContent}
				returnTo={props.returnTo}
				categorias={props.categorias}
				API_location_calls={props.API_location_calls}
				isUserPlace={props.isUserPlace}
				userPlaces={props.userPlaces}
				loggedInUserwebId = {props.loggedInUserwebId}
			/>
		);
	}

	const maxTextLength = 20;

	return (
		<div className="card" onClick={showFullInfo}>
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

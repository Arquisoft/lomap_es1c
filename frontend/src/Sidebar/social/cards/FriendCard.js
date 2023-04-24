import FullscreenIcon from "@mui/icons-material/Fullscreen";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import FullFriendInfo from "../../cards/FullFriendInfo";

export default function FriendCard(props) {
	const [isVisible, setIsVisible] = useState(false);

	async function toggleVisibility() {
		if (!isVisible) {
			var friendPlaces = await props.API_friend_calls.API_getPlacesOfFriend(
				props.friend.webId
			);
			props.setFriendsPlaces((current) => current.concat(friendPlaces));
		} else {
			props.setFriendsPlaces((current) =>
				current.filter((place) => place.author !== props.friend.webId)
			);
		}
		setIsVisible((current) => !current);
	}

	async function showFullAmigoInfo() {
		// TODO: comprobar si ya tenemos sus lugares
		// TODO: cogerlos si no los tenemos

		var friendPlaces = await props.API_friend_calls.API_getPlacesOfFriend(
			props.friend.webId
		);

		props.changeDrawerContent(
			<FullFriendInfo
				amigo={props.friend}
				places={friendPlaces}
				setPosition={props.setPosition}
				changeDrawerContent={props.changeDrawerContent}
				returnTo={props.returnTo}
				API_friend_calls={props.API_friend_calls}
				API_location_calls={props.API_location_calls}
			/>
		);
	}

	return (
		<>
			{/* Separador */}
			<hr></hr>

			<div className="card--line1">
				{/* Nombre del amigo */}
				<p>{props.friend.name}</p>

				{/* Botón toda la info */}
				<Tooltip title="Ver amigo" placement="bottom">
					<IconButton onClick={showFullAmigoInfo}>
						<FullscreenIcon />
					</IconButton>
				</Tooltip>

				{/* Checkbox para mostrar los puntos en el mapa */}
				<Tooltip
					title={isVisible ? "Ocultar del mapa" : "Mostrar en el mapa"}
					placement="bottom"
				>
					<IconButton onClick={toggleVisibility}>
						{isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
					</IconButton>
				</Tooltip>
			</div>
		</>
	);
}

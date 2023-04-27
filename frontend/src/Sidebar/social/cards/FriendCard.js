import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import FullFriendInfo from "../FullFriendInfo";

export default function FriendCard(props) {
	const [isVisible, setIsVisible] = useState(false);

	function handleButtonClick(event) {
		event.stopPropagation()
		toggleVisibility();
	}

	async function toggleVisibility() {
		if (!isVisible) {
			var friendPlaces = await props.API_friend_calls.getPlacesOfFriend(
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
		var friendPlaces = await props.API_friend_calls.getPlacesOfFriend(
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
				loggedInUserwebId = {props.loggedInUserwebId}
			/>
		);
	}

	return (
		<div
			onClick = {showFullAmigoInfo}
			className="card"
		>
			<div className="card--line1">
				{/* Nombre del amigo */}
				<p>{props.friend.name}</p>

				{/* Checkbox para mostrar los puntos en el mapa */}
				<Tooltip
					title={isVisible ? "Ocultar del mapa" : "Mostrar en el mapa"}
					placement="bottom"
				>
					<IconButton onClick={handleButtonClick}>
						{isVisible ? <VisibilityOffIcon /> : <VisibilityIcon />}
					</IconButton>
				</Tooltip>
			</div>
		</div>
	);
}

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import FriendCard from "./cards/FriendCard";

export default function SeguidosContent(props) {
	const [t] = useTranslation("global");

	return (
		<>
			{/* Return button */}
			<Tooltip title={t("sidebar.back-arrow-text")} placement="bottom">
				<IconButton onClick={() => props.changeDrawerContent(props.returnTo)}>
					<ArrowBackIcon />
				</IconButton>
			</Tooltip>

			{/* TODO: internacionalizar */}
			<h1>Amigos</h1>

			{/* Friend cards */}
			{props.amigos.map((friend) => (
				<FriendCard
					key={"friend_card_" + friend.webid}
					API_friend_calls={props.API_friend_calls}
					friend={friend}
					changeDrawerContent={props.changeDrawerContent}
					returnTo={<SeguidosContent {...props} />}
					API_location_calls={props.API_location_calls}
					setPosition={props.setPosition}
					setFriendsPlaces={props.setFriendsPlaces}
					friendsPlaces={props.friendsPlaces}
				/>
			))}
		</>
	);
}

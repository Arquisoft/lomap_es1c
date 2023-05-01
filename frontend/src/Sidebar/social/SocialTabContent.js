import React from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import AddFriendContent from "./AddFriendContent";
import SolicitudesContent from "./SolicitudesContent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Tooltip } from "@mui/material";
import FriendCard from "./cards/FriendCard";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';

export default function SocialTabContent(props) {
	const {
		API_friend_calls,
		changeDrawerContent,
		solicitudes,
	} = props;
	const [t] = useTranslation("global");

	function handleClickOnAddFriend() {
		changeDrawerContent(
			<AddFriendContent
				API_friend_calls={API_friend_calls}
				returnTo={<SocialTabContent {...props} />}
				changeDrawerContent={changeDrawerContent}
			/>
		);
	}

	function handleClickOnSolicitudes() {
		changeDrawerContent(
			<SolicitudesContent
				API_friend_calls={API_friend_calls}
				solicitudes={solicitudes}
				returnTo={<SocialTabContent {...props} />}
				changeDrawerContent={changeDrawerContent}
			/>
		);
	}

	return (
		<div className="tabcontent">
			{/* Botón atrás */}
			<Tooltip title={t("sidebar.back-arrow-text")} placement="bottom">
                <IconButton onClick={() => props.changeDrawerContent(props.returnTo)} data-testid="arrow"> 
                    <ArrowBackIcon />
                </IconButton>
            </Tooltip>

			{/* Título */}
			<h1 id="centered">{t("sidebar.tab-buttons.friends")}</h1>

			<div className="card--line1">
				{/* Botón de solicitudes */}
				<Button variant="contained" onClick={handleClickOnSolicitudes} data-testid="solicitudes">
					{t("sidebar.friends.awaitingrequests")}
				</Button>

				{/* Botón para añadir solicitud */}
				<Tooltip title={t("sidebar.friends.addfriend")}>
					<IconButton onClick={handleClickOnAddFriend}  data-testid="add">
						<AddCircleOutlineIcon />
					</IconButton>
				</Tooltip>
			</div>

			<hr></hr>

			{/* Friend cards */}
			{props.amigos.map((friend) => (
				<FriendCard
					key={"friend_card_" + friend.webId}
					API_friend_calls={props.API_friend_calls}
					friend={friend}
					changeDrawerContent={props.changeDrawerContent}
					returnTo={<SocialTabContent {...props} />}
					API_location_calls={props.API_location_calls}
					setPosition={props.setPosition}
					setFriendsPlaces={props.setFriendsPlaces}
					friendsPlaces={props.friendsPlaces}
					loggedInUserwebId = {props.loggedInUserwebId}
				/>
			))}

			
		</div>
	);
}

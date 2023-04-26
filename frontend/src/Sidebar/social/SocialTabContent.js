import React from "react";
import { Button } from "@mui/material";
import { useTranslation } from "react-i18next";
import AddFriendContent from "./AddFriendContent";
import SeguidosContent from "./SeguidosContent";
import SolicitudesContent from "./SolicitudesContent";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Tooltip } from "@mui/material";

export default function AmigosTabContent(props) {
	const {
		API_friend_calls,
		changeDrawerContent,
		API_location_calls,
		setPosition,
		solicitudes,
	} = props;
	const [t] = useTranslation("global");

	function handleClickOnAddFriend() {
		changeDrawerContent(
			<AddFriendContent
				API_friend_calls={API_friend_calls}
				returnFunction={() => changeDrawerContent(this)}
			/>
		);
	}

	function handleClickOnAmigos() {
		changeDrawerContent(
			<SeguidosContent
				API_friend_calls={API_friend_calls}
				amigos={props.amigos}
				returnTo={<AmigosTabContent {...props} />}
				changeDrawerContent={changeDrawerContent}
				API_location_calls={API_location_calls}
				setPosition={setPosition}
				setFriendsPlaces={props.setFriendsPlaces}
				friendsPlaces={props.friendsPlaces}
			/>
		);
	}

	function handleClickOnSolicitudes() {
		changeDrawerContent(
			<SolicitudesContent
				API_friend_calls={API_friend_calls}
				solicitudes={solicitudes}
				returnTo={<AmigosTabContent {...props} />}
				changeDrawerContent={changeDrawerContent}
			/>
		);
	}

	return (
		<div className="tabcontent">

			<Tooltip title={t("sidebar.back-arrow-text")} placement="bottom">
                <IconButton onClick={() => props.changeDrawerContent(props.returnTo)}>
                    <ArrowBackIcon />
                </IconButton>

            </Tooltip>

			<h1 id="centered">Social</h1>

			<Button variant="contained" onClick={handleClickOnAddFriend}>
				{/* TODO internacionalizar */}
				Crear petición de solicitud
			</Button>

			<Button variant="contained" onClick={handleClickOnAmigos}>
				{/* TODO internacionalizar */}
				Amigos
			</Button>

			<Button variant="contained" onClick={handleClickOnSolicitudes}>
				{/* TODO internacionalizar */}
				Solicitudes
			</Button>
		</div>
	);
}

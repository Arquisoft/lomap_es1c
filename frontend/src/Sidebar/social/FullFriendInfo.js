import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton";
import React, { useState } from "react";
import PlaceCard from "../lugares/PlaceCard";
import { useTranslation } from "react-i18next";
import { IconButton, Tooltip } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

export default function FullFriendInfo(props) {
	const {amigo,
		places,
		setPosition,
		changeDrawerContent,
		API_location_calls,
		API_friend_calls} = props
	const [loading, setLoading] = useState(false);
	const [t] = useTranslation("global");

	async function deleteFriend() {
		setLoading(true);

		await API_friend_calls.API_removeFriend(amigo.webId);

		setLoading(false);
		changeDrawerContent(null);
	}

	return (
		<>
			<Tooltip title={t("sidebar.back-arrow-text")} placement="bottom">
                <IconButton onClick={() => props.changeDrawerContent(props.returnTo)} data-testid="arrow">
                    <ArrowBackIcon />
                </IconButton>
            </Tooltip>

			{/* Nombre */}
			<h1>{amigo.name}</h1>

			{/* WebID del amigo */}
			<p>({amigo.webId})</p>

			<hr></hr>

			{/* Listado con los places de ese amigo */}
			<h3>{t("sidebar.friends.friend.friend-places")}:</h3>
			{places.map((place) => (
				<PlaceCard
					key={amigo.webid + "_placeCard_" + place.id}
					place={place}
					changeDrawerContent={changeDrawerContent}
					setPosition={setPosition}
					API_location_calls={API_location_calls}
					returnTo = {<FullFriendInfo {...props} />}
					loggedInUserwebId = {props.loggedInUserwebId}
				/>
			))}

			<hr></hr>
			{/* Botón de eliminar */}
			<LoadingButton
				onClick={deleteFriend}
				loading={loading}
				loadingPosition="start"
				startIcon={<DeleteIcon />}
				variant="contained"
				data-testid="deleteFriend"
			>
				{t("sidebar.friends.friend.delete-friend")}
			</LoadingButton>
		</>
	);
}

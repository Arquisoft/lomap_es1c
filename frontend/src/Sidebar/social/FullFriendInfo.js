import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
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
		returnTo,
		API_location_calls,
		API_friend_calls} = props
	const [loading, setLoading] = useState(false);
	const [t] = useTranslation("global");

	async function deleteFriend() {
		setLoading(true);

		await API_friend_calls.API_removeFriend(amigo.webid);

		setLoading(false);
		changeDrawerContent(returnTo);
	}

	return (
		<>
			{/* TODO: botón de atrás */}
			<Tooltip title={t("sidebar.back-arrow-text")} placement="bottom">
                <IconButton onClick={() => props.changeDrawerContent(props.returnTo)}>
                    <ArrowBackIcon />
                </IconButton>
            </Tooltip>

			{/* Nombre */}
			<h1>{amigo.name}</h1>

			{/* WebID del amigo */}
			<p>({amigo.webId})</p>

			<hr></hr>

			{/* Listado con los places de ese amigo */}
			{/* TODO: internacionalizar */}
			<h3>Lugares de ese amigo: </h3>
			{places.map((place) => (
				// TODO: comprobar que recibe todos los parámetros necesarios
				<PlaceCard
					key={amigo.webid + "_placeCard_" + place.id}
					// TODO: coger toda la info del lugar (no es la misma función)
					place={place}
					changeDrawerContent={changeDrawerContent}
					setPosition={setPosition}
					API_location_calls={API_location_calls}
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
			>
				{/* TODO: internacionalizar */}
				Eliminar amigo
			</LoadingButton>
		</>
	);
}

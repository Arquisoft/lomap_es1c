import DeleteIcon from "@mui/icons-material/Delete";
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";
import React, { useState } from "react";
import PlaceCard from "./PlaceCard";

export default function FullFriendInfo({
	amigo,
	places,
	setPosition,
	changeDrawerContent,
	returnTo,
	API_location_calls,
	API_friend_calls,
}) {
	const [loading, setLoading] = useState(false);

	async function deleteFriend() {
		setLoading(true);

		await API_friend_calls.API_removeFriend(amigo.webid);

		setLoading(false);
		changeDrawerContent(returnTo);
	}

	return (
		<>
			{/* TODO: botón de atrás */}

			<div className="card--line1">
				{/* Nombre */}
				<h1>{amigo.name}</h1>

				{/* WebID del amigo */}
				<p>({amigo.webid})</p>
			</div>

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

			{/* Listado con los places de ese amigo */}
			{/* TODO: internacionalizar */}
			<h3>Lugares de ese amigo: </h3>
			{places.map((place) => (
				<PlaceCard
					key={amigo.webid + "_placeCard_" + place.id}
					place={place}
					changeDrawerContent={changeDrawerContent}
					setPosition={setPosition}
					API_location_calls={API_location_calls}
					isUserPlace={false}
				/>
			))}
			<hr></hr>
		</>
	);
}

import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import AddFriendContent from "../AddFriendContent";

// solicitud = {id, sender, receiver, timestamp}
export default function SolicitudCard(props) {
	const [loading, setLoading] = useState(false);

	async function acceptRequest() {
		props.changeDrawerContent(
			<AddFriendContent
				API_friend_calls = {props.API_friend_calls}
				returnTo = {props.returnTo}
				changeDrawerContent = {props.changeDrawerContent}
				solicitud = {props.solicitud}

			/>
		)
		setLoading(false);
	}

	async function rejectRequest() {
		setLoading(true);
		await props.API_friend_calls.API_rejectIncomingFriendRequest(
			props.solicitud.sender
		);
		setLoading(false);
	}

	return (
		<div>
			<hr></hr>
			<div className="card--line1">
				<div id="long_text">
					<p >{props.solicitud.sender}</p>
				</div>

				{/* TODO internacionalizar */}
				<Tooltip title="Aceptar" placement="bottom">
					<IconButton onClick={acceptRequest} disabled={loading}>
						<CheckCircleOutlineIcon />
					</IconButton>
				</Tooltip>

				{/* TODO internacionalizar */}
				<Tooltip title="Rechazar" placement="bottom">
					<IconButton onClick={rejectRequest} disabled={loading}>
						<CancelIcon />
					</IconButton>
				</Tooltip>
			</div>
		</div>
	);
}

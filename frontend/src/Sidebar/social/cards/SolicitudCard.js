import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";

// solicitud = {id, sender, receiver, timestamp}
export default function SolicitudCard(props) {
	const [loading, setLoading] = useState(false);

	async function acceptRequest() {
		setLoading(true);
		await props.API_friend_calls.API_acceptIncomingFriendRequest(
			props.solicitud.sender
		);
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
				<p>{props.solicitud.sender}</p>

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

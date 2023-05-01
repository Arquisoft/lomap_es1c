import CancelIcon from "@mui/icons-material/Cancel";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { IconButton, Tooltip } from "@mui/material";
import React, { useState } from "react";
import AddFriendContent from "../AddFriendContent";
import { useTranslation } from "react-i18next";

export default function SolicitudCard(props) {
	const [loading, setLoading] = useState(false);
	const [t, i18n] = useTranslation("global")

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
		props.changeDrawerContent(null);
	}

	return (
		<div>
			<hr></hr>
			<div className="card--line1">
				<div id="long_text">
					<p >{props.solicitud.sender}</p>
				</div>

				<Tooltip title={t("sidebar.friends.accept")} placement="bottom">
					<IconButton onClick={acceptRequest} disabled={loading} data-testid="accept">
						<CheckCircleOutlineIcon />
					</IconButton>
				</Tooltip>

				<Tooltip title={t("sidebar.friends.reject")} placement="bottom" data-testid="reject">
					<IconButton onClick={rejectRequest} disabled={loading}>
						<CancelIcon />
					</IconButton>
				</Tooltip>
			</div>
		</div>
	);
}

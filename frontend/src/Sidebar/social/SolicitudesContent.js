import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton, Tooltip } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import SolicitudCard from "./cards/SolicitudCard";

export default function SolicitudesContent(props) {
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
			<h1>Solicitudes</h1>

			{/* Request cards */}
			{props.solicitudes.map((solicitud) => (
				<SolicitudCard
					key={"solicitud_card" + solicitud.id}
					API_friend_calls={props.API_friend_calls}
					solicitud={solicitud}
				/>
			))}
		</>
	);
}

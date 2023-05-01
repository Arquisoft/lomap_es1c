import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoadingButton from "@mui/lab/LoadingButton";
import { useTranslation } from "react-i18next";

export default function AddFriendContent(props) {
	const { API_friend_calls, returnTo, changeDrawerContent } = props
	const [name, setName] = useState("");
	const [webId, setwebId] = useState(props.solicitud ? props.solicitud.sender : "");

	const [isNameErrored, setIsNameErrored] = useState(true)
	const [isWebIdErrored, setIsWebIdErrored] = useState(webId.length<=0)

	const [loading, setLoading] = useState(false)

	const [t] = useTranslation("global");

	async function addFriend() {
		setLoading(true);

		if (props.solicitud) {
			await API_friend_calls.API_acceptIncomingFriendRequest(webId, name)
		} else {
			await API_friend_calls.API_generateNewFriendRequest(webId, name);
		}
		
		setLoading(false);
		changeDrawerContent(null)
	}

	function returnFunction() {
		changeDrawerContent(returnTo);
	}

	function handleNameChange(event) {
		setName(event.target.value)
		setIsNameErrored(event.target.value.trim().length <= 0)
	}

	function handleWebIdChange(event) {
		setwebId(event.target.value)
		setIsWebIdErrored(event.target.value.trim().length <= 0)
	}

	return (
		<>
			{/* Botón de atrás */}
			<IconButton onClick={returnFunction} disabled={loading} data-testid="arrow">
				<ArrowBackIcon />
			</IconButton>

			<br></br>

			{/* Nombre */}
			{/* TODO: internacionalizar */}
			<TextField
				label="Nombre"
				placeholder="Nombre"
				onChange={handleNameChange}
				required
				margin="normal"
				error={isNameErrored}
				helperText = {isNameErrored ? t("sidebar.friends.namecannotbeempty") : ""}
				disabled={loading}
				inputProps={{"data-testid":"nameTextField"}}
			/>

			<br></br>

			{/* WebID */}
			<TextField
				label="webId"
				placeholder="WebId"
				onChange={handleWebIdChange}
				required
				margin="normal"
				error={isWebIdErrored}
				helperText = {isWebIdErrored ? t("sidebar.friends.webidcannotbeempty") : ""}
				disabled = {Boolean(props.solicitud)  ||  loading}
				defaultValue={webId}
			/>

			<br></br>

			<LoadingButton
				onClick = {addFriend}
				loading = {loading}
				loadingPosition="start"
				startIcon={props.solicitud ?<PersonAddIcon />:<SendIcon />}
				variant="contained"
				disabled = {isNameErrored  ||  isWebIdErrored}
				data-testid="addFriend"
			>
				{props.solicitud ? t("sidebar.friends.addfriend") : t("sidebar.friends.sendrequest")}
			</LoadingButton>
		</>
	);
}

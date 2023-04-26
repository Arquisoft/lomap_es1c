import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import SendIcon from '@mui/icons-material/Send';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import LoadingButton from "@mui/lab/LoadingButton/LoadingButton";

export default function AddFriendContent(props) {
	const { API_friend_calls, returnTo, changeDrawerContent } = props
	const [name, setName] = useState("");
	const [webId, setwebId] = useState(props.solicitud ? props.solicitud.sender : "");

	const [isNameErrored, setIsNameErrored] = useState(true)
	const [isWebIdErrored, setIsWebIdErrored] = useState(webId.length<=0)

	const [loading, setLoading] = useState(false)

	async function addFriend() {
		setLoading(true);

		if (props.solicitud) {
			await API_friend_calls.API_acceptIncomingFriendRequest(webId, name)
		} else {
			await API_friend_calls.API_generateNewFriendRequest(webId, name);
		}
		
		setLoading(false);
		returnFunction()
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
			<IconButton onClick={returnFunction} disabled={loading}>
				<ArrowBackIcon />
			</IconButton>

			<br></br>

			{/* Nombre */}
			<TextField
				label="Nombre"
				onChange={handleNameChange}
				required
				margin="normal"
				error={isNameErrored}
				helperText = {isNameErrored ? "El nombre no puede estar vacío" : ""}
				disabled={loading}
				defaultValue={name}
			/>

			<br></br>

			{/* WebID */}
			<TextField
				label="webId"
				onChange={handleWebIdChange}
				required
				margin="normal"
				error={isWebIdErrored}
				helperText = {isWebIdErrored ? "El WebID no puede estar vacío" : ""}
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
			>
				{/* TODO: internacionalizar */}
				{props.solicitud ? "Agregar amigo" : "Enviar solicitud"}
			</LoadingButton>
		</>
	);
}

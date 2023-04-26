import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import { IconButton } from "@mui/material";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";

export default function AddFriendContent({ API_friend_calls, returnFunction }) {
	const [name, setName] = useState("");
	const [webId, setwebId] = useState("");

	async function addFriend() {
		if (name.trim() != "" && webId.trim() != "") {
			await API_friend_calls.API_generateNewFriendRequest(webId, name);

			returnFunction();
		} else {
			alert("Rellena todos los campos");
		}
	}

	// async function checkwebId(webIdUrl) {
	// 	try {
	// 		const response = await fetch(webIdUrl, { method: "HEAD", base: "" });

	// 		if (response.ok) {
	// 			return true;
	// 		} else {
	// 			alert("El webId no existe");
	// 			return false;
	// 		}
	// 	} catch (error) {
	// 		alert("El webId no existe");
	// 		return false;
	// 	}
	// }

	return (
		<>
			<IconButton onClick={returnFunction}>
				<ArrowBackIcon />
			</IconButton>

			<br></br>

			<TextField
				label="Nombre"
				onChange={(event) => setName(event.target.value)}
			/>

			<br></br>

			<TextField
				label="webId"
				onChange={(event) => setwebId(event.target.value)}
			/>

			<br></br>

			<IconButton onClick={addFriend}>
				<SaveIcon />
			</IconButton>
		</>
	);
}

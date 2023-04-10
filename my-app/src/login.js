import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import "./login.css";

export default function Login({ logInFunction }) {
	const [text, setText] = useState("");

	const handleInrupt = () => {
		setText("https://login.inrupt.com/");
	};

	const handleSolid = () => {
		setText("https://solidcommunity.net/login");
	};

	return (
		<div className="mainDiv">
			<div className="logoYParrafo">
				<img src="/logoLoMap.png" className="logo" alt="Logo de LoMap"></img>
				<p className="descripción">
					LoMap te permite cerar mapas personalizados de los lugares que te
					interesan.
				</p>
			</div>
			<div className="formName">
				<Box className="caja" component="span">
					<TextField
						className="url"
						label="Escribir algo"
						value={text}
						onChange={(e) => setText(e.target.value)}
					/>
					<br></br>
					<Button className="btnLogin" onClick={handleInrupt}>
						Inrupt
					</Button>
					<br></br>
					<Button className="btnLogin" onClick={handleSolid}>
						Solid
					</Button>
					<br></br>
					<Button className="btnLogin" onClick={logInFunction}>
						Iniciar Sesión
					</Button>
				</Box>
			</div>
		</div>
	);
}

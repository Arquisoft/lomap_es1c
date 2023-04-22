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
		setText("https://solidcommunity.net");
	};

	return (
			<Box className="mainDiv" component="div">
				{/* <div className="logoYParrafo"> */}
					<img src="/logoLoMap.png" className="logo" alt="Logo de LoMap"></img>
					<p className="descripción">
						LoMap te permite cerar mapas personalizados de los lugares que te
						interesan.
					</p>
				{/* </div> */}
				<div className="formName">
					<Box className="caja" component="div">
						<div className="login">
							<TextField
								className="url"
								label="URL de su provider"
								value={text}
								variant="filled"
								type="text"
								onChange={(e) => setText(e.target.value)}
							/>
							<Button className="btnLogin" variant="outlined" onClick={logInFunction}>
								Iniciar Sesión
							</Button>
						</div>
						<div className="providers">
							<Button className="btnProvider1" variant="outlined" onClick={handleInrupt}>
								Inrupt
							</Button>
							<Button className="btnProvider2" variant="outlined" onClick={handleSolid}>
								Solid
							</Button>
						</div>
					</Box>
				</div>
			</Box>
	);
}

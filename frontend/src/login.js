import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import "./login.css";
import SettingsSpeedDial from "./buttons/SettingsSpeedDial";
import { useTranslation } from "react-i18next";

export default function Login({ logInFunction, isLoggedIn, toggleLanguage }) {
	const [text, setText] = useState("");
	const [t, i18n] = useTranslation("global");

	const handleInrupt = () => {
		setText("https://login.inrupt.com/");
	};

	const handleSolid = () => {
		setText("https://solidcommunity.net");
	};

	function toggleLanguage() {
		i18n.changeLanguage(i18n.language === "es" ? "en" : "es");
	}

	return (
		<>
			<SettingsSpeedDial
				isLoggedIn = {isLoggedIn}
				changeLanguage = {toggleLanguage}
			/>

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
							<Button className="btnLogin" variant="outlined" onClick={() => logInFunction(text)}>
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
		</>
	);
}

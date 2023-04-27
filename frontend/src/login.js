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

			<div className="mainDiv" data-testid="mainDiv">
				{/* <div className="logoYParrafo"> */}
					<img src="/logoLoMap.png" className="logo" alt="Logo de LoMap" data-testid="logo"></img>
					<p className="descripción" data-testid="presentación">
						LoMap te permite cerar mapas personalizados de los lugares que te
						interesan.
					</p>
				{/* </div> */}
				<div className="formName" data-testid="formName">
					<Box className="caja" component="div" data-testid="caja">
						<div className="login">
							<TextField
								className="url"
								label="URL de su provider"
								value={text}
								variant="filled"
								type="text"
								onChange={(e) => setText(e.target.value)}
							/>
							<Button className="btnLogin" variant="outlined" onClick={() => logInFunction(text)} data-testid="inicioSesion">
								Iniciar Sesión
							</Button>
						</div>
						<div className="providers" data-testid="providers">
							<Button className="btnProvider1" variant="outlined" onClick={handleInrupt} data-testid="primero">
								Inrupt
							</Button>
							<Button className="btnProvider2" variant="outlined" onClick={handleSolid} data-testid="segundo">
								Solid
							</Button>
						</div>
					</Box>
				</div>
			</div>
		</>
	);
}

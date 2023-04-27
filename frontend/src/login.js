import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useContext } from "react";
import "./login.css";
import SettingsSpeedDial from "./buttons/SettingsSpeedDial";
import { useTranslation } from "react-i18next";
import { ThemeContext, Themes } from "./contexts/ThemeContext";
import CircularProgress from "@mui/material/CircularProgress";

export default function Login({ logInFunction, isLoggedIn, toggleLanguage, isStructBeingCreated }) {
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
	
	const { currentTheme, setCurrentTheme } = useContext(ThemeContext);

	return (
		<>

		{isStructBeingCreated
			?
		(<CircularProgress
			size={45}
			style={{
				position: "absolute",
				top: "50%",
				left: "50%",
				transform: "translate(-50%, -50%)",
			}}
		/>)
			:
		(<div id={currentTheme}>
		<SettingsSpeedDial
			isLoggedIn = {isLoggedIn}
			changeLanguage = {toggleLanguage}
		/>

		<div className="mainDiv" component="div" data-testId="mainDiv">
				<img src="/logoLoMap.png" className="logo" alt="Logo de LoMap" data-testId="logo" />
				<p className="descripción"  data-testId="presentación">
					LoMap te permite cerar mapas personalizados de los lugares que te
					interesan.
				</p>
			<div className="formName"  data-testId="formName">
				<div className="caja" data-testId="caja">
					<div className="login" data-testId="inicioSesion">
						<TextField
							className="url"
							label="URL de su provider"
							value={text}
							variant="filled"
							type="text"
							onChange={(e) => setText(e.target.value)}
						/>
						<Button className="btnLogin" variant="outlined" onClick={() => {logInFunction(text)}} data-testId="btnLogin">
							Iniciar Sesión
						</Button>
					</div>
					<div className="providers" data-testId="providers">
						<Button className="btnProvider1" variant="outlined" onClick={handleInrupt} data-testId="btnProvider1">
							Inrupt
						</Button>
						<Button className="btnProvider2" variant="outlined" onClick={handleSolid} data-testId="btnProvider2">
							Solid
						</Button>
					</div>
				</div>
			</div>
		</div>
		</div>)
		}
		</>
	);
}

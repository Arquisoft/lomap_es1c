import { Button, TextField } from "@mui/material";
import React, { useState } from "react";
import "./login.css";
import SettingsSpeedDial from "./buttons/SettingsSpeedDial";
import { useTranslation } from "react-i18next";
import CircularProgress from "@mui/material/CircularProgress";

export default function Login({ logInFunction, isLoggedIn, toggleLanguage, isStructBeingCreated }) {
	const [text, setText] = useState("https://login.inrupt.com/");
	const [t, i18n] = useTranslation("global");

	function toggleLanguage() {
		i18n.changeLanguage(i18n.language === "es" ? "en" : "es");
	}

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
		(<div id="light">
				<SettingsSpeedDial
					isLoggedIn = {isLoggedIn}
					changeLanguage = {toggleLanguage}
				/>

		<div className="mainDiv" component="div" data-testId="mainDiv">
				<img src="/logoLoMap.png" className="logo" alt="Logo de LoMap" data-testId="logo" />
				<p className="descripción"  data-testId="presentación">
					{t("login.lomap_description")}
				</p>
			<div className="formName"  data-testId="formName">
				<div className="caja" data-testId="caja">
					<div className="login" data-testId="inicioSesion">
						<TextField
							className="url"
							label={t("login.provider_url")}
							value={text}
							variant="filled"
							type="text"
							onChange={(e) => setText(e.target.value)}
						/>
						<Button className="btnLogin" variant="outlined" onClick={() => {logInFunction(text)}}  data-testId="btnLogin">
							{t("login.login-button")}
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

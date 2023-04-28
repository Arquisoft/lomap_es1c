import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState, useContext } from "react";
import "./login.css";
import SettingsSpeedDial from "./buttons/SettingsSpeedDial";
import { useTranslation } from "react-i18next";
import { ThemeContext } from "./contexts/ThemeContext";
import CircularProgress from "@mui/material/CircularProgress";

export default function Login({ logInFunction, isLoggedIn, toggleLanguage, isStructBeingCreated }) {
	const [text, setText] = useState("");
	const [t, i18n] = useTranslation("global");

	function toggleLanguage() {
		i18n.changeLanguage(i18n.language === "es" ? "en" : "es");
	}

	const { currentTheme } = useContext(ThemeContext);

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

		<Box className="mainDiv" component="div">
			{/* <div className="logoYParrafo"> */}
				<img src="/logoLoMap.png" className="logo" alt="Logo de LoMap"></img>
				<p className="descripción">
					{t("login.lomap_description")}
				</p>
			{/* </div> */}
			<div className="formName">
				<Box className="caja" component="div">
					<div className="login">
						<TextField
							className="url"
							label={t("login.provider_url")}
							value={text}
							variant="filled"
							type="text"
							onChange={(e) => setText(e.target.value)}
						/>
					</div>
					<div className="providers">
						<Button className="btnProvider1" variant="outlined" onClick={() => {logInFunction(text)}}>
							{t("login.login-button")}
						</Button>
					</div>
				</Box>
			</div>
		</Box>
		</div>)
		}
		</>
	);
}

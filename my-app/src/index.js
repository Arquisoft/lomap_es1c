import {
	getDefaultSession,
	handleIncomingRedirect,
	login,
} from "@inrupt/solid-client-authn-browser";
import i18next from "i18next";
import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import App from "./App";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import "./index.css";
import Login from "./login";
import reportWebVitals from "./reportWebVitals";

import axios from "axios";
import global_en from "./translations/en/global.json";
import global_es from "./translations/es/global.json";

const availableLanguages = ["es", "en"];
const preferredLanguage = navigator.language.toLowerCase().substring(0, 2);
const defaultAlternativeLanguage = "es";

i18next.init({
	interpolation: { escapeValue: false },
	lng: availableLanguages.includes(preferredLanguage)
		? preferredLanguage
		: defaultAlternativeLanguage,
	resources: {
		es: {
			global: global_es,
		},
		en: {
			global: global_en,
		},
	},
});

function MyComponent() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [cookie, setCookie] = useState(false);

	async function loginWeb() {
		await redirectInrupt();
		await callApi();
	}

	async function redirectInrupt() {
		await handleIncomingRedirect();
		if (!getDefaultSession().info.isLoggedIn) {
			await login({
				oidcIssuer: "https://login.inrupt.com",
				redirectUrl: window.location.href,
				clientName: "My application",
			});
		}
	}

	async function callApi() {
		console.log("Logged in!");
		const session = getDefaultSession();
		const body = {
			token: session.accessToken,
		};
		console.log(session);
		setIsLoggedIn(true);
		console.log(body);
		await axios.post("http://localhost:8080/login-from-webapp", body);
	}

	function logOut() {
		setIsLoggedIn(false);
	}

	return (
		<>
			{isLoggedIn ? (
				<I18nextProvider i18n={i18next}>
					<ThemeContextProvider children={<App logOutFunction={logOut} />} />
				</I18nextProvider>
			) : (
				<Login logInFunction={loginWeb} />
			)}
		</>
	);
}

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
	<React.StrictMode>
		<MyComponent />
	</React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();

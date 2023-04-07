import {
	getDefaultSession,
	handleIncomingRedirect,
	login,
} from "@inrupt/solid-client-authn-browser";
import i18next from "i18next";
import React, { useCallback, useEffect, useState } from "react";
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

var isLogued = false;

function MyComponent() {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [cookie, setCookie] = useState(false);

	async function login() {
		// 1. Call `handleIncomingRedirect()` to complete the authentication process.
		//    If called after the user has logged in with the Solid Identity Provider,
		//      the user's credentials are stored in-memory, and
		//      the login process is complete.
		//   Otherwise, no-op.
		await handleIncomingRedirect();

		// 2. Start the Login Process if not already logged in.
		if (!getDefaultSession().info.isLoggedIn) {
			await login({
				// Specify the URL of the user's Solid Identity Provider;
				// e.g., "https://login.inrupt.com".
				oidcIssuer: "https://login.inrupt.com",
				// Specify the URL the Solid Identity Provider should redirect the user once logged in,
				// e.g., the current page for a single-page app.
				redirectUrl: await getRedirectUrl(),
				// Provide a name for the application when sending to the Solid Identity Provider
				clientName: "My application",
			});
		}
	}

	
	async function getRedirectUrl() {
		setIsLoggedIn(true);
		const session = getDefaultSession();
		const webId = session.info.webId;
		const sessionId = session.info.sessionId;
		const body = {
			sessionId: sessionId,
			webId: webId,
		};
		await axios.post("http://localhost:8080/login-from-webapp", body);
		return window.location.href;
	}

	function logOut() {
		setIsLoggedIn(false);
	}

	function logInA(){
		// login();
		setIsLoggedIn(true);
	}
	

	return (
		<>
			{isLoggedIn ? (
				<I18nextProvider i18n={i18next}>
					<ThemeContextProvider children={<App logOutFunction={logOut} />} />
				</I18nextProvider>
			) : (
				<Login logInFunction={logInA} />
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

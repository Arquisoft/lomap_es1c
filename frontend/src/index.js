import {
	fetch,
	getDefaultSession,
	handleIncomingRedirect,
	login,
	onSessionRestore,
} from "@inrupt/solid-client-authn-browser";
import axios from "axios";
import i18next from "i18next";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import App from "./App";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import "./index.css";
import Login from "./login";
import reportWebVitals from "./reportWebVitals";
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

	useEffect(() => {
		// 2. When loading the component, call `handleIncomingRedirect` to authenticate
		//    the user if appropriate, or to restore a previous session.
		handleIncomingRedirect({
			restorePreviousSession: true,
		}).then((info) => {
			console.log(`Logged in with WebID [${info.webId}]`);
			if (getDefaultSession().info.isLoggedIn) {
				console.log("yuuujuu");
				setIsLoggedIn(true);
			}
		});
	}, []);

	async function loginWeb(providerURL) {
		// 1. Call `handleIncomingRedirect()` to complete the authentication process.
		//    If called after the user has logged in with the Solid Identity Provider,
		//      the user's credentials are stored in-memory, and
		//      the login process is complete.
		//   Otherwise, no-op.
		if (getDefaultSession().info.isLoggedIn) {
			setIsLoggedIn(true);
		}

		//"https://login.inrupt.com"
		//let solidProvider= provider? provider :"https://solidcommunity.net";
		// 2. Start the Login Process if not already logged in.
		if (!getDefaultSession().info.isLoggedIn) {
			await login({
				// Specify the URL of the user's Solid Identity Provider;
				// e.g., "https://login.inrupt.com".
				oidcIssuer: providerURL,
				// Specify the URL the Solid Identity Provider should redirect the user once logged in,
				// e.g., the current page for a single-page app.
				redirectUrl: window.location.href,
				// Provide a name for the application when sending to the Solid Identity Provider
				clientName: "My application",
			});
		}
	}

	async function logOut() {
		await getDefaultSession().logout();
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

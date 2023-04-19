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

const podController = require("./backend/controllers/PodController");

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
				podController.checkStruct(getDefaultSession());
				setIsLoggedIn(true);
			}
		});
	}, []);

	async function loginWeb(providerURL) {
		if (getDefaultSession().info.isLoggedIn) {
			setIsLoggedIn(true);
		}
		let provider = providerURL ? providerURL : "https://login.inrupt.com";
		if (!getDefaultSession().info.isLoggedIn) {
			await login({
				oidcIssuer: provider,
				redirectUrl: window.location.href,
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

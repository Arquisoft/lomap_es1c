import {
	getDefaultSession,
	handleIncomingRedirect,
	login,
} from "@inrupt/solid-client-authn-browser";
import i18next from "i18next";
import React, { useEffect, useState } from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import App from "./App";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import "./index.css";
import Login from "./login";
import reportWebVitals from "./reportWebVitals";

// Internationalization
import global_en from "./translations/en/global.json";
import global_es from "./translations/es/global.json";
const availableLanguages = ["es", "en"];
const preferredLanguage = navigator.language.toLowerCase().substring(0, 2);
const defaultAlternativeLanguage = "es";

const PodController = require("./backend/controllers/PodController");
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
		}).then(async (info) => {
			if (getDefaultSession().info.isLoggedIn) {
				await PodController.checkStruct(getDefaultSession());
				setIsLoggedIn(true);
			}
		});
	}, []);

	async function loginWeb(providerURL) {
		await handleIncomingRedirect().then(async (info) => {
			if (getDefaultSession().info.isLoggedIn) {
				await PodController.checkStruct(getDefaultSession());
				setIsLoggedIn(true);
			}
		});

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
			<I18nextProvider i18n={i18next}>
				{isLoggedIn ? (
					<ThemeContextProvider
						children={<App logOutFunction={logOut} isLoggedIn={isLoggedIn} />}
					/>
				) : (
					<ThemeContextProvider
						children={
							<Login logInFunction={loginWeb} isLoggedIn={isLoggedIn} />
						}
					/>
				)}
			</I18nextProvider>
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

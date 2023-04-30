import {
	getDefaultSession,
	handleIncomingRedirect,
	login,
} from "@inrupt/solid-client-authn-browser";
import i18next from "i18next";
import React, { useEffect, useRef, useState } from "react";
import ReactDOM from "react-dom/client";
import { I18nextProvider } from "react-i18next";
import App from "./App";
import { ThemeContextProvider } from "./contexts/ThemeContext";
import "./index.css";
import Login from "./login";
import {checkStruct} from "./backend/controllers/PodController";

// Internationalization
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
	const loggedInOnce = useRef(false);
	const [isStructBeingCreated, setIsStructBeingCreated] = useState(false);

	useEffect(() => {
		if (loggedInOnce) {
			handleIncomingRedirect({
				restorePreviousSession: true,
			}).then(async (info) => {
				if (getDefaultSession().info.isLoggedIn) {
					setIsStructBeingCreated(true)
					await checkStruct(getDefaultSession());
					setIsLoggedIn(true);
					setIsStructBeingCreated(false)
				}
			});
		}
	}, []);

	async function loginWeb(providerURL, setIsStrucBeingCreated) {
		await handleIncomingRedirect().then(async (info) => {
			if (getDefaultSession().info.isLoggedIn) {
				setIsStructBeingCreated(true)
				await checkStruct(getDefaultSession());
				setIsLoggedIn(true);
				setIsStructBeingCreated(false)
				loggedInOnce = true;
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
				<ThemeContextProvider
					children={
						isLoggedIn
							?
						(<App logOutFunction={logOut} isLoggedIn={isLoggedIn} />)
							:
						(<Login logInFunction={loginWeb} isLoggedIn={isLoggedIn} isStructBeingCreated={isStructBeingCreated} />)
					}
				/>
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

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
		isLogged();
	});

	async function isLogged() {
		try {
			const response = await axios.get("http://localhost:8080/isLoggedIn", {
				withCredentials: true,
			});
			if (response.status === 200) {
				if (isLoggedIn === false) {
					setIsLoggedIn(true);
				}
			}
		} catch (error) {
			console.log(error);
		}
	}

	function loginWeb() {
		window.location.href = "http://localhost:8080/login";
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

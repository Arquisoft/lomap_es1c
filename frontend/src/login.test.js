import React from "react";
import "./login.css";
import { fireEvent, render, screen } from "@testing-library/react";
import global_es from './translations/es/global.json';
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { ThemeContext } from './contexts/ThemeContext';
import { Themes } from "./contexts/ThemeContext";
import Login from "./login";

i18next.init({
	interpolation: { escapeValue: false },
	lng: "es",
	resources: {es: { global: global_es}},
});

const logInFunctionMok = jest.fn()
const toggleLanguage = jest.fn()

describe('BasicLogin',() => {
	it("Renders coorectly",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <Login
                        logInFunction={logInFunctionMok}
						isLoggedIn={false}
						toggleLanguage={toggleLanguage}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)
	
		const mainDiv = screen.getByTestId("mainDiv");
		const imagenLogo = screen.getByTestId("logo");
		const presentacion = screen.getByTestId("presentación");
		const urlTextField = screen.getByLabelText ("URL de su provider");
		const formName = screen.getByTestId("formName");
		const caja = screen.getByTestId("caja");
		const inicioSesion = screen.getByTestId("inicioSesion");
		const btnLogin = screen.getByTestId("btnLogin");
		const btnProvider1 = screen.getByTestId("btnProvider1");
		const btnProvider2 = screen.getByTestId("btnProvider2");
		const providers = screen.getByTestId("providers");

		expect(mainDiv).toBeInTheDocument();
		expect(imagenLogo).toBeInTheDocument();
		expect(presentacion).toBeInTheDocument();
		expect(urlTextField).toBeInTheDocument();
		expect(formName).toBeInTheDocument();
		expect(caja).toBeInTheDocument();
		expect(inicioSesion).toBeInTheDocument();
		expect(btnLogin).toBeInTheDocument();
		expect(btnProvider1).toBeInTheDocument();
		expect(btnProvider2).toBeInTheDocument();
		expect(providers).toBeInTheDocument();

		fireEvent.click(btnProvider1);

		const lastNameInput = screen.getByDisplayValue('https://login.inrupt.com/')

		expect(lastNameInput).toBeInTheDocument();

		expect(logInFunctionMok).toHaveBeenCalledTimes(0);
        expect(toggleLanguage).toHaveBeenCalledTimes(0);

		fireEvent.click(btnLogin);

		expect(logInFunctionMok).toHaveBeenCalledTimes(1);
        expect(toggleLanguage).toHaveBeenCalledTimes(0);

		lastNameInput.value = "Test";

		const lastNameInputChange = screen.getByDisplayValue('Test')

		expect(lastNameInputChange).toBeInTheDocument();

	})

})

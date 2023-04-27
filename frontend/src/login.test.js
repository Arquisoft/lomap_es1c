import { Button, TextField } from "@mui/material";
import { Box } from "@mui/system";
import React, { useState } from "react";
import "./login.css";
import SettingsSpeedDial from "./buttons/SettingsSpeedDial";
import { render, screen } from "@testing-library/react";
import userEvent from '@testing-library/user-event';
import global_es from './translations/es/global.json';
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { ThemeContext } from './contexts/ThemeContext';
import { Themes } from "./contexts/ThemeContext";
import Login from "./login"

i18next.init({
	interpolation: { escapeValue: false },
	lng: "es",
	resources: {es: { global: global_es}},
});

const logInFunctionMok = jest.fn()
const toggleLanguage = jest.fn()
const handleInrupt = jest.fn()
const handleSolid = jest.fn()

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
	})

	//const mainDiv = screen.getByTestId("mainDiv");
	const imagenLogo = screen.getByAltText("Logo de LoMap");
	const presentacion = screen.getByTestId("presentación");
	const urlTextField = screen.getByPlaceholderText("URL de su provider");
	const formName = screen.getByTestId("formName");
	const caja = screen.getByTestId("caja");
	const inicioSesion = screen.getByTestId("inicioSesion");
	const primero = screen.getByTestId("primero");
	const segundo = screen.getByTestId("segundo");

	// expect(mainDiv).toBeInTheDocument();
	// expect(imagenLogo).toBeInTheDocument();
	// expect(presentacion).toBeInTheDocument();
	// expect(urlTextField).toBeInTheDocument();
	// expect(formName).toBeInTheDocument();
	// expect(caja).toBeInTheDocument();
	// expect(inicioSesion).toBeInTheDocument();
	// expect(primero).toBeInTheDocument();
	// expect(segundo).toBeInTheDocument();

	// act(() => userEvent.click(primero))
})

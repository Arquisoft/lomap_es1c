import * as React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import global_es from '../translations/es/global.json';
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { ThemeContext } from '../contexts/ThemeContext';
import { Themes } from "../contexts/ThemeContext";
import OpenIconSpeedDial from "./bottonMarkers"

i18next.init({
	interpolation: { escapeValue: false },
	lng: "es",
	resources: {es: { global: global_es}},
});

const changeDrawerContentMock = jest.fn();
const canClickMock = jest.fn();
const openInfoMock = jest.fn();

describe('BasicFuntionality',() => {
	it("Renders coorectly",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <OpenIconSpeedDial 
                      canClick={canClickMock}
                      openInfo={openInfoMock}
                      changeDrawerContent={changeDrawerContentMock}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)

    const mainButton = screen.getByTestId("mainButton");
    const newPoint = screen.getByTestId("newPoint");
    const newRoute = screen.getByTestId("newRoute");

    expect(mainButton).toBeInTheDocument();
		expect(newPoint).toBeInTheDocument();
		expect(newRoute).toBeInTheDocument();
    expect(newPoint).not.toBeVisible();
    expect(newRoute).not.toBeVisible();

    fireEvent.click(mainButton);

    expect(mainButton).toBeInTheDocument();
		expect(newPoint).toBeInTheDocument();
		expect(newRoute).toBeInTheDocument();
    expect(newPoint).toBeVisible();
    expect(newRoute).toBeVisible();

    fireEvent.click(newPoint);

    expect(mainButton).toBeInTheDocument();
		expect(newPoint).toBeInTheDocument();
		expect(newRoute).toBeInTheDocument();
    expect(newPoint).toBeVisible();
    expect(newRoute).toBeVisible();

    fireEvent.click(newRoute);

  })

})
	
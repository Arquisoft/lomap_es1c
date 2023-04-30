import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import global_es from '../../translations/es/global.json';
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { ThemeContext } from '../../contexts/ThemeContext';
import { Themes } from "../../contexts/ThemeContext";
import LugarCard from "./PlaceCard";

i18next.init({
	interpolation: { escapeValue: false },
	lng: "es",
	resources: {es: { global: global_es}},
});

const placeMok = {
    id : "1",
    author: "PruebaAuthor",
	name: "Pruebaasdasdasdasdasdasdasdasdasdasdasd",
	latitude: 0,
	longitude: 0,
	category: "Prueba",
	review: 2,
	comment: "Prueba Comentario",
	photo:"",
	privacy: "",
}
const categoriasMok = ["Restaurante","Parque"]
const API_location_callsMok = {
	API_getPlaceById: jest.fn(),
};
const changeDrawerContentMok =  jest.fn();
const setPositionMok =  jest.fn();
const setDisableComponentsMok =  jest.fn();

describe('BasicLogin',() => {
	it("Renders coorectly",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <LugarCard
						key={placeMok.id}
						place = {placeMok}
						changeDrawerContent={changeDrawerContentMok}
						categorias = {categoriasMok}
						setPosition={setPositionMok}
						API_location_calls = {API_location_callsMok}
						returnTo = {null}
						loggedInUserwebId = {"PruebaAuthor"}
						disableComponents = {null}
						setDisableComponents = {null}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)

		const place = screen.getByTestId('place')
        expect(place).toBeInTheDocument();
        fireEvent.click(place);
	});

	it("DisableComponents not null",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <LugarCard
						key={placeMok.id}
						place = {placeMok}
						changeDrawerContent={changeDrawerContentMok}
						categorias = {categoriasMok}
						setPosition={setPositionMok}
						API_location_calls = {API_location_callsMok}
						returnTo = {null}
						loggedInUserwebId = {"PruebaAuthor"}
						disableComponents = {null}
						setDisableComponents = {setDisableComponentsMok}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)

		const place = screen.getByTestId('place')
        expect(place).toBeInTheDocument();
        fireEvent.click(place);
	});

})
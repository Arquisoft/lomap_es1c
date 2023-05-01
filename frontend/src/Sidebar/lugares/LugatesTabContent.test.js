import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import global_es from '../../translations/es/global.json';
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { ThemeContext } from '../../contexts/ThemeContext';
import { Themes } from "../../contexts/ThemeContext";
import InicioTabContent from "./LugaresTabContent";

i18next.init({
	interpolation: { escapeValue: false },
	lng: "es",
	resources: {es: { global: global_es}},
});

const placeMock = [{
    id : "1",
    author: "PruebaAuthor",
	name: "Prueba",
	latitude: 0,
	longitude: 0,
	category: "Prueba",
	review: 2,
	comment: "Prueba Comentario",
	photo:"",
	privacy: "",
}]

const categoriasMock = ["Restaurante","Parque"]
const API_location_callsMock = {
	API_createLocation: jest.fn(),
	API_updateLocation: jest.fn(),
};
const changeDrawerContentMock =  jest.fn();
const setPositionMock =  jest.fn();

describe('BasicLogin',() => {
	it("Renders coorectly",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <InicioTabContent
						userPlaces = {placeMock}
                        changeDrawerContent = {changeDrawerContentMock}
                        setPosition={setPositionMock}
                        categorias = {categoriasMock}
                        API_location_calls = {API_location_callsMock}
                        loggedInUserwebId = {"PruebaAuthor"}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)

        const arrow = screen.getByTestId('arrow')
        expect(arrow).toBeInTheDocument();
        fireEvent.click(arrow);
        
        const nameInput = screen.getByPlaceholderText('Buscar')
        expect(nameInput).toBeInTheDocument();
    
        fireEvent.change(nameInput,{target: { value: "Changed Value" }});
        const nameInputChange = screen.getByDisplayValue('Changed Value')
        expect(nameInputChange).toBeInTheDocument();

	});

})
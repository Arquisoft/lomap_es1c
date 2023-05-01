import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import global_es from '../../translations/es/global.json';
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { ThemeContext } from '../../contexts/ThemeContext';
import { Themes } from "../../contexts/ThemeContext";
import FullInfoPlace from "./EditInfoPlace";
import { act } from "react-dom/test-utils";
import userEvent from "@testing-library/user-event";

i18next.init({
	interpolation: { escapeValue: false },
	lng: "es",
	resources: {es: { global: global_es}},
});

const placeMock = {
    id : "1",
    author: "PruebaAuthor",
	name: "Prueba",
	latitude: 0,
	longitude: 0,
	category: "CategoriaPrueba",
	review: 2,
	comment: "Prueba Comentario",
	photo:"",
	privacy: "",
}
const categoriasMock = ["Restaurante","CategoriaPrueba"]
const API_location_callsMock = {
	API_createLocation: jest.fn(),
	API_updateLocation: jest.fn(),
};
const changeDrawerContentMock =  jest.fn();

describe('BasicLogin',() => {
	it("Renders coorectly when updating",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <FullInfoPlace
						place={placeMock}
                        categorias={categoriasMock}
                        API_location_calls={API_location_callsMock}
                        returnTo={null}
                        changeDrawerContent={changeDrawerContentMock}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)

        
        const nameInput = screen.getByDisplayValue('Prueba')
        expect(nameInput).toBeInTheDocument();
    
        fireEvent.change(nameInput,{target: { value: "Changed Value" }});
        const nameInputChange = screen.getByDisplayValue('Changed Value')
        expect(nameInputChange).toBeInTheDocument();

        act(() => userEvent.click(screen.getByTestId("select-category")))

        const saveBtn = screen.getByTestId('saveBtn')
        expect(saveBtn).toBeInTheDocument();
        fireEvent.click(saveBtn);

        const arrow = screen.getByTestId('arrow')
        expect(arrow).toBeInTheDocument();
        fireEvent.click(arrow);
	});

})
import * as React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import global_es from '../translations/es/global.json';
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { ThemeContext } from '../contexts/ThemeContext';
import { Themes } from "../contexts/ThemeContext";
import CreateModal from "./PlacesForm"
import Modal from "react-modal";

i18next.init({
	interpolation: { escapeValue: false },
	lng: "es",
	resources: {es: { global: global_es}},
});


const updateLocationsMok = jest.fn();
const setIsOpenMok = jest.fn();
const setMarkersMok = jest.fn();
const setStateButtonMok = jest.fn();
const setCanCickMok = jest.fn();
const categoriasMok = ["Restaurante","Parque"]

describe('BasicFuntionality',() => {
	it("Renders coorectly",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <CreateModal 
							isOpen={true}
							latMark={0}
							lngMark={0}
							updateLocations={updateLocationsMok}
							setIsOpen={setIsOpenMok}
							setMarkers={setMarkersMok}
							setStateButton={setStateButtonMok}
							setCanCick={setCanCickMok}
							API_location_calls
                      		categorias={categoriasMok}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)

		Modal.setAppElement('body');

		const nameTextField = screen.getByLabelText("Nombre");
		const rating = screen.getByPlaceholderText("rating");
		const category = screen.getByPlaceholderText("category");
		const photo = screen.getByTestId("photo");
		const commentTextField = screen.getByPlaceholderText("Puede añadir un comentario");
		const botones = screen.getByTestId("botones");
		const save = screen.getByTestId("save");
		const cancel = screen.getByTestId("cancel"); 

		expect(nameTextField).toBeInTheDocument();
		expect(rating).toBeInTheDocument();
		expect(category).toBeInTheDocument();
		expect(photo).toBeInTheDocument();
		expect(commentTextField).toBeInTheDocument();
		expect(botones).toBeInTheDocument();
		expect(save).toBeInTheDocument();
		expect(cancel).toBeInTheDocument();

  })

})
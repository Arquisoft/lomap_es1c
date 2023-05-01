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

var isOpenMock = jest.fn();
const updateLocationsMock = jest.fn();
const setIsOpenMock = jest.fn();
const setMarkersMock = jest.fn();
const setStateButtonMock = jest.fn();
const setCanCickMock = jest.fn();

const categoriasMock = ["Restaurante","Parque"]
const f = new File(["hello"], "hello.png", { type: "image/png" });
const data = {
	id : "1",
	name: "Prueba",
	latitude: 0,
	longitude: 0,
	category: "Restaurante",
	review: 2,
	comment: "Prueba Comentario",
	photo: f,
	privacy: "",
};

const API_location_calls = {
	API_createLocation: jest.fn(),
	API_addReview: jest.fn(),
	API_addPhoto: jest.fn()
};

describe('BasicFuntionality', () => {
	it("Renders coorectly",async () => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <CreateModal 
							isOpen={isOpenMock}
							latMark={0}
							lngMark={0}
							updateLocations={updateLocationsMock}
							setIsOpen={setIsOpenMock}
							setMarkers={setMarkersMock}
							setStateButton={setStateButtonMock}
							setCanCick={setCanCickMock}
							API_location_calls={API_location_calls}
                      		categorias={categoriasMock}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)

		API_location_calls.API_createLocation = jest.fn().mockReturnValueOnce(data)

		Modal.setAppElement('body');

		const nameTextField = screen.getByPlaceholderText("Nombre");
		const rating = screen.getByPlaceholderText("rating");
		const rating2 = screen.getByDisplayValue("2.5");
		const category = screen.getByPlaceholderText("category");
		const photo = screen.getByTestId("photo");
		const commentTextField = screen.getByPlaceholderText("Puede añadir un comentario");
		const botones = screen.getByTestId("botones");
		const save = screen.getByTestId("save");
		const cancel = screen.getByTestId("cancel"); 

		expect(nameTextField).toBeInTheDocument();
		expect(rating).toBeInTheDocument();
		expect(rating2).toBeInTheDocument();
		expect(category).toBeInTheDocument();
		expect(photo).toBeInTheDocument();
		expect(commentTextField).toBeInTheDocument();
		expect(botones).toBeInTheDocument();
		expect(save).toBeInTheDocument();
		expect(cancel).toBeInTheDocument();

		fireEvent.change(nameTextField,{target: { value: "Test" }});
		const changeNameTextField = screen.getByDisplayValue('Test')
		expect(changeNameTextField).toBeInTheDocument();

		fireEvent.click(rating2);

		fireEvent.click(category);
		fireEvent.change(category,{target: { value: "Changed Value" }});

		const testImageFile = new File(["hello"], "hello.png", { type: "image/png" });
		fireEvent.click(photo);
		await fireEvent.change(photo, {
            target: { files: [testImageFile] },
          });

		fireEvent.click(commentTextField);
		fireEvent.change(commentTextField,{target: { value: "Test comment" }});

		const changCommentTextField = screen.getByDisplayValue('Test')
		expect(changCommentTextField).toBeInTheDocument();
		fireEvent.click(save);
	})

	it("Closes coorectly",async () => {
		render(
			<I18nextProvider i18n={i18next}>
				<ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
					<CreateModal 
							isOpen={true}
							latMark={0}
							lngMark={0}
							updateLocations={updateLocationsMock}
							setIsOpen={setIsOpenMock}
							setMarkers={setMarkersMock}
							setStateButton={setStateButtonMock}
							setCanCick={setCanCickMock}
							API_location_calls={API_location_calls}
								categorias={categoriasMock}
					/>
				</ThemeContext.Provider>
			</I18nextProvider>
		)

		API_location_calls.API_createLocation = jest.fn().mockReturnValueOnce(data)

		Modal.setAppElement('body');

		const nameTextField = screen.getByPlaceholderText("Nombre");
		const rating = screen.getByPlaceholderText("rating");
		const category = screen.getByTestId("categorySelect");
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

		fireEvent.click(cancel);
	})

	it("No name check",async () => {
		render(
			<I18nextProvider i18n={i18next}>
				<ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
					<CreateModal 
							isOpen={true}
							latMark={0}
							lngMark={0}
							updateLocations={updateLocationsMock}
							setIsOpen={setIsOpenMock}
							setMarkers={setMarkersMock}
							setStateButton={setStateButtonMock}
							setCanCick={setCanCickMock}
							API_location_calls={API_location_calls}
							  categorias={categoriasMock}
					/>
				</ThemeContext.Provider>
			</I18nextProvider>
		)

		API_location_calls.API_createLocation = jest.fn().mockReturnValueOnce(data)

		Modal.setAppElement('body');

		const nameTextField = screen.getByPlaceholderText("Nombre");
		const rating = screen.getByPlaceholderText("rating");
		const category = screen.getByTestId("categorySelect");
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

		fireEvent.click(save);
  })
})
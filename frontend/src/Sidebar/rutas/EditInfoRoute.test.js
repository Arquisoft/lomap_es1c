import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import global_es from '../../translations/es/global.json';
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { ThemeContext } from '../../contexts/ThemeContext';
import { Themes } from "../../contexts/ThemeContext";
import EditRouteInfo from "./EditInfoRoute";

i18next.init({
	interpolation: { escapeValue: false },
	lng: "es",
	resources: {es: { global: global_es}},
});

const placeRouteMock = [{
    id : "2",
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

const routeMock = {
    id : "1",
    name: "Prueba",
    description: "Descripcion Prueba",
    locations: placeRouteMock
}

const API_routes_callsMock = {
	API_addRoute: jest.fn(),
	API_updateRouteInfo: jest.fn(),
    API_addLocationToRoute: jest.fn(),
	API_deleteLocationFromRoute: jest.fn(),
};
const changeDrawerContentMock =  jest.fn();

describe('BasicLogin',() => {
	it("Renders coorectly",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <EditRouteInfo
						route={routeMock}
                        changeDrawerContent={changeDrawerContentMock}
                        returnTo={null}
                        userPlaces={placeMock}
                        API_route_calls={API_routes_callsMock}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)

        const arrow = screen.getByTestId('arrow')
        expect(arrow).toBeInTheDocument();
        fireEvent.click(arrow);

        const descriptionInput = screen.getByPlaceholderText('Descripción de la ruta')
        expect(descriptionInput).toBeInTheDocument();
    
        fireEvent.change(descriptionInput,{target: { value: "Changed Value" }});
        const descriptionInputChange = screen.getByDisplayValue('Changed Value')
        expect(descriptionInputChange).toBeInTheDocument();   

        const nameInput = screen.getByPlaceholderText('Nombre de la ruta')
        expect(nameInput).toBeInTheDocument();
    
        fireEvent.change(nameInput,{target: { value: "Changed Value2" }});
        const nameInputChange = screen.getByDisplayValue('Changed Value2')
        expect(nameInputChange).toBeInTheDocument(); 

        const DeleteIcon = screen.getByTestId('DeleteIcon')
        expect(DeleteIcon).toBeInTheDocument();
        fireEvent.click(DeleteIcon);

        const saveBtn = screen.getByTestId('save-button')
        expect(saveBtn).toBeInTheDocument();
        fireEvent.click(saveBtn);

	});

    it("Null route",() => {
        render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <EditRouteInfo
						route={null}
                        changeDrawerContent={changeDrawerContentMock}
                        returnTo={null}
                        userPlaces={placeMock}
                        API_route_calls={API_routes_callsMock}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)

        API_routes_callsMock.API_addRoute = jest.fn().mockReturnValueOnce(routeMock);

        const descriptionInput = screen.getByPlaceholderText('Descripción de la ruta')
        expect(descriptionInput).toBeInTheDocument();
    
        fireEvent.change(descriptionInput,{target: { value: "Changed Value" }});
        const descriptionInputChange = screen.getByDisplayValue('Changed Value')
        expect(descriptionInputChange).toBeInTheDocument();   

        const nameInput = screen.getByPlaceholderText('Nombre de la ruta')
        expect(nameInput).toBeInTheDocument();
    
        fireEvent.change(nameInput,{target: { value: "Changed Value2" }});
        const nameInputChange = screen.getByDisplayValue('Changed Value2')
        expect(nameInputChange).toBeInTheDocument(); 

        const addbutton = screen.getByTestId('add-button')
        expect(addbutton).toBeInTheDocument();
        fireEvent.click(addbutton);

        const mnitem = screen.getByTestId('1_mnitem')
        expect(mnitem).toBeInTheDocument();
        fireEvent.click(mnitem);

        const DeleteIcon = screen.getByTestId('DeleteIcon')
        expect(DeleteIcon).toBeInTheDocument();
        fireEvent.click(DeleteIcon);

        const saveBtn = screen.getByTestId('save-button')
        expect(saveBtn).toBeInTheDocument();
        fireEvent.click(saveBtn);

	});

})
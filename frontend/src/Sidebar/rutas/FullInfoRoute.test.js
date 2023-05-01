import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import global_es from '../../translations/es/global.json';
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { ThemeContext } from '../../contexts/ThemeContext';
import { Themes } from "../../contexts/ThemeContext";
import FullRouteInfo from "./FullInfoRoute";

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
	category: "Prueba",
	review: 2,
	comment: "Prueba Comentario",
	photo:"",
	privacy: "",
}

const routeMock = {
    id : "1",
    name: "Prueba",
    description: "Descripcion Prueba",
    locations: [placeMock]
}
const categoriasMock = ["Restaurante","Parque"]
const API_location_callsMock = {
	API_createLocation: jest.fn(),
	API_updateLocation: jest.fn(),
};

const API_routes_callsMock = {
	API_deleteRoute: jest.fn(),
};
const changeDrawerContentMock =  jest.fn();
const setPositionMock =  jest.fn();

describe('BasicLogin',() => {
	it("Renders coorectly",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <FullRouteInfo
						key={routeMock.id}
                        route={routeMock}
                        changeDrawerContent={changeDrawerContentMock}
                        userPlaces={[placeMock]}
                        API_route_calls={API_routes_callsMock}
                        API_location_calls={API_location_callsMock}
                        setPosition = {setPositionMock}
                        categorias = {categoriasMock}
                        loggedInUserwebId = {"PruebaAuthor"}
                        returnTo = {null}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)

        const arrow = screen.getByTestId('arrow')
        expect(arrow).toBeInTheDocument();
        fireEvent.click(arrow);

        const editButton = screen.getByTestId('edit-button')
        expect(editButton).toBeInTheDocument();
        fireEvent.click(editButton);

        const deleteButton = screen.getByTestId('delete-button')
        expect(deleteButton).toBeInTheDocument();
        fireEvent.click(deleteButton);
        
	});

    it("Return not null coorectly",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <FullRouteInfo
						key={routeMock.id}
                        route={routeMock}
                        changeDrawerContent={changeDrawerContentMock}
                        userPlaces={[placeMock]}
                        API_route_calls={API_routes_callsMock}
                        API_location_calls={API_location_callsMock}
                        setPosition = {setPositionMock}
                        categorias = {categoriasMock}
                        loggedInUserwebId = {"PruebaAuthor"}
                        returnTo = {<FullRouteInfo />}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)

        const arrow = screen.getByTestId('arrow')
        expect(arrow).toBeInTheDocument();
        fireEvent.click(arrow);
        
	});

})
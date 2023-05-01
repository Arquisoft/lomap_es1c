import * as React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import global_es from '../translations/es/global.json';
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { ThemeContext } from '../contexts/ThemeContext';
import { Themes } from "../contexts/ThemeContext";
import CreateMap from "./Map";

i18next.init({
	interpolation: { escapeValue: false },
	lng: "es",
	resources: {es: { global: global_es}},
});

const openMock = jest.fn();
const setLatitudeMock = jest.fn();
const setLongitudeMock = jest.fn();
const setMarkersMock = jest.fn();
const canCickMock = jest.fn();
const changeDrawerContentMock = jest.fn();
const restoreDefautlDrawerContentMock = jest.fn();
const setPositionMock = jest.fn();
const getwebIdMock = jest.fn().mockReturnValue("PruebaAuthor");
const API_route_callsMock = jest.fn();
const API_location_callsMock = {
    API_getPlaceById:jest.fn()
};

jest.mock("@react-google-maps/api", () => ({
    useLoadScript: () => ({
      isLoaded: true,
      loadError: null
    }),
    GoogleMap: () => <div></div>
}));

const placeMineMock = {
	id : "1",
    author: "PruebaAuthor",
	name: "Prueba",
	latitude: 0,
	longitude: 0,
	category: "Restaurante",
	review: 2,
	comment: "Prueba Comentario",
	photo:"",
	privacy: "",
};

const places = [placeMineMock]

const placeFrienMock = {
	id : "1",
    author: "PruebaAmigo",
	name: "Prueba",
	latitude: 0,
	longitude: 0,
	category: "Restaurante",
	review: 2,
	comment: "Prueba Comentario",
	photo:"",
	privacy: "",
};
const friendPlaces = [placeFrienMock]

const categoriasMock = ["Restaurante","Parque"]



describe('BasicFuntionality', () => {
	it("Renders coorectly",async () => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <CreateMap 
							open={openMock}
                            setLatitude={setLatitudeMock}
                            setLongitude={setLongitudeMock}
                            markers = {[]}
                            setMarkers={setMarkersMock}
                            places= {places}
                            canCick = {true}
                            setCanCick={canCickMock}
                            changeDrawerContent={changeDrawerContentMock}
                            restoreDefautlDrawerContent={restoreDefautlDrawerContentMock}
                            position = {0}
                            setPosition={setPositionMock}
                            categorias ={categoriasMock}
                            API_route_calls={API_route_callsMock}
                            API_location_calls={API_location_callsMock}
                            getwebId={getwebIdMock}
                            friendPlaces = {friendPlaces}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)

        API_location_callsMock.API_getPlaceById = jest.fn().mockReturnValueOnce(placeMineMock);
        getwebIdMock.mockReturnValue("PruebaAuthor");

        const resetFilters = screen.getByTestId("resetFilters");
        const handleClickOnlyMine = screen.getByTestId("handleClickOnlyMine");
        const handleClickFriends = screen.getByTestId("handleClickFriends");
        const categoryDisplay = screen.getByTestId("categoryDisplay");

        expect(resetFilters).toBeInTheDocument();
        expect(handleClickOnlyMine).toBeInTheDocument();
        expect(handleClickFriends).toBeInTheDocument();
        expect(categoryDisplay).toBeInTheDocument();
        
        fireEvent.click(handleClickOnlyMine);

        fireEvent.click(handleClickFriends);

        fireEvent.click(categoryDisplay);

        const firstCategory = screen.getByTestId("category0");
        expect(firstCategory).toBeInTheDocument();

        fireEvent.click(firstCategory);

        fireEvent.click(resetFilters);
        
        const mainButton = screen.getByTestId("mainButton");
        const newPoint = screen.getByTestId("newPoint");
        const newRoute = screen.getByTestId("newRoute");

        expect(mainButton).toBeInTheDocument();
        expect(newPoint).toBeInTheDocument();
        expect(newRoute).toBeInTheDocument();

        fireEvent.click(mainButton);

        expect(mainButton).toBeInTheDocument();
        expect(newPoint).toBeInTheDocument();
        expect(newRoute).toBeInTheDocument();
        expect(newPoint).toBeVisible();
        expect(newRoute).toBeVisible();

    })

    it("Other checks coorectly",async () => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <CreateMap 
							open={openMock}
                            setLatitude={setLatitudeMock}
                            setLongitude={setLongitudeMock}
                            markers = {[]}
                            setMarkers={setMarkersMock}
                            places= {places}
                            canCick = {true}
                            setCanCick={canCickMock}
                            changeDrawerContent={changeDrawerContentMock}
                            restoreDefautlDrawerContent={restoreDefautlDrawerContentMock}
                            position = {0}
                            setPosition={setPositionMock}
                            categorias ={categoriasMock}
                            API_route_calls={API_route_callsMock}
                            API_location_calls={API_location_callsMock}
                            getwebId={getwebIdMock}
                            friendPlaces = {friendPlaces}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)

        API_location_callsMock.API_getPlaceById = jest.fn().mockReturnValueOnce(placeMineMock);
        getwebIdMock.mockReturnValue("PruebaAuthor");
        
        const mainButton = screen.getByTestId("mainButton");
        const newPoint = screen.getByTestId("newPoint");
        const newRoute = screen.getByTestId("newRoute");

        expect(mainButton).toBeInTheDocument();
        expect(newPoint).toBeInTheDocument();
        expect(newRoute).toBeInTheDocument();

        fireEvent.click(mainButton);

        expect(mainButton).toBeInTheDocument();
        expect(newPoint).toBeInTheDocument();
        expect(newRoute).toBeInTheDocument();
        expect(newPoint).toBeVisible();
        expect(newRoute).toBeVisible();

        fireEvent.click(newPoint);

    })
})
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import global_es from '../translations/es/global.json';
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { ThemeContext } from '../contexts/ThemeContext';
import { Themes } from "../contexts/ThemeContext";
import DrawerDefaultContent from "./DrawerDefaultContent";

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
    locations: placeMock
}

const friendMock={
    webId:"friend",
    name:"FriendName"
}

const solictudMock={
    id:"1",
    sender:"FriendName"
}

const categoriasMock = ["Restaurante","Parque"]

const API_location_callsMock = {
	API_createLocation: jest.fn(),
	API_updateLocation: jest.fn(),
};
const API_friend_callsMock = {
	API_createLocation: jest.fn(),
	API_updateLocation: jest.fn(),
};
const API_route_callsMock = {
	API_createLocation: jest.fn(),
	API_updateLocation: jest.fn(),
};

const setIsDrawerOpenMock =  jest.fn();
const restoreDefautlDrawerContentMock =  jest.fn();
const changeDrawerContentMock =  jest.fn();
const setPositionMock =  jest.fn();
const setFriendPlacesMock =  jest.fn();
const getwebIdMock =  jest.fn();

describe('BasicLogin',() => {
	it("Renders coorectly",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <DrawerDefaultContent
						userPlaces={[placeMock]}
                        restoreDefautlDrawerContent={restoreDefautlDrawerContentMock}
                        changeDrawerContent={changeDrawerContentMock}
                        categorias={categoriasMock}
                        rutas={[routeMock]}
                        API_route_calls={API_route_callsMock}
                        API_location_calls={API_location_callsMock}
                        setPosition={setPositionMock}
                        amigos={[friendMock]}
                        API_friend_calls={API_friend_callsMock}
                        solicitudes={[solictudMock]}
                        setFriendsPlaces={setFriendPlacesMock}
                        friendsPlaces={[placeMock]}
                        getwebId={getwebIdMock}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)

        const places = screen.getByTestId('places')
        expect(places).toBeInTheDocument();
        fireEvent.click(places);

        const social = screen.getByTestId('social')
        expect(social).toBeInTheDocument();
        fireEvent.click(social);

        const rutas = screen.getByTestId('rutas')
        expect(rutas).toBeInTheDocument();
        fireEvent.click(rutas);

	});

})
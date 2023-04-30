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

const placeMok = {
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
const routeMok = {
    id : "1",
    name: "Prueba",
    description: "Descripcion Prueba",
    locations: placeMok
}

const friendMok={
    webId:"friend",
    name:"FriendName"
}

const solictudMok={
    id:"1",
    sender:"FriendName"
}

const categoriasMok = ["Restaurante","Parque"]

const API_location_callsMok = {
	API_createLocation: jest.fn(),
	API_updateLocation: jest.fn(),
};
const API_friend_callsMok = {
	API_createLocation: jest.fn(),
	API_updateLocation: jest.fn(),
};
const API_route_callsMok = {
	API_createLocation: jest.fn(),
	API_updateLocation: jest.fn(),
};

const setIsDrawerOpenMok =  jest.fn();
const restoreDefautlDrawerContentMok =  jest.fn();
const changeDrawerContentMok =  jest.fn();
const setPositionMok =  jest.fn();
const setFriendPlacesMok =  jest.fn();
const getwebIdMok =  jest.fn();

describe('BasicLogin',() => {
	it("Renders coorectly",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <DrawerDefaultContent
						userPlaces={[placeMok]}
                        restoreDefautlDrawerContent={restoreDefautlDrawerContentMok}
                        changeDrawerContent={changeDrawerContentMok}
                        categorias={categoriasMok}
                        rutas={[routeMok]}
                        API_route_calls={API_route_callsMok}
                        API_location_calls={API_location_callsMok}
                        setPosition={setPositionMok}
                        amigos={[friendMok]}
                        API_friend_calls={API_friend_callsMok}
                        solicitudes={[solictudMok]}
                        setFriendsPlaces={setFriendPlacesMok}
                        friendsPlaces={[placeMok]}
                        getwebId={getwebIdMok}
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
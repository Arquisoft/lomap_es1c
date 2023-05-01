import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import global_es from '../translations/es/global.json';
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { ThemeContext } from '../contexts/ThemeContext';
import { Themes } from "../contexts/ThemeContext";
import DrawerSidebar from "./Drawer";
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
	it("Renders coorectly by default",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <DrawerSidebar
						userPlaces={[placeMock]}
                        isDrawerOpen={true}
                        setIsDrawerOpen={setIsDrawerOpenMock}
                        contentToDisplay={null}
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

        const change = screen.getByTestId('change')
        expect(change).toBeInTheDocument();
        fireEvent.click(change);

        act(() => userEvent.keyboard('{esc}'));
	});

    it("Renders coorectly with custom content",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <DrawerSidebar
						userPlaces={[placeMock]}
                        isDrawerOpen={true}
                        setIsDrawerOpen={setIsDrawerOpenMock}
                        contentToDisplay={<div></div>}
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
        const change = screen.getByTestId('change')
        expect(change).toBeInTheDocument();
        fireEvent.click(change);

        act(() => userEvent.keyboard('{esc}'));
	});

})
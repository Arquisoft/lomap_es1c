import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import global_es from '../../translations/es/global.json';
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { ThemeContext } from '../../contexts/ThemeContext';
import { Themes } from "../../contexts/ThemeContext";
import FullFriendInfo from "./FullFriendInfo";

i18next.init({
	interpolation: { escapeValue: false },
	lng: "es",
	resources: {es: { global: global_es}},
});

const placeMock = {
    id : "1",
    author: "friend",
	name: "Prueba",
	latitude: 0,
	longitude: 0,
	category: "Prueba",
	review: 2,
	comment: "Prueba Comentario",
	photo:"",
	privacy: "",
}

const friendMock={
    webId:"friend",
    name:"FriendName"
}

const API_location_callsMock = {
	API_createLocation: jest.fn(),
	API_updateLocation: jest.fn(),
};
const API_friend_callsMock = {
	API_removeFriend: jest.fn(),
};

const changeDrawerContentMock =  jest.fn();
const setPositionMock =  jest.fn();

describe('BasicLogin',() => {
	it("Renders coorectly",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <FullFriendInfo
						amigo={friendMock}
                        places={[placeMock]}
                        setPosition={setPositionMock}
                        changeDrawerContent={changeDrawerContentMock}
                        returnTo={null}
                        API_friend_calls={API_friend_callsMock}
                        API_location_calls={API_location_callsMock}
                        loggedInUserwebId = {"Main"}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)
        const arrow = screen.getByTestId('arrow')
        expect(arrow).toBeInTheDocument();
        fireEvent.click(arrow);
        
        const deleteFriend = screen.getByTestId('deleteFriend')
        expect(deleteFriend).toBeInTheDocument();
        fireEvent.click(deleteFriend);

	});

})
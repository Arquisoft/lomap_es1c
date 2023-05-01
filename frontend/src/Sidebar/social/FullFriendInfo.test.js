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

const placeMok = {
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

const friendMok={
    webId:"friend",
    name:"FriendName"
}

const API_location_callsMok = {
	API_createLocation: jest.fn(),
	API_updateLocation: jest.fn(),
};
const API_friend_callsMok = {
	API_removeFriend: jest.fn(),
};

const changeDrawerContentMok =  jest.fn();
const setPositionMok =  jest.fn();

describe('BasicLogin',() => {
	it("Renders coorectly",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <FullFriendInfo
						amigo={friendMok}
                        places={[placeMok]}
                        setPosition={setPositionMok}
                        changeDrawerContent={changeDrawerContentMok}
                        returnTo={null}
                        API_friend_calls={API_friend_callsMok}
                        API_location_calls={API_location_callsMok}
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
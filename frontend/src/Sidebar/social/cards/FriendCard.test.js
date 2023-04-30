import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import global_es from '../../../translations/es/global.json';
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Themes } from "../../../contexts/ThemeContext";
import FriendCard from "./FriendCard";

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

const friendMok={
    webId:"friend",
    name:"FriendName"
}

const API_location_callsMok = {
	API_createLocation: jest.fn(),
	API_updateLocation: jest.fn(),
};
const API_friend_callsMok = {
	getPlacesOfFriend: jest.fn(),
};

const changeDrawerContentMok =  jest.fn();
const setPositionMok =  jest.fn();
const setFriendsPlacesMok =  jest.fn();

describe('BasicLogin',() => {
	it("Renders coorectly",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <FriendCard
						key={"friend_card_" + friendMok.webId}
                        API_friend_calls={API_friend_callsMok}
                        friend={friendMok}
                        changeDrawerContent={changeDrawerContentMok}
                        returnTo={null}
                        API_location_calls={API_location_callsMok}
                        setPosition={setPositionMok}
                        setFriendsPlaces={setFriendsPlacesMok}
                        friendsPlaces={[placeMok]}
                        loggedInUserwebId = {"Main"}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)

        const visibility = screen.getByTestId('visibility')
        expect(visibility).toBeInTheDocument();
        fireEvent.click(visibility);

        const card = screen.getByTestId('card')
        expect(card).toBeInTheDocument();
        fireEvent.click(card);
    });

})
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import global_es from '../../../translations/es/global.json';
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Themes } from "../../../contexts/ThemeContext";
import FriendCard from "./FriendCard";
import { act } from "react-dom/test-utils";

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

const friendMock={
    webId:"friend",
    name:"FriendName"
}

const API_location_callsMock = {
	API_createLocation: jest.fn(),
	API_updateLocation: jest.fn(),
};
const API_friend_callsMock = {
	getPlacesOfFriend: jest.fn(),
};
const addFriendMarkersToMapMock = jest.fn();
const removeFriendMarkersToMapMock = jest.fn();
const changeDrawerContentMock =  jest.fn();
const setPositionMock =  jest.fn();
const setFriendsPlacesMock =  jest.fn();

describe('BasicLogin',() => {
	it("Renders coorectly",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <FriendCard
						key={"friend_card_" + friendMock.webId}
                        API_friend_calls={API_friend_callsMock}
                        friend={friendMock}
                        changeDrawerContent={changeDrawerContentMock}
                        returnTo={null}
                        API_location_calls={API_location_callsMock}
                        setPosition={setPositionMock}
                        setFriendsPlaces={setFriendsPlacesMock}
                        friendsPlaces={[placeMock]}
                        loggedInUserwebId = {"Main"}
                        addFriendMarkersToMap = {addFriendMarkersToMapMock}
                        removeFriendMarkersToMap = {removeFriendMarkersToMapMock}
                        visibleFriends = {[]}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)

        const visibility = screen.getByTestId('visibility')
        expect(visibility).toBeInTheDocument();
        act(() => fireEvent.click(visibility));
        expect(addFriendMarkersToMapMock).toHaveBeenCalledTimes(1);
        expect(addFriendMarkersToMapMock).toHaveBeenCalledWith("friend");
        expect(removeFriendMarkersToMapMock).toHaveBeenCalledTimes(0);

        const card = screen.getByTestId('card')
        expect(card).toBeInTheDocument();
        fireEvent.click(card);
    });

    it("Removes coorectly",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <FriendCard
						key={"friend_card_" + friendMock.webId}
                        API_friend_calls={API_friend_callsMock}
                        friend={friendMock}
                        changeDrawerContent={changeDrawerContentMock}
                        returnTo={null}
                        API_location_calls={API_location_callsMock}
                        setPosition={setPositionMock}
                        setFriendsPlaces={setFriendsPlacesMock}
                        friendsPlaces={[placeMock]}
                        loggedInUserwebId = {"Main"}
                        addFriendMarkersToMap = {addFriendMarkersToMapMock}
                        removeFriendMarkersToMap = {removeFriendMarkersToMapMock}
                        visibleFriends = {["friend"]}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)

        const visibility = screen.getByTestId('visibility')
        expect(visibility).toBeInTheDocument();
        act(() => fireEvent.click(visibility));
        expect(addFriendMarkersToMapMock).toHaveBeenCalledTimes(0);
        expect(removeFriendMarkersToMapMock).toHaveBeenCalledTimes(1);
        expect(removeFriendMarkersToMapMock).toHaveBeenCalledWith("friend");

        const card = screen.getByTestId('card')
        expect(card).toBeInTheDocument();
        fireEvent.click(card);
    });

})
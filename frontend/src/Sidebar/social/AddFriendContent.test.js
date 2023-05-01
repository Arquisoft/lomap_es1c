import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import global_es from '../../translations/es/global.json';
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { ThemeContext } from '../../contexts/ThemeContext';
import { Themes } from "../../contexts/ThemeContext";
import AddFriendContent from "./AddFriendContent";

i18next.init({
	interpolation: { escapeValue: false },
	lng: "es",
	resources: {es: { global: global_es}},
});


const API_friend_callsMock = {
	API_acceptIncomingFriendRequest: jest.fn(),
	API_generateNewFriendRequest: jest.fn(),
};
const changeDrawerContentMock =  jest.fn();

const solictudMock={
    id:"1",
    sender:"FriendName",
    name:"FriendName"
}

describe('BasicLogin',() => {
	it("Renders coorectly",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <AddFriendContent
						API_friend_calls={API_friend_callsMock}
                        returnTo={null}
                        changeDrawerContent={changeDrawerContentMock}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)

        const arrow = screen.getByTestId('arrow')
        expect(arrow).toBeInTheDocument();
        fireEvent.click(arrow);

        const nameInput = screen.getByPlaceholderText('Nombre')
        expect(nameInput).toBeInTheDocument();
    
        fireEvent.change(nameInput,{target: { value: "Changed Value" }});
        const nameInputChange = screen.getByDisplayValue('Changed Value')
        expect(nameInputChange).toBeInTheDocument();

        const webIDInput = screen.getByPlaceholderText('WebId')
        expect(webIDInput).toBeInTheDocument();
    
        fireEvent.change(webIDInput,{target: { value: "Changed Value2" }});
        const webIDInputChange = screen.getByDisplayValue('Changed Value2')
        expect(webIDInputChange).toBeInTheDocument();

        const addFriend = screen.getByTestId('addFriend')
        expect(addFriend).toBeInTheDocument();
        fireEvent.click(addFriend);
        

	});

    it("Solicitude not null",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <AddFriendContent
						API_friend_calls={API_friend_callsMock}
                        returnTo={null}
                        changeDrawerContent={changeDrawerContentMock}
                        solicitud={solictudMock}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)

        const addFriend = screen.getByTestId('addFriend')
        const nameTextField = screen.getByTestId("nameTextField")
        expect(addFriend).toBeInTheDocument();
        fireEvent.change(nameTextField, {target: {value: "Name"}})
        fireEvent.click(addFriend);

	});

})
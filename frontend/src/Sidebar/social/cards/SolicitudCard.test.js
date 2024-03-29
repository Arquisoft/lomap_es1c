import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import global_es from '../../../translations/es/global.json';
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { ThemeContext } from '../../../contexts/ThemeContext';
import { Themes } from "../../../contexts/ThemeContext";
import SolicitudCard from "./SolicitudCard";

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

const solictudMock={
    id:"1",
    sender:"FriendName"
}

const API_friend_callsMock = {
	API_rejectIncomingFriendRequest: jest.fn(),
};

const changeDrawerContentMock =  jest.fn();

describe('BasicLogin',() => {
	it("Renders coorectly",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <SolicitudCard
						key={"solicitud_card" + solictudMock.id}
                        API_friend_calls={API_friend_callsMock}
                        solicitud={solictudMock}
                        returnTo={null}
                        changeDrawerContent = {changeDrawerContentMock}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)

        const accept = screen.getByTestId('accept')
        expect(accept).toBeInTheDocument();
        fireEvent.click(accept);

        const reject = screen.getByTestId('reject')
        expect(reject).toBeInTheDocument();
        fireEvent.click(reject);
    });

})
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import global_es from '../../translations/es/global.json';
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { ThemeContext } from '../../contexts/ThemeContext';
import { Themes } from "../../contexts/ThemeContext";
import SolicitudesContent from "./SolicitudesContent";

i18next.init({
	interpolation: { escapeValue: false },
	lng: "es",
	resources: {es: { global: global_es}},
});

const solictudMok={
    id:"1",
    sender:"FriendName"
}

const API_friend_callsMok = {
	API_removeFriend: jest.fn(),
};

const changeDrawerContentMok =  jest.fn();

describe('BasicLogin',() => {
	it("Renders coorectly",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <SolicitudesContent
                        API_friend_calls={API_friend_callsMok}
                        solicitudes={[solictudMok]}
                        returnTo={null}
                        changeDrawerContent={changeDrawerContentMok}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)
        const arrow = screen.getByTestId('arrow')
        expect(arrow).toBeInTheDocument();
        fireEvent.click(arrow);

	});

})
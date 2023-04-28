import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import SettingsSpeedDial from "./SettingsSpeedDial";
import userEvent from '@testing-library/user-event';
import { act } from "react-dom/test-utils";
import { I18nextProvider } from "react-i18next";
import i18next from "i18next";
import global_es from '../translations/es/global.json';
import { ThemeContext } from '../contexts/ThemeContext';
import { Themes } from "../contexts/ThemeContext";

i18next.init({
	interpolation: { escapeValue: false },
	lng: "es",
	resources: {es: { global: global_es}},
});

const changeLanguageMock = jest.fn()
const toggleThemeMock = jest.fn()
const logOutFunctionMock = jest.fn()

describe('EditRouteInfo', () => {
    it ("Renders correctly", () => {
        render(
            <I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <SettingsSpeedDial
                        changeLanguage={changeLanguageMock}
                        toggleTheme={toggleThemeMock}
                        logOutFunction={logOutFunctionMock}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
        )

    //     const speedDialButton = screen.getByTestId("speed-dial-button");
    //     const languageButton = screen.queryByTestId("change-language-button");
    //     const logOutButton = screen.queryByTestId("log-out-button");
    //     const themeLightButton = screen.queryByTestId("change-theme-button-current-light");
    //     const themeDarkButton = screen.queryByTestId("change-theme-button-current-dark");

    //     expect(speedDialButton).toBeInTheDocument();
    //     expect(languageButton).toBeInTheDocument();
    //     expect(languageButton).not.toBeVisible();
    //     expect(themeLightButton).toBeInTheDocument();
    //     expect(themeLightButton).not.toBeVisible();
    //     expect(themeDarkButton).toBeNull();
    //     expect(logOutButton).toBeInTheDocument();
    //     expect(logOutButton).not.toBeVisible();
        
    //     fireEvent.click(speedDialButton)

    //     expect(speedDialButton).toBeInTheDocument();
    //     expect(languageButton).toBeInTheDocument();
    //     expect(languageButton).toBeVisible();
    //     expect(themeLightButton).toBeInTheDocument();
    //     expect(themeLightButton).toBeVisible();
    //     expect(themeDarkButton).toBeNull();
    //     expect(logOutButton).toBeInTheDocument();
    //     expect(logOutButton).toBeVisible();

    //     act(() => userEvent.keyboard('{esc}'));

    //     expect(speedDialButton).toBeInTheDocument();
    //     expect(languageButton).toBeInTheDocument();
    //     expect(languageButton).not.toBeVisible();
    //     expect(themeLightButton).toBeInTheDocument();
    //     expect(themeLightButton).not.toBeVisible();
    //     expect(themeDarkButton).toBeNull();
    //     expect(logOutButton).toBeInTheDocument();
    //     expect(logOutButton).not.toBeVisible();

    //     fireEvent.click(speedDialButton)

    //     expect(speedDialButton).toBeInTheDocument();
    //     expect(languageButton).toBeInTheDocument();
    //     expect(languageButton).toBeVisible();
    //     expect(themeLightButton).toBeInTheDocument();
    //     expect(themeLightButton).toBeVisible();
    //     expect(themeDarkButton).toBeNull();
    //     expect(logOutButton).toBeInTheDocument();
    //     expect(logOutButton).toBeVisible();

    //     act(() => userEvent.click(speedDialButton))

    //     expect(speedDialButton).toBeInTheDocument();
    //     expect(languageButton).toBeInTheDocument();
    //     expect(languageButton).not.toBeVisible();
    //     expect(themeLightButton).toBeInTheDocument();
    //     expect(themeLightButton).not.toBeVisible();
    //     expect(themeDarkButton).toBeNull();
    //     expect(logOutButton).toBeInTheDocument();
    //     expect(logOutButton).not.toBeVisible();

    //     expect(changeLanguageMock).toHaveBeenCalledTimes(0);
    //     expect(toggleThemeMock).toHaveBeenCalledTimes(0);
    //     expect(logOutFunctionMock).toHaveBeenCalledTimes(0);
    // })

    // it ("Click on language button", () => {
    //     render(
    //         <I18nextProvider i18n={i18next}>
    //             <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
    //                 <SettingsSpeedDial
    //                     changeLanguage={changeLanguageMock}
    //                     toggleTheme={toggleThemeMock}
    //                     logOutFunction={logOutFunctionMock}
    //                 />
    //             </ThemeContext.Provider>
    //         </I18nextProvider>
    //     )

    //     const speedDialButton = screen.getByTestId("speed-dial-button");
    //     const languageButton = screen.queryByTestId("change-language-button");
    //     const logOutButton = screen.queryByTestId("log-out-button")
    //     const themeLightButton = screen.queryByTestId("change-theme-button-current-light");
    //     const themeDarkButton = screen.queryByTestId("change-theme-button-current-dark");

    //     expect(speedDialButton).toBeInTheDocument();
    //     expect(languageButton).toBeInTheDocument();
    //     expect(languageButton).not.toBeVisible();
    //     expect(themeLightButton).toBeInTheDocument(); 
    //     expect(themeLightButton).not.toBeVisible();
    //     expect(themeDarkButton).toBeNull();
    //     expect(logOutButton).toBeInTheDocument();
    //     expect(logOutButton).not.toBeVisible();
        
    //     act(() => userEvent.click(speedDialButton))

    //     expect(speedDialButton).toBeInTheDocument();
    //     expect(languageButton).toBeInTheDocument();
    //     expect(languageButton).toBeVisible();
    //     expect(themeLightButton).toBeInTheDocument();
    //     expect(themeLightButton).toBeVisible();
    //     expect(themeDarkButton).toBeNull();
    //     expect(logOutButton).toBeInTheDocument();
    //     expect(logOutButton).toBeVisible();

    //     act(() => userEvent.click(languageButton))

    //     expect(speedDialButton).toBeInTheDocument();
    //     expect(languageButton).toBeInTheDocument();
    //     expect(languageButton).toBeVisible();
    //     expect(themeLightButton).toBeInTheDocument();
    //     expect(themeLightButton).toBeVisible();
    //     expect(themeDarkButton).toBeNull();
    //     expect(logOutButton).toBeInTheDocument();
    //     expect(logOutButton).toBeVisible();

    //     expect(changeLanguageMock).toHaveBeenCalledTimes(1);
    //     expect(toggleThemeMock).toHaveBeenCalledTimes(0);
    //     expect(logOutFunctionMock).toHaveBeenCalledTimes(0);
    // })

    // it ("Click on toggle theme", () => {
    //     render(
    //         <I18nextProvider i18n={i18next}>
    //             <ThemeContext.Provider value={{ currentTheme: Themes.DARK }}>
    //                 <SettingsSpeedDial
    //                     changeLanguage={changeLanguageMock}
    //                     toggleTheme={toggleThemeMock}
    //                     logOutFunction={logOutFunctionMock}
    //                 />
    //             </ThemeContext.Provider>
    //         </I18nextProvider>
    //     );

    //     const speedDialButton = screen.getByTestId("speed-dial-button");
    //     const languageButton = screen.queryByTestId("change-language-button");
    //     const logOutButton = screen.queryByTestId("log-out-button")
    //     const themeLightButton = screen.queryByTestId("change-theme-button-current-light");
    //     const themeDarkButton = screen.queryByTestId("change-theme-button-current-dark");

    //     expect(speedDialButton).toBeInTheDocument();
    //     expect(languageButton).toBeInTheDocument();
    //     expect(languageButton).not.toBeVisible();
    //     expect(themeDarkButton).toBeInTheDocument(); 
    //     expect(themeDarkButton).not.toBeVisible();
    //     expect(themeLightButton).toBeNull();
    //     expect(logOutButton).toBeInTheDocument();
    //     expect(logOutButton).not.toBeVisible();

    //     act(() => userEvent.click(speedDialButton))

    //     expect(speedDialButton).toBeInTheDocument();
    //     expect(languageButton).toBeInTheDocument();
    //     expect(languageButton).toBeVisible();
    //     expect(themeDarkButton).toBeInTheDocument();
    //     expect(themeDarkButton).toBeVisible();
    //     expect(themeLightButton).toBeNull();
    //     expect(logOutButton).toBeInTheDocument();
    //     expect(logOutButton).toBeVisible();

    //     act(() => userEvent.click(themeDarkButton))

    //     expect(changeLanguageMock).toHaveBeenCalledTimes(0);
    //     expect(toggleThemeMock).toHaveBeenCalledTimes(1);
    //     expect(logOutFunctionMock).toHaveBeenCalledTimes(0);
    // })

    // it ("Click on log out button", () => {
    //     render(
    //         <I18nextProvider i18n={i18next}>
    //             <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
    //                 <SettingsSpeedDial
    //                     changeLanguage={changeLanguageMock}
    //                     toggleTheme={toggleThemeMock}
    //                     logOutFunction={logOutFunctionMock}
    //                 /> 
    //             </ThemeContext.Provider>
    //         </I18nextProvider>
    //     )

    //     const speedDialButton = screen.getByTestId("speed-dial-button");
    //     const languageButton = screen.queryByTestId("change-language-button");
    //     const logOutButton = screen.queryByTestId("log-out-button")
    //     const themeLightButton = screen.queryByTestId("change-theme-button-current-light");
    //     const themeDarkButton = screen.queryByTestId("change-theme-button-current-dark");

    //     expect(speedDialButton).toBeInTheDocument();
    //     expect(languageButton).toBeInTheDocument();
    //     expect(languageButton).not.toBeVisible();
    //     expect(themeLightButton).toBeInTheDocument(); 
    //     expect(themeLightButton).not.toBeVisible();
    //     expect(themeDarkButton).toBeNull();
    //     expect(logOutButton).toBeInTheDocument();
    //     expect(logOutButton).not.toBeVisible();
        
    //     act(() => userEvent.click(speedDialButton))

    //     expect(speedDialButton).toBeInTheDocument();
    //     expect(languageButton).toBeInTheDocument();
    //     expect(languageButton).toBeVisible();
    //     expect(themeLightButton).toBeInTheDocument(); 
    //     expect(themeLightButton).toBeVisible();
    //     expect(themeDarkButton).toBeNull();
    //     expect(logOutButton).toBeInTheDocument();
    //     expect(logOutButton).toBeVisible();

    //     act(() => userEvent.click(logOutButton))

    //     expect(speedDialButton).toBeInTheDocument();
    //     expect(languageButton).toBeInTheDocument();
    //     expect(languageButton).toBeVisible();
    //     expect(themeLightButton).toBeInTheDocument(); 
    //     expect(themeLightButton).toBeVisible();
    //     expect(themeDarkButton).toBeNull();
    //     expect(logOutButton).toBeInTheDocument();
    //     expect(logOutButton).toBeVisible();

    //     expect(changeLanguageMock).toHaveBeenCalledTimes(0);
    //     expect(toggleThemeMock).toHaveBeenCalledTimes(0);
    //     expect(logOutFunctionMock).toHaveBeenCalledTimes(1);
    })
})
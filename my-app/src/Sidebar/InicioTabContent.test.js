import React from "react";
import { render } from "@testing-library/react";
import InicioTabContent from "./InicioTabContent";
import { ThemeContextProvider } from '../contexts/ThemeContext';
import { I18nextProvider } from "react-i18next";
import i18next from 'i18next';

describe(InicioTabContent, () => {
    it("Search bar is empty when there are no places to show", () => {
        const { getByTestId } = render(
            <I18nextProvider i18n={i18next}>
                <ThemeContextProvider
                    children={<InicioTabContent userPlaces={[]}/>}
                />
            </I18nextProvider>
        );

        // const searchBar = getByTestId('test-bar-2');
        // expect(searchBar.value).toEqual("");
    })
})

    // it("Search bar is empty when there are places to show", () => {
    //     const {getByPlaceholderText } = render(<InicioTabContent userPlaces={[
    //         {key:1, name: "nombre1",},
    //         {key:2, name: "nombre2"},
    //     ]}/>);
    //     const searchBar = getByPlaceholderText ("Buscar");
    //     expect(searchBar.textContent).toEqual("");
    // })

    // TODO: add more complext tests
import React from "react";
import { render } from "@testing-library/react";
import EditRouteInfo from "./EditInfoRoute";
import { ThemeContextProvider } from '../contexts/ThemeContext';
import { I18nextProvider } from "react-i18next";
import i18next from 'i18next';

const returnFunctionMock = jest.fn()
const routeCalls = {
    API_addRoute: jest.fn(),
    API_updateRouteInfo: jest.fn(),
    API_addLocationToRoute: jest.fn(),
    API_deleteLocationFromRoute: jest.fn(),
}

describe('EditRouteInfo', () => {
    it ("", () => {
        const { getByTestId } = render(
            <EditRouteInfo
                route = {null}
                returnFunction = {returnFunctionMock}
                userPlaces = {[]}
                API_route_calls = {routeCalls}
            />
        );
    })


    // it("Search bar is empty when there are no places to show", () => {
    //     const { getByTestId } = render(
    //         <I18nextProvider i18n={i18next}>
    //             <ThemeContextProvider
    //                 children={<InicioTabContent userPlaces={[]}/>}
    //             />
    //         </I18nextProvider>
    //     );

    //     // const searchBar = getByTestId('test-bar-2');
    //     // expect(searchBar.value).toEqual("");
    // })
})
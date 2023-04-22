import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import FullRouteInfo from "./FullInfoRoute";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";
import i18next from "i18next";
import global_es from '../../translations/es/global.json';
import { I18nextProvider } from "react-i18next";

i18next.init({
	interpolation: { escapeValue: false },
	lng: "es",
	resources: {es: { global: global_es}},
});

const changeDrawerContentMock = jest.fn()
const returnFunctionMock = jest.fn()
const API_deleteRouteMock = jest.fn()

describe('FullInfoRoute', () => {
    it ('Empty route renders correctly', () => {
        render(
            <I18nextProvider i18n={i18next}>
                <FullRouteInfo
                    key=""
                    route={{
                        id: "route01",
                        author: "https://id.inrupt.com/uo276818",
                        name: "Empty route",
                        description: "Description for empty route",
                        locations: []
                    }}
                    returnFunction = {returnFunctionMock}
                    changeDrawerContent={changeDrawerContentMock}
                    userPlaces = {[]}
                    API_route_calls={{API_deleteRoute: API_deleteRouteMock}}
                />
            </I18nextProvider>
        )

        expect(screen.getByTestId("full_info_route_name")).toBeInTheDocument()
        expect(screen.getByTestId("full_info_route_description")).toBeInTheDocument()
        expect(screen.getByTestId("list-title")).toBeInTheDocument()
        expect(screen.getByTestId("full_info_route_places_list")).toBeInTheDocument()
        expect(screen.getByTestId("return-button")).toBeInTheDocument()
        expect(screen.getByTestId("delete-button")).toBeInTheDocument()
        expect(screen.getByTestId("edit-button")).toBeInTheDocument()

        expect(screen.getByTestId("number-of-places-text")).toBeInTheDocument()
        expect(screen.getByTestId("number-of-places-text").textContent).toEqual("0")
        expect(screen.queryAllByTestId(/^full_info_route_place_/)).toHaveLength(0)

        expect(changeDrawerContentMock).toHaveBeenCalledTimes(0)
        expect(returnFunctionMock).toHaveBeenCalledTimes(0)
        expect(API_deleteRouteMock).toHaveBeenCalledTimes(0)
    })

    it ('Non empty route renders correctly', () => {
        render(
            <I18nextProvider i18n={i18next}>
                <FullRouteInfo
                    key=""
                    route={{
                        id: "route01",
                        author: "https://id.inrupt.com/uo276818",
                        name: "Empty route",
                        description: "Description for empty route",
                        locations: [{
                            id: "1",
                            categoria: "",
                            lat: 43.50441045903223,
                            lng: -5.840656204113697,
                            name: "NombreLugar1"
                        },
                        {
                            id: "2",
                            categoria: "Punto de interés",
                            lat: 43.55817467160376,
                            lng: -5.818683547863697,
                            name: "Lugar2Nombre"
                        },
                        {
                            id: "3",
                            categoria: "Parque",
                            lat: 43.56078698814968,
                            lng: -5.88975135792229,
                            name: "Name3Location"
                        },
                        {
                            id: "4",
                            categoria: "Parque",
                            lat: 43.50441045903223,
                            lng: -5.818683547863697,
                            name: "Location4Name"
                        }]
                    }}
                    returnFunction = {returnFunctionMock}
                    changeDrawerContent={changeDrawerContentMock}
                    userPlaces = {[]}
                    API_route_calls={{API_deleteRoute: API_deleteRouteMock}}
                />
            </I18nextProvider>
        )

        expect(screen.getByTestId("full_info_route_name")).toBeInTheDocument()
        expect(screen.getByTestId("full_info_route_description")).toBeInTheDocument()
        expect(screen.getByTestId("list-title")).toBeInTheDocument()
        expect(screen.getByTestId("full_info_route_places_list")).toBeInTheDocument()
        expect(screen.getByTestId("return-button")).toBeInTheDocument()
        expect(screen.getByTestId("delete-button")).toBeInTheDocument()
        expect(screen.getByTestId("edit-button")).toBeInTheDocument()
        
        expect(screen.getByTestId("number-of-places-text")).toBeInTheDocument()
        expect(screen.getByTestId("number-of-places-text").textContent).toEqual("4")
        expect(screen.queryAllByTestId(/^full_info_route_place_/)).toHaveLength(4)

        expect(changeDrawerContentMock).toHaveBeenCalledTimes(0)
        expect(returnFunctionMock).toHaveBeenCalledTimes(0)
        expect(API_deleteRouteMock).toHaveBeenCalledTimes(0)
    })

    it ('Test click on return', () => {
        render(
            <I18nextProvider i18n={i18next}>
                <FullRouteInfo
                    key=""
                    route={{
                        id: "route01",
                        author: "https://id.inrupt.com/uo276818",
                        name: "Empty route",
                        description: "Description for empty route",
                        locations: []
                    }}
                    returnFunction = {returnFunctionMock}
                    changeDrawerContent={changeDrawerContentMock}
                    userPlaces = {[]}
                    API_route_calls={{API_deleteRoute: API_deleteRouteMock}}
                />
            </I18nextProvider>
        )

        const returnButton = screen.getByTestId("return-button")
        act(() => userEvent.click(returnButton))

        expect(changeDrawerContentMock).toHaveBeenCalledTimes(0)
        expect(returnFunctionMock).toHaveBeenCalledTimes(1)
        expect(API_deleteRouteMock).toHaveBeenCalledTimes(0)
    })

    it ('Test click on edit', () => {
        render(
            <I18nextProvider i18n={i18next}>
                <FullRouteInfo
                    key=""
                    route={{
                        id: "route01",
                        author: "https://id.inrupt.com/uo276818",
                        name: "Empty route",
                        description: "Description for empty route",
                        locations: []
                    }}
                    returnFunction = {returnFunctionMock}
                    changeDrawerContent={changeDrawerContentMock}
                    userPlaces = {[]}
                    API_route_calls={{API_deleteRoute: API_deleteRouteMock}}
                />
            </I18nextProvider>
        )

        const editButton = screen.getByTestId("edit-button")
        act(() => userEvent.click(editButton))

        expect(changeDrawerContentMock).toHaveBeenCalledTimes(1)
        expect(returnFunctionMock).toHaveBeenCalledTimes(0)
        expect(API_deleteRouteMock).toHaveBeenCalledTimes(0)
    })

    it ('Test click on delete', async () => {
        render(
            <I18nextProvider i18n={i18next}>
                <FullRouteInfo
                    key=""
                    route={{
                        id: "route01",
                        author: "https://id.inrupt.com/uo276818",
                        name: "Empty route",
                        description: "Description for empty route",
                        locations: []
                    }}
                    returnFunction = {returnFunctionMock}
                    changeDrawerContent={changeDrawerContentMock}
                    userPlaces = {[]}
                    API_route_calls={{API_deleteRoute: API_deleteRouteMock}}
                />
            </I18nextProvider>
        )

        const editButton = screen.getByTestId("delete-button")
        act(() => userEvent.click(editButton))

        await waitFor(() => expect(changeDrawerContentMock).toHaveBeenCalledTimes(0))
        await waitFor(() => expect(returnFunctionMock).toHaveBeenCalledTimes(1))
        await waitFor(() => expect(API_deleteRouteMock).toHaveBeenCalledTimes(1))
    })
})

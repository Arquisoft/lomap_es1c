import React from "react";
import { render, screen } from "@testing-library/react";
import EditRouteInfo from "./EditInfoRoute";
import userEvent from '@testing-library/user-event';
import { fireEvent } from "@testing-library/react";
import { experimentalStyled } from "@mui/material";


const returnFunctionMock = jest.fn()
const routeCalls = {
    API_addRoute: jest.fn(),
    API_updateRouteInfo: jest.fn(),
    API_addLocationToRoute: jest.fn(),
    API_deleteLocationFromRoute: jest.fn(),
}

describe('EditRouteInfo', () => {
    it ("Create new route with no locations", () => {
        const addMockResponse = {id: 123456789};
        routeCalls.API_addRoute.mockResolvedValue(addMockResponse);

        render(
            <EditRouteInfo
                route = {null}
                returnFunction = {returnFunctionMock}
                userPlaces = {[]}
                API_route_calls = {routeCalls}
            />
        );

        const returnButton = screen.getByTestId('back-button');
        const titleTextField = screen.getByTestId('text-field-titulo');
        const descriptionTextField = screen.getByTestId('text-field-description');
        const saveButton = screen.getByTestId('save-button');
        const addButton = screen.getByTestId('add-button');

        expect(returnButton).toBeInTheDocument();
        expect(titleTextField).toBeInTheDocument();
        expect(descriptionTextField).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();

        expect(titleTextField).toHaveValue('');
        expect(descriptionTextField).toHaveValue('');

        fireEvent.change(titleTextField, {target: {value: "Título de la ruta"}});
        expect(titleTextField).toHaveValue('Título de la ruta');
        expect(descriptionTextField).toHaveValue('');

        fireEvent.change(descriptionTextField, {target: {value: "Descripcion de la ruta"}});
        expect(titleTextField).toHaveValue('Título de la ruta');
        expect(descriptionTextField).toHaveValue('Descripcion de la ruta');

        userEvent.click(saveButton)
        
        expect(returnFunctionMock).toHaveBeenCalledTimes(0)
        expect(routeCalls.API_addRoute).toHaveBeenCalledTimes(1)
        expect(routeCalls.API_addRoute).toHaveBeenCalledWith("Título de la ruta", "Descripcion de la ruta");
        expect(routeCalls.API_updateRouteInfo).toHaveBeenCalledTimes(0)
        expect(routeCalls.API_addLocationToRoute).toHaveBeenCalledTimes(0)
        expect(routeCalls.API_deleteLocationFromRoute).toHaveBeenCalledTimes(0)
    }),

    it ("Return when creating new route with no", () => {
        render(
            <EditRouteInfo
                route = {null}
                returnFunction = {returnFunctionMock}
                userPlaces = {[]}
                API_route_calls = {routeCalls}
            />
        );

        const returnButton = screen.getByTestId('back-button');
        userEvent.click(returnButton)

        expect(returnFunctionMock).toHaveBeenCalledTimes(1)
        expect(routeCalls.API_addRoute).toHaveBeenCalledTimes(0)
        expect(routeCalls.API_updateRouteInfo).toHaveBeenCalledTimes(0)
        expect(routeCalls.API_addLocationToRoute).toHaveBeenCalledTimes(0)
        expect(routeCalls.API_deleteLocationFromRoute).toHaveBeenCalledTimes(0)
    })

    // --------------------------------------------------

    it ("Creating route renders correctly", () => {})
    it ("Updating route renders correctly", () => {})
    it ("Can create a route with no places", () => {})
    it ("Can create a route with some places", () => {})
    it ("Cannot create a route with no name", () => {})
    it ("Cannot update a route to have no name", () => {})
    it ("Places can be added", () => {})
    it ("Already stored places can be removed", () => {})
    it ("Just stored places can be removed", () => {})
    it ("Removed places can be added", () => {})
    it ("Only needed calls are executed", () => {})
    it ("No places can be added when there are no places", () => {})
    it ("No places can be added when there are no places left to add", () => {})
    it ("Return function doesn't modify the data", () => {})
})
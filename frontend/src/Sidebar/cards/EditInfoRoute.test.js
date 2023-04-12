import React from "react";
import { render, screen, waitFor, fireEvent  } from "@testing-library/react";
import EditRouteInfo from "./EditInfoRoute";
import userEvent from '@testing-library/user-event';
import { act } from "react-dom/test-utils";

const returnFunctionMock = jest.fn()
const routeCalls = {
    API_addRoute: jest.fn(),
    API_updateRouteInfo: jest.fn(),
    API_addLocationToRoute: jest.fn(),
    API_deleteLocationFromRoute: jest.fn(),
}

const userPlaces = [
    {
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
    }
]

describe('EditRouteInfo', () => {
    it ("Creating route renders correctly", async () => {
        render(
            <EditRouteInfo
                route = {null}
                returnFunction = {returnFunctionMock}
                userPlaces = {userPlaces}
                API_route_calls = {routeCalls}
            />
        );

        const returnButton = screen.getByTestId('back-button');
        const titleTextField = screen.getByTestId('text-field-title');
        const descriptionTextField = screen.getByTestId('text-field-description');
        const saveButton = screen.getByTestId('save-button');
        const addButton = screen.getByTestId('add-button');
        const yourLocationsTitle = screen.getByTestId('your-locations-title');

        expect(returnButton).toBeInTheDocument();
        expect(titleTextField).toBeInTheDocument();
        expect(descriptionTextField).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();
        expect(yourLocationsTitle).toBeInTheDocument();

        expect(titleTextField).toHaveValue('');
        expect(descriptionTextField).toHaveValue('');

        expect(returnFunctionMock).toHaveBeenCalledTimes(0)
        expect(routeCalls.API_addRoute).toHaveBeenCalledTimes(0)
        expect(routeCalls.API_updateRouteInfo).toHaveBeenCalledTimes(0)
        expect(routeCalls.API_addLocationToRoute).toHaveBeenCalledTimes(0)
        expect(routeCalls.API_deleteLocationFromRoute).toHaveBeenCalledTimes(0)
    })

    it ("Updating route renders correctly", async () => {
        render(
            <EditRouteInfo
                route = {{
                    id: 111,
                    name: "routeName",
                    description: "routeDescription",
                    locations: [{
                        id: "1",
                        categoria: "",
                        lat: 43.50441045903223,
                        lng: -5.840656204113697,
                        name: "NombreLugar1"
                    },{
                        id: "3",
                        categoria: "Parque",
                        lat: 43.56078698814968,
                        lng: -5.88975135792229,
                        name: "Name3Location"
                    }]
                }}
                returnFunction = {returnFunctionMock}
                userPlaces = {userPlaces}
                API_route_calls = {routeCalls}
            />
        );

        const returnButton = screen.getByTestId('back-button');
        const titleTextField = screen.getByTestId('text-field-title');
        const descriptionTextField = screen.getByTestId('text-field-description');
        const saveButton = screen.getByTestId('save-button');
        const addButton = screen.getByTestId('add-button');
        const yourLocationsTitle = screen.getByTestId('your-locations-title');
        const li1 = screen.getByTestId('1_li')
        const li2 = screen.queryByTestId('2_li')
        const li3 = screen.getByTestId('3_li')
        const li4 = screen.queryByTestId('4_li')
        const db1 = screen.getByTestId('location_detetebutton_1')
        const db2 = screen.queryByTestId('location_detetebutton_2')
        const db3 = screen.getByTestId('location_detetebutton_3')
        const db4 = screen.queryByTestId('location_detetebutton_4')
        const p1 = screen.getByTestId('location_list_name_1')
        const p2 = screen.queryByTestId('location_list_name_2')
        const p3 = screen.getByTestId('location_list_name_3')
        const p4 = screen.queryByTestId('location_list_name_4')

        expect(returnButton).toBeInTheDocument();
        expect(titleTextField).toBeInTheDocument();
        expect(descriptionTextField).toBeInTheDocument();
        expect(saveButton).toBeInTheDocument();
        expect(addButton).toBeInTheDocument();
        expect(yourLocationsTitle).toBeInTheDocument();
        expect(li1).toBeInTheDocument();
        expect(li2).toBeNull();
        expect(li3).toBeInTheDocument();
        expect(li4).toBeNull();
        expect(db1).toBeInTheDocument();
        expect(db2).toBeNull();
        expect(db3).toBeInTheDocument();
        expect(db4).toBeNull();
        expect(p1).toBeInTheDocument();
        expect(p2).toBeNull();
        expect(p3).toBeInTheDocument();
        expect(p4).toBeNull();
        
        expect(titleTextField).toHaveValue('routeName');
        expect(descriptionTextField).toHaveValue('routeDescription');
        expect(p1.textContent).toBe('NombreLugar1');
        expect(p3.textContent).toBe('Name3Location');

        expect(returnFunctionMock).toHaveBeenCalledTimes(0)
        expect(routeCalls.API_addRoute).toHaveBeenCalledTimes(0)
        expect(routeCalls.API_updateRouteInfo).toHaveBeenCalledTimes(0)
        expect(routeCalls.API_addLocationToRoute).toHaveBeenCalledTimes(0)
        expect(routeCalls.API_deleteLocationFromRoute).toHaveBeenCalledTimes(0)
    })

    it ("Can create a route with no places", async () => {
        routeCalls.API_addRoute.mockResolvedValue(Promise.resolve({data: {id: 123456789}}));

        render(
            <EditRouteInfo
                route = {null}
                returnFunction = {returnFunctionMock}
                userPlaces = {userPlaces}
                API_route_calls = {routeCalls}
            />
        );

        const titleTextField = screen.getByTestId('text-field-title');
        const descriptionTextField = screen.getByTestId('text-field-description');
        const saveButton = screen.getByTestId('save-button');

        fireEvent.change(titleTextField, {target: {value: "Título de la ruta"}});
        expect(titleTextField).toHaveValue('Título de la ruta');
        expect(descriptionTextField).toHaveValue('');

        fireEvent.change(descriptionTextField, {target: {value: "Descripcion de la ruta"}});
        expect(titleTextField).toHaveValue('Título de la ruta');
        expect(descriptionTextField).toHaveValue('Descripcion de la ruta');

        act(() => {userEvent.click(saveButton)})
        
        await waitFor(() => expect(returnFunctionMock).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(routeCalls.API_addRoute).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(routeCalls.API_addRoute).toHaveBeenCalledWith("Título de la ruta", "Descripcion de la ruta"));
        await waitFor(() => expect(routeCalls.API_updateRouteInfo).toHaveBeenCalledTimes(0));
        await waitFor(() => expect(routeCalls.API_addLocationToRoute).toHaveBeenCalledTimes(0));
        await waitFor(() => expect(routeCalls.API_deleteLocationFromRoute).toHaveBeenCalledTimes(0));
    })

    it ("Can create a route with some places", async () => {
        routeCalls.API_addRoute.mockResolvedValue(Promise.resolve({data: {id: 123456789}}));

        render(
            <EditRouteInfo
                route = {null}
                returnFunction = {returnFunctionMock}
                userPlaces = {userPlaces}
                API_route_calls = {routeCalls}
            />
        );

        const titleTextField = screen.getByTestId('text-field-title');
        const descriptionTextField = screen.getByTestId('text-field-description');
        const saveButton = screen.getByTestId('save-button');

        fireEvent.change(titleTextField, {target: {value: "Título de la ruta"}});
        expect(titleTextField).toHaveValue('Título de la ruta');
        expect(descriptionTextField).toHaveValue('');

        fireEvent.change(descriptionTextField, {target: {value: "Descripcion de la ruta"}});
        expect(titleTextField).toHaveValue('Título de la ruta');
        expect(descriptionTextField).toHaveValue('Descripcion de la ruta');

        expect(screen.queryByTestId('1_li')).toBeNull();
        expect(screen.queryByTestId('2_li')).toBeNull();
        expect(screen.queryByTestId('3_li')).toBeNull();
        expect(screen.queryByTestId('4_li')).toBeNull();
        expect(screen.queryByTestId('location_detetebutton_1')).toBeNull();
        expect(screen.queryByTestId('location_detetebutton_2')).toBeNull();
        expect(screen.queryByTestId('location_detetebutton_3')).toBeNull();
        expect(screen.queryByTestId('location_detetebutton_4')).toBeNull();
        expect(screen.queryByTestId('location_list_name_1')).toBeNull();
        expect(screen.queryByTestId('location_list_name_2')).toBeNull();
        expect(screen.queryByTestId('location_list_name_3')).toBeNull();
        expect(screen.queryByTestId('location_list_name_4')).toBeNull();

        const addButton = screen.getByTestId('add-button');
        act(() => userEvent.click(addButton))
        const mnitem1 = screen.getByTestId('1_mnitem');
        const mnitem2 = screen.getByTestId('2_mnitem');
        const mnitem3 = screen.getByTestId('3_mnitem');
        const mnitem4 = screen.getByTestId('4_mnitem');

        expect(mnitem1).toBeInTheDocument();
        expect(mnitem2).toBeInTheDocument();
        expect(mnitem3).toBeInTheDocument();
        expect(mnitem4).toBeInTheDocument();
        expect(mnitem1).toBeVisible();
        expect(mnitem2).toBeVisible();
        expect(mnitem3).toBeVisible();
        expect(mnitem4).toBeVisible();

        act(() => userEvent.click(mnitem1));

        expect(mnitem1).not.toBeInTheDocument();
        expect(mnitem2).toBeInTheDocument();
        expect(mnitem3).toBeInTheDocument();
        expect(mnitem4).toBeInTheDocument();
        expect(mnitem2).not.toBeVisible();
        expect(mnitem3).not.toBeVisible();
        expect(mnitem4).not.toBeVisible();

        expect(screen.getByTestId('1_li')).toBeInTheDocument();
        expect(screen.queryByTestId('2_li')).toBeNull();
        expect(screen.queryByTestId('3_li')).toBeNull();
        expect(screen.queryByTestId('4_li')).toBeNull();
        expect(screen.getByTestId('location_detetebutton_1')).toBeInTheDocument();
        expect(screen.queryByTestId('location_detetebutton_2')).toBeNull();
        expect(screen.queryByTestId('location_detetebutton_3')).toBeNull();
        expect(screen.queryByTestId('location_detetebutton_4')).toBeNull();
        expect(screen.getByTestId('location_list_name_1')).toBeInTheDocument();
        expect(screen.queryByTestId('location_list_name_2')).toBeNull();
        expect(screen.queryByTestId('location_list_name_3')).toBeNull();
        expect(screen.queryByTestId('location_list_name_4')).toBeNull();

        act(() => userEvent.click(addButton))

        expect(mnitem1).not.toBeInTheDocument();
        expect(mnitem2).toBeInTheDocument();
        expect(mnitem3).toBeInTheDocument();
        expect(mnitem4).toBeInTheDocument();
        expect(mnitem2).toBeVisible();
        expect(mnitem3).toBeVisible();
        expect(mnitem4).toBeVisible();

        act(() => userEvent.click(mnitem3));

        expect(screen.getByTestId('1_li')).toBeInTheDocument();
        expect(screen.queryByTestId('2_li')).toBeNull();
        expect(screen.getByTestId('3_li')).toBeInTheDocument();
        expect(screen.queryByTestId('4_li')).toBeNull();
        expect(screen.getByTestId('location_detetebutton_1')).toBeInTheDocument();
        expect(screen.queryByTestId('location_detetebutton_2')).toBeNull();
        expect(screen.getByTestId('location_detetebutton_3')).toBeInTheDocument();
        expect(screen.queryByTestId('location_detetebutton_4')).toBeNull();
        expect(screen.getByTestId('location_list_name_1')).toBeInTheDocument();
        expect(screen.queryByTestId('location_list_name_2')).toBeNull();
        expect(screen.getByTestId('location_list_name_3')).toBeInTheDocument();
        expect(screen.queryByTestId('location_list_name_4')).toBeNull();
        expect(mnitem1).not.toBeInTheDocument();
        expect(mnitem2).toBeInTheDocument();
        expect(mnitem3).not.toBeInTheDocument();
        expect(mnitem4).toBeInTheDocument();
        expect(mnitem2).not.toBeVisible();
        expect(mnitem4).not.toBeVisible();

        act(() => userEvent.click(saveButton))
        
        await waitFor(() => expect(returnFunctionMock).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(routeCalls.API_addRoute).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(routeCalls.API_addRoute).toHaveBeenCalledWith("Título de la ruta", "Descripcion de la ruta"));
        await waitFor(() => expect(routeCalls.API_updateRouteInfo).toHaveBeenCalledTimes(0));
        await waitFor(() => expect(routeCalls.API_addLocationToRoute).toHaveBeenCalledTimes(2));
        await waitFor(() => expect(routeCalls.API_addLocationToRoute).toHaveBeenCalledWith(123456789, "1"));
        await waitFor(() => expect(routeCalls.API_addLocationToRoute).toHaveBeenCalledWith(123456789, "3"));
        await waitFor(() => expect(routeCalls.API_deleteLocationFromRoute).toHaveBeenCalledTimes(0));
    })

    it ("Cannot create a route with no name", async () => {
        render(
            <EditRouteInfo
                route = {null}
                returnFunction = {returnFunctionMock}
                userPlaces = {userPlaces}
                API_route_calls = {routeCalls}
            />
        );

        const saveButton = screen.getByTestId('save-button');
        act(() => userEvent.click(saveButton))
        await waitFor(() => expect(returnFunctionMock).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(routeCalls.API_addRoute).toHaveBeenCalledTimes(0));
        await waitFor(() => expect(routeCalls.API_updateRouteInfo).toHaveBeenCalledTimes(0));
        await waitFor(() => expect(routeCalls.API_addLocationToRoute).toHaveBeenCalledTimes(0));
        await waitFor(() => expect(routeCalls.API_deleteLocationFromRoute).toHaveBeenCalledTimes(0));
    })

    it ("Cannot update a route to have no name", async () => {
        render(
            <EditRouteInfo
                route = {{
                    id: 111,
                    name: "routeName",
                    description: "routeDescription",
                    locations: [{
                        id: "1",
                        categoria: "",
                        lat: 43.50441045903223,
                        lng: -5.840656204113697,
                        name: "NombreLugar1"
                    },{
                        id: "3",
                        categoria: "Parque",
                        lat: 43.56078698814968,
                        lng: -5.88975135792229,
                        name: "Name3Location"
                    }]
                }}
                returnFunction = {returnFunctionMock}
                userPlaces = {userPlaces}
                API_route_calls = {routeCalls}
            />
        );

        const saveButton = screen.getByTestId('save-button');
        const titleTextField = screen.getByTestId('text-field-title');
        const descriptionTextField = screen.getByTestId('text-field-description');

        fireEvent.change(titleTextField, {target: {value: ""}});
        expect(titleTextField).toHaveValue('');
        expect(descriptionTextField).toHaveValue('routeDescription');


        fireEvent.change(descriptionTextField, {target: {value: ""}});
        expect(titleTextField).toHaveValue('');
        expect(descriptionTextField).toHaveValue('');

        act(() => userEvent.click(saveButton))
        await waitFor(() => expect(returnFunctionMock).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(routeCalls.API_addRoute).toHaveBeenCalledTimes(0));
        await waitFor(() => expect(routeCalls.API_updateRouteInfo).toHaveBeenCalledTimes(0));
        await waitFor(() => expect(routeCalls.API_addLocationToRoute).toHaveBeenCalledTimes(0));
        await waitFor(() => expect(routeCalls.API_deleteLocationFromRoute).toHaveBeenCalledTimes(0));
    })

    it ("Can update name and description of route", async () => {
        render(
            <EditRouteInfo
                route = {{
                    id: 111,
                    name: "routeName",
                    description: "routeDescription",
                    locations: [{
                        id: "1",
                        categoria: "",
                        lat: 43.50441045903223,
                        lng: -5.840656204113697,
                        name: "NombreLugar1"
                    },{
                        id: "3",
                        categoria: "Parque",
                        lat: 43.56078698814968,
                        lng: -5.88975135792229,
                        name: "Name3Location"
                    }]
                }}
                returnFunction = {returnFunctionMock}
                userPlaces = {userPlaces}
                API_route_calls = {routeCalls}
            />
        );

        const saveButton = screen.getByTestId('save-button');
        const titleTextField = screen.getByTestId('text-field-title');
        const descriptionTextField = screen.getByTestId('text-field-description');

        fireEvent.change(titleTextField, {target: {value: "newName"}});
        expect(titleTextField).toHaveValue('newName');
        expect(descriptionTextField).toHaveValue('routeDescription');
        

        fireEvent.change(descriptionTextField, {target: {value: "newDescription"}});
        expect(titleTextField).toHaveValue('newName');
        expect(descriptionTextField).toHaveValue('newDescription');

        act(() => userEvent.click(saveButton))
        await waitFor(() => expect(returnFunctionMock).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(routeCalls.API_addRoute).toHaveBeenCalledTimes(0));
        await waitFor(() => expect(routeCalls.API_updateRouteInfo).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(routeCalls.API_updateRouteInfo).toHaveBeenCalledWith(111, "newName", "newDescription"))
        await waitFor(() => expect(routeCalls.API_addLocationToRoute).toHaveBeenCalledTimes(0));
        await waitFor(() => expect(routeCalls.API_deleteLocationFromRoute).toHaveBeenCalledTimes(0));
    })

    it ("Places can be added to existing route", async () => {
        render(
            <EditRouteInfo
                route = {{
                    id: 111,
                    name: "routeName",
                    description: "routeDescription",
                    locations: [{
                        id: "1",
                        categoria: "",
                        lat: 43.50441045903223,
                        lng: -5.840656204113697,
                        name: "NombreLugar1"
                    },{
                        id: "3",
                        categoria: "Parque",
                        lat: 43.56078698814968,
                        lng: -5.88975135792229,
                        name: "Name3Location"
                    }]
                }}
                returnFunction = {returnFunctionMock}
                userPlaces = {userPlaces}
                API_route_calls = {routeCalls}
            />
        );

        const addButton = screen.getByTestId('add-button');
        const saveButton = screen.getByTestId('save-button');

        expect(screen.getByTestId('1_li')).toBeInTheDocument();
        expect(screen.queryByTestId('2_li')).toBeNull();
        expect(screen.getByTestId('3_li')).toBeInTheDocument();
        expect(screen.queryByTestId('4_li')).toBeNull();
        expect(screen.getByTestId('location_detetebutton_1')).toBeInTheDocument();
        expect(screen.queryByTestId('location_detetebutton_2')).toBeNull();
        expect(screen.getByTestId('location_detetebutton_3')).toBeInTheDocument();
        expect(screen.queryByTestId('location_detetebutton_4')).toBeNull();
        expect(screen.getByTestId('location_list_name_1')).toBeInTheDocument();
        expect(screen.queryByTestId('location_list_name_2')).toBeNull();
        expect(screen.getByTestId('location_list_name_3')).toBeInTheDocument();
        expect(screen.queryByTestId('location_list_name_4')).toBeNull();

        act(() => userEvent.click(addButton))
        const mnitem1 = screen.queryByTestId('1_mnitem');
        const mnitem2 = screen.getByTestId('2_mnitem');
        const mnitem3 = screen.queryByTestId('3_mnitem');
        const mnitem4 = screen.getByTestId('4_mnitem');

        expect(mnitem1).toBeNull();
        expect(mnitem2).toBeInTheDocument();
        expect(mnitem3).toBeNull();
        expect(mnitem4).toBeInTheDocument();
        expect(mnitem2).toBeVisible();
        expect(mnitem4).toBeVisible();

        act(() => userEvent.click(mnitem2));

        const li1 = screen.getByTestId('1_li')
        const li2 = screen.getByTestId('2_li')
        const li3 = screen.getByTestId('3_li')
        const li4 = screen.queryByTestId('4_li')
        const db1 = screen.getByTestId('location_detetebutton_1')
        const db2 = screen.getByTestId('location_detetebutton_2')
        const db3 = screen.getByTestId('location_detetebutton_3')
        const db4 = screen.queryByTestId('location_detetebutton_4')
        const p1 = screen.getByTestId('location_list_name_1')
        const p2 = screen.getByTestId('location_list_name_2')
        const p3 = screen.getByTestId('location_list_name_3')
        const p4 = screen.queryByTestId('location_list_name_4')

        expect(li1).toBeInTheDocument();
        expect(li2).toBeInTheDocument();
        expect(li3).toBeInTheDocument();
        expect(li4).toBeNull();
        expect(db1).toBeInTheDocument();
        expect(db2).toBeInTheDocument();
        expect(db3).toBeInTheDocument();
        expect(db4).toBeNull();
        expect(p1).toBeInTheDocument();
        expect(p2).toBeInTheDocument();
        expect(p3).toBeInTheDocument();
        expect(p4).toBeNull();

        act(() => userEvent.click(saveButton))
        
        await waitFor(() => expect(returnFunctionMock).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(routeCalls.API_addRoute).toHaveBeenCalledTimes(0));
        await waitFor(() => expect(routeCalls.API_updateRouteInfo).toHaveBeenCalledTimes(0));
        await waitFor(() => expect(routeCalls.API_addLocationToRoute).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(routeCalls.API_addLocationToRoute).toHaveBeenCalledWith(111, "2"));
        await waitFor(() => expect(routeCalls.API_deleteLocationFromRoute).toHaveBeenCalledTimes(0));
    })

    it ("Already stored places can be removed", async () => {
        render(
            <EditRouteInfo
                route = {{
                    id: 111,
                    name: "routeName",
                    description: "routeDescription",
                    locations: [{
                        id: "1",
                        categoria: "",
                        lat: 43.50441045903223,
                        lng: -5.840656204113697,
                        name: "NombreLugar1"
                    },{
                        id: "3",
                        categoria: "Parque",
                        lat: 43.56078698814968,
                        lng: -5.88975135792229,
                        name: "Name3Location"
                    }]
                }}
                returnFunction = {returnFunctionMock}
                userPlaces = {userPlaces}
                API_route_calls = {routeCalls}
            />
        );

        const saveButton = screen.getByTestId('save-button');

        expect(screen.getByTestId('1_li')).toBeInTheDocument();
        expect(screen.queryByTestId('2_li')).toBeNull();
        expect(screen.getByTestId('3_li')).toBeInTheDocument();
        expect(screen.queryByTestId('4_li')).toBeNull();
        expect(screen.getByTestId('location_detetebutton_1')).toBeInTheDocument();
        expect(screen.queryByTestId('location_detetebutton_2')).toBeNull();
        expect(screen.getByTestId('location_detetebutton_3')).toBeInTheDocument();
        expect(screen.queryByTestId('location_detetebutton_4')).toBeNull();
        expect(screen.getByTestId('location_list_name_1')).toBeInTheDocument();
        expect(screen.queryByTestId('location_list_name_2')).toBeNull();
        expect(screen.getByTestId('location_list_name_3')).toBeInTheDocument();
        expect(screen.queryByTestId('location_list_name_4')).toBeNull();

        const removeLocation = screen.getByTestId('location_detetebutton_3');
        act(() => userEvent.click(removeLocation));

        expect(screen.getByTestId('1_li')).toBeInTheDocument();
        expect(screen.queryByTestId('2_li')).toBeNull();
        expect(screen.queryByTestId('3_li')).toBeNull();
        expect(screen.queryByTestId('4_li')).toBeNull();
        expect(screen.getByTestId('location_detetebutton_1')).toBeInTheDocument();
        expect(screen.queryByTestId('location_detetebutton_2')).toBeNull();
        expect(screen.queryByTestId('location_detetebutton_3')).toBeNull();
        expect(screen.queryByTestId('location_detetebutton_4')).toBeNull();
        expect(screen.getByTestId('location_list_name_1')).toBeInTheDocument();
        expect(screen.queryByTestId('location_list_name_2')).toBeNull();
        expect(screen.queryByTestId('location_list_name_3')).toBeNull();
        expect(screen.queryByTestId('location_list_name_4')).toBeNull();
    
        act(() => userEvent.click(saveButton));
        await waitFor(() => expect(returnFunctionMock).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(routeCalls.API_addRoute).toHaveBeenCalledTimes(0));
        await waitFor(() => expect(routeCalls.API_updateRouteInfo).toHaveBeenCalledTimes(0));
        await waitFor(() => expect(routeCalls.API_addLocationToRoute).toHaveBeenCalledTimes(0));
        await waitFor(() => expect(routeCalls.API_deleteLocationFromRoute).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(routeCalls.API_deleteLocationFromRoute).toHaveBeenCalledWith(111, "3"));
    })

    it ("Just stored places can be removed", async () => {
        routeCalls.API_addRoute.mockResolvedValue(Promise.resolve({data: {id: 123456789}}));

        render(
            <EditRouteInfo
                route = {null}
                returnFunction = {returnFunctionMock}
                userPlaces = {userPlaces}
                API_route_calls = {routeCalls}
            />
        );

        const titleTextField = screen.getByTestId('text-field-title');
        const descriptionTextField = screen.getByTestId('text-field-description');

        fireEvent.change(titleTextField, {target: {value: "Título de la ruta"}});
        fireEvent.change(descriptionTextField, {target: {value: "Descripcion de la ruta"}});

        const addButton = screen.getByTestId('add-button');
        act(() => userEvent.click(addButton))

        const mnitem2 = screen.getByTestId('2_mnitem');
        expect(screen.queryByTestId('2_li')).toBeNull();
        expect(screen.queryByTestId('location_detetebutton_2')).toBeNull();
        expect(screen.queryByTestId('location_list_name_2')).toBeNull();

        act(() => userEvent.click(mnitem2))
        expect(screen.queryByTestId('2_li')).toBeInTheDocument();
        expect(screen.queryByTestId('location_detetebutton_2')).toBeInTheDocument();
        expect(screen.queryByTestId('location_list_name_2')).toBeInTheDocument();

        const delete_bt2 = screen.queryByTestId('location_detetebutton_2')
        act(() => userEvent.click(delete_bt2))
        expect(screen.queryByTestId('2_li')).toBeNull();
        expect(screen.queryByTestId('location_detetebutton_2')).toBeNull();
        expect(screen.queryByTestId('location_list_name_2')).toBeNull();

        act(() => userEvent.click(screen.getByTestId('save-button')))

        await waitFor(() => expect(returnFunctionMock).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(routeCalls.API_addRoute).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(routeCalls.API_addRoute).toHaveBeenCalledWith("Título de la ruta", "Descripcion de la ruta"));
        await waitFor(() => expect(routeCalls.API_updateRouteInfo).toHaveBeenCalledTimes(0));
        await waitFor(() => expect(routeCalls.API_addLocationToRoute).toHaveBeenCalledTimes(0));
        await waitFor(() => expect(routeCalls.API_deleteLocationFromRoute).toHaveBeenCalledTimes(0));
    })

    it ("Removed places can be re-added", async () => {
        render(
            <EditRouteInfo
                route = {{
                    id: 111,
                    name: "routeName",
                    description: "routeDescription",
                    locations: []
                }}
                returnFunction = {returnFunctionMock}
                userPlaces = {userPlaces}
                API_route_calls = {routeCalls}
            />
        );

        expect(screen.queryByTestId('1_li')).toBeNull();
        expect(screen.queryByTestId('2_li')).toBeNull();
        expect(screen.queryByTestId('3_li')).toBeNull();
        expect(screen.queryByTestId('4_li')).toBeNull();
        expect(screen.queryByTestId('location_detetebutton_1')).toBeNull();
        expect(screen.queryByTestId('location_detetebutton_2')).toBeNull();
        expect(screen.queryByTestId('location_detetebutton_3')).toBeNull();
        expect(screen.queryByTestId('location_detetebutton_4')).toBeNull();
        expect(screen.queryByTestId('location_list_name_1')).toBeNull();
        expect(screen.queryByTestId('location_list_name_2')).toBeNull();
        expect(screen.queryByTestId('location_list_name_3')).toBeNull();
        expect(screen.queryByTestId('location_list_name_4')).toBeNull();

        const addButton = screen.getByTestId('add-button');
        act(() => userEvent.click(addButton))

        const mnitem1 = screen.getByTestId('1_mnitem');
        const mnitem2 = screen.getByTestId('2_mnitem');
        const mnitem3 = screen.getByTestId('3_mnitem');
        const mnitem4 = screen.getByTestId('4_mnitem');

        // Add
        act(() => userEvent.click(mnitem3));

        expect(mnitem1).toBeInTheDocument();
        expect(mnitem2).toBeInTheDocument();
        expect(mnitem3).not.toBeInTheDocument();
        expect(mnitem4).toBeInTheDocument();
        expect(mnitem1).not.toBeVisible();
        expect(mnitem2).not.toBeVisible();
        expect(mnitem4).not.toBeVisible();

        expect(screen.queryByTestId('1_li')).toBeNull();
        expect(screen.queryByTestId('2_li')).toBeNull();
        expect(screen.queryByTestId('3_li')).toBeInTheDocument();
        expect(screen.queryByTestId('4_li')).toBeNull();
        expect(screen.queryByTestId('location_detetebutton_1')).toBeNull();
        expect(screen.queryByTestId('location_detetebutton_2')).toBeNull();
        expect(screen.queryByTestId('location_detetebutton_3')).toBeInTheDocument();
        expect(screen.queryByTestId('location_detetebutton_4')).toBeNull();
        expect(screen.queryByTestId('location_list_name_1')).toBeNull();
        expect(screen.queryByTestId('location_list_name_2')).toBeNull();
        expect(screen.queryByTestId('location_list_name_3')).toBeInTheDocument();
        expect(screen.queryByTestId('location_list_name_4')).toBeNull();

        // Remove
        act(() => userEvent.click(screen.getByTestId('location_detetebutton_3')));

        expect(screen.queryByTestId('1_li')).toBeNull();
        expect(screen.queryByTestId('2_li')).toBeNull();
        expect(screen.queryByTestId('3_li')).toBeNull();
        expect(screen.queryByTestId('4_li')).toBeNull();
        expect(screen.queryByTestId('location_detetebutton_1')).toBeNull();
        expect(screen.queryByTestId('location_detetebutton_2')).toBeNull();
        expect(screen.queryByTestId('location_detetebutton_3')).toBeNull();
        expect(screen.queryByTestId('location_detetebutton_4')).toBeNull();
        expect(screen.queryByTestId('location_list_name_1')).toBeNull();
        expect(screen.queryByTestId('location_list_name_2')).toBeNull();
        expect(screen.queryByTestId('location_list_name_3')).toBeNull();
        expect(screen.queryByTestId('location_list_name_4')).toBeNull();

        // Add
        act(() => userEvent.click(addButton))
        act(() => userEvent.click(screen.getByTestId('3_mnitem')));

        expect(screen.queryByTestId('1_mnitem')).toBeInTheDocument();
        expect(screen.queryByTestId('2_mnitem')).toBeInTheDocument();
        expect(screen.queryByTestId('3_mnitem')).not.toBeInTheDocument();
        expect(screen.queryByTestId('4_mnitem')).toBeInTheDocument();
        expect(screen.queryByTestId('1_mnitem')).not.toBeVisible();
        expect(screen.queryByTestId('2_mnitem')).not.toBeVisible();
        expect(screen.queryByTestId('4_mnitem')).not.toBeVisible();

        expect(screen.queryByTestId('1_li')).toBeNull();
        expect(screen.queryByTestId('2_li')).toBeNull();
        expect(screen.queryByTestId('3_li')).toBeInTheDocument();
        expect(screen.queryByTestId('4_li')).toBeNull();
        expect(screen.queryByTestId('location_detetebutton_1')).toBeNull();
        expect(screen.queryByTestId('location_detetebutton_2')).toBeNull();
        expect(screen.queryByTestId('location_detetebutton_3')).toBeInTheDocument();
        expect(screen.queryByTestId('location_detetebutton_4')).toBeNull();
        expect(screen.queryByTestId('location_list_name_1')).toBeNull();
        expect(screen.queryByTestId('location_list_name_2')).toBeNull();
        expect(screen.queryByTestId('location_list_name_3')).toBeInTheDocument();
        expect(screen.queryByTestId('location_list_name_4')).toBeNull();

        act(() => userEvent.click(screen.getByTestId('save-button')));
        await waitFor(() => expect(returnFunctionMock).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(routeCalls.API_addRoute).toHaveBeenCalledTimes(0));
        await waitFor(() => expect(routeCalls.API_updateRouteInfo).toHaveBeenCalledTimes(0));
        await waitFor(() => expect(routeCalls.API_addLocationToRoute).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(routeCalls.API_addLocationToRoute).toHaveBeenCalledWith(111, "3"));
        await waitFor(() => expect(routeCalls.API_deleteLocationFromRoute).toHaveBeenCalledTimes(0));
    })

    it ("Menu is hidden when ESC key is clicked", async () => {
        render(
            <EditRouteInfo
                route = {{
                    id: 111,
                    name: "routeName",
                    description: "routeDescription",
                    locations: [{
                        id: "1",
                        categoria: "",
                        lat: 43.50441045903223,
                        lng: -5.840656204113697,
                        name: "NombreLugar1"
                    },{
                        id: "3",
                        categoria: "Parque",
                        lat: 43.56078698814968,
                        lng: -5.88975135792229,
                        name: "Name3Location"
                    }]
                }}
                returnFunction = {returnFunctionMock}
                userPlaces = {userPlaces}
                API_route_calls = {routeCalls}
            />
        );

        const addButton = screen.getByTestId('add-button');
        act(() => userEvent.click(addButton))

        const mnitem2 = screen.getByTestId('2_mnitem');
        expect(mnitem2).toBeInTheDocument();
        expect(mnitem2).toBeVisible();

        act(() => userEvent.keyboard('{esc}'));

        expect(mnitem2).toBeInTheDocument();
        expect(mnitem2).not.toBeVisible();

        act(() => userEvent.click(screen.getByTestId('save-button')));
        await waitFor(() => expect(returnFunctionMock).toHaveBeenCalledTimes(1));
        await waitFor(() => expect(routeCalls.API_addRoute).toHaveBeenCalledTimes(0));
        await waitFor(() => expect(routeCalls.API_updateRouteInfo).toHaveBeenCalledTimes(0));
        await waitFor(() => expect(routeCalls.API_addLocationToRoute).toHaveBeenCalledTimes(0));
        await waitFor(() => expect(routeCalls.API_deleteLocationFromRoute).toHaveBeenCalledTimes(0));
    })
})

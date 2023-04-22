import React from "react";
import { render, screen } from "@testing-library/react";
import RutasTabContent from "./RutasTabContent";
import i18next from "i18next";
import global_es from '../translations/es/global.json';
import { I18nextProvider } from "react-i18next";

const route_empty = {
    id: "route01",
    author: "https://id.inrupt.com/uo276818",
    name: "Empty route",
    description: "Description for empty route",
    locations: []
}
const route_not_empty = {
    id: "route02",
    author: "https://id.inrupt.com/uo276818",
    name: "Non empty route",
    description: "Description for non-empty route",
    locations: ["location01"]
}
const route_all_places = {
    id: "route03",
    author: "https://id.inrupt.com/uo276818",
    name: "Route with all places",
    description: "Description route containing all the existing places",
    locations: ["location01", "location02", "location03"]
}
const userPlaces = [
    {
        id: "location01",
        name: "Lugar01",
    },
    {
        id: "location02",
        name: "Lugar02",
    },
    {
        id: "location03",
        name: "Lugar03",
    }
]

i18next.init({
	interpolation: { escapeValue: false },
	lng: "es",
	resources: {es: { global: global_es}},
});

describe('RutasTabContent', () => {
    it ('No rutes, displays nothing', () => {
        render(
            <I18nextProvider i18n={i18next}>
            <RutasTabContent
                rutas = {[]}
                userPlaces = {[]}
            />
            </I18nextProvider>
        );
        
        expect(screen.getByTestId("routes_title")).toBeInTheDocument()
        expect(screen.queryAllByTestId(/^route_card_route/)).toHaveLength(0);
    })

    it ('One route', () => {
        render(
            <I18nextProvider i18n={i18next}>
            <RutasTabContent
                rutas = {[route_empty]}
                userPlaces = {[userPlaces]}
            />
            </I18nextProvider>
        );

        expect(screen.getByTestId("routes_title")).toBeInTheDocument()
        expect(screen.queryAllByTestId(/^route_card_route/)).toHaveLength(1);
    })

    it ('Multiple routes', () => {
        render(
            <I18nextProvider i18n={i18next}>
            <RutasTabContent
                rutas = {[route_empty, route_not_empty, route_all_places]}
                userPlaces = {[userPlaces]}
            />
            </I18nextProvider>
        );

        expect(screen.getByTestId("routes_title")).toBeInTheDocument()
        expect(screen.queryAllByTestId(/^route_card_route/)).toHaveLength(3);
    })
})
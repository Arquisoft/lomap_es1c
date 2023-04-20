import React from "react";
import { render, screen } from "@testing-library/react";
import RutaCard from "./RutaCard";
import userEvent from "@testing-library/user-event";
import { act } from "react-dom/test-utils";

const route_empty = {
    id: "route01",
    author: "https://id.inrupt.com/uo276818",
    name: "Empty route",
    description: "Description for empty route",
    locations: []
}

const changeDrawerContentMock = jest.fn()

describe('RutaCard', () => {
    it ('Route renders correctly', () => {
        render(
            <RutaCard
                key={"card_key_01"}
                route = {route_empty}
                changeDrawerContent = {changeDrawerContentMock}
            />
        )

        expect(screen.getByTestId("route_card_title_text_route01")).toBeInTheDocument();
        expect(screen.getByTestId("route_card_description_text_route01")).toBeInTheDocument();
        expect(changeDrawerContentMock).toHaveBeenCalledTimes(0)
    })

    it ('Click on full screen icon', () => {
        render(
            <RutaCard
                key={"card_key_01"}
                route = {route_empty}
                changeDrawerContent = {changeDrawerContentMock}
            />
        )

        const fullScreenButton = screen.getByTestId("full_screen_button_route01")
        act(() => {userEvent.click(fullScreenButton)})
        expect(changeDrawerContentMock).toHaveBeenCalledTimes(1)
    })
})
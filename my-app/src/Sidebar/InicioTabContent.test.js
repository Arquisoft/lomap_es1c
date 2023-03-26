import { render } from "@testing-library/react";
import InicioTabContent from "./InicioTabContent";

describe(InicioTabContent, () => {
    it("Search bar is empty when there are no places to show", () => {
        const {getByPlaceholderText } = render(<InicioTabContent userPlaces={[]}/>);
        const searchBar = getByPlaceholderText ("Buscar");
        expect(searchBar.textContent).toEqual("");
    })

    it("Search bar is empty when there are places to show", () => {
        const {getByPlaceholderText } = render(<InicioTabContent userPlaces={[
            {key:1, name: "nombre1",},
            {key:2, name: "nombre2"},
        ]}/>);
        const searchBar = getByPlaceholderText ("Buscar");
        expect(searchBar.textContent).toEqual("");
    })
})
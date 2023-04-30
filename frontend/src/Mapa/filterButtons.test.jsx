import * as React from 'react';
import { fireEvent, render, screen } from "@testing-library/react";
import global_es from '../translations/es/global.json';
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { ThemeContext } from '../contexts/ThemeContext';
import { Themes } from "../contexts/ThemeContext";
import FilterButtons from "./filterButtons"

i18next.init({
	interpolation: { escapeValue: false },
	lng: "es",
	resources: {es: { global: global_es}},
});

const setCategoriasFiltereMok = jest.fn();
const setFriendsFilterMok = jest.fn();
const setOnlyMineFilterMok = jest.fn();
const categoriasMok = ["Restaurante","Parque"]

describe('BasicFuntionality',() => {
	it("Renders coorectly",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <FilterButtons 
                      setCategortFiltered={setCategoriasFiltereMok}
                      categorias = {categoriasMok}
                      setFriendsFilter={setFriendsFilterMok}
                      setOnlyMineFilter={setOnlyMineFilterMok}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)

    const resetFilters = screen.getByTestId("resetFilters");
    const handleClickOnlyMine = screen.getByTestId("handleClickOnlyMine");
    const handleClickFriends = screen.getByTestId("handleClickFriends");
    const categoryDisplay = screen.getByTestId("categoryDisplay");

    expect(resetFilters).toBeInTheDocument();
    expect(handleClickOnlyMine).toBeInTheDocument();
    expect(handleClickFriends).toBeInTheDocument();
    expect(categoryDisplay).toBeInTheDocument();

    fireEvent.click(resetFilters);

    expect(setCategoriasFiltereMok).toHaveBeenCalledTimes(1);
    expect(setFriendsFilterMok).toHaveBeenCalledTimes(1);
    expect(setOnlyMineFilterMok).toHaveBeenCalledTimes(1);

    fireEvent.click(handleClickOnlyMine);

    expect(setCategoriasFiltereMok).toHaveBeenCalledTimes(1);
    expect(setFriendsFilterMok).toHaveBeenCalledTimes(2);
    expect(setOnlyMineFilterMok).toHaveBeenCalledTimes(2);

    fireEvent.click(handleClickFriends);

    expect(setCategoriasFiltereMok).toHaveBeenCalledTimes(1);
    expect(setFriendsFilterMok).toHaveBeenCalledTimes(3);
    expect(setOnlyMineFilterMok).toHaveBeenCalledTimes(3);

    fireEvent.click(categoryDisplay);

    const menu = screen.getByTestId("menu");
    const allCategory = screen.getByTestId("todas");
    const sinCategory = screen.getByTestId("sinCategoria");
    const firstCategory = screen.getByTestId("category0");
    const secondCategory = screen.getByTestId("category1");

    expect(menu).toBeInTheDocument();
    expect(allCategory).toBeInTheDocument();
    expect(sinCategory).toBeInTheDocument();
    expect(firstCategory).toBeInTheDocument();
    expect(secondCategory).toBeInTheDocument();

    fireEvent.click(allCategory);

    expect(setCategoriasFiltereMok).toHaveBeenCalledTimes(2);
    expect(setFriendsFilterMok).toHaveBeenCalledTimes(3);
    expect(setOnlyMineFilterMok).toHaveBeenCalledTimes(3);

    fireEvent.click(sinCategory);

    expect(setCategoriasFiltereMok).toHaveBeenCalledTimes(3);
    expect(setFriendsFilterMok).toHaveBeenCalledTimes(3);
    expect(setOnlyMineFilterMok).toHaveBeenCalledTimes(3);

    fireEvent.click(firstCategory);

    expect(setCategoriasFiltereMok).toHaveBeenCalledTimes(4);
    expect(setFriendsFilterMok).toHaveBeenCalledTimes(3);
    expect(setOnlyMineFilterMok).toHaveBeenCalledTimes(3);

    fireEvent.click(secondCategory);

    expect(setCategoriasFiltereMok).toHaveBeenCalledTimes(5);
    expect(setFriendsFilterMok).toHaveBeenCalledTimes(3);
    expect(setOnlyMineFilterMok).toHaveBeenCalledTimes(3);

  })

})
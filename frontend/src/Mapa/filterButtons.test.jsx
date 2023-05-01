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

const setCategoriasFiltereMock = jest.fn();
const setFriendsFilterMock = jest.fn();
const setOnlyMineFilterMock = jest.fn();
const categoriasMock = ["Restaurante","Parque"]

describe('BasicFuntionality',() => {
	it("Renders coorectly",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <FilterButtons 
                      setCategortFiltered={setCategoriasFiltereMock}
                      categorias = {categoriasMock}
                      setFriendsFilter={setFriendsFilterMock}
                      setOnlyMineFilter={setOnlyMineFilterMock}
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

    expect(setCategoriasFiltereMock).toHaveBeenCalledTimes(1);
    expect(setFriendsFilterMock).toHaveBeenCalledTimes(1);
    expect(setOnlyMineFilterMock).toHaveBeenCalledTimes(1);

    fireEvent.click(handleClickOnlyMine);

    expect(setCategoriasFiltereMock).toHaveBeenCalledTimes(1);
    expect(setFriendsFilterMock).toHaveBeenCalledTimes(2);
    expect(setOnlyMineFilterMock).toHaveBeenCalledTimes(2);

    fireEvent.click(handleClickFriends);

    expect(setCategoriasFiltereMock).toHaveBeenCalledTimes(1);
    expect(setFriendsFilterMock).toHaveBeenCalledTimes(3);
    expect(setOnlyMineFilterMock).toHaveBeenCalledTimes(3);

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

    expect(setCategoriasFiltereMock).toHaveBeenCalledTimes(2);
    expect(setFriendsFilterMock).toHaveBeenCalledTimes(3);
    expect(setOnlyMineFilterMock).toHaveBeenCalledTimes(3);

    fireEvent.click(sinCategory);

    expect(setCategoriasFiltereMock).toHaveBeenCalledTimes(3);
    expect(setFriendsFilterMock).toHaveBeenCalledTimes(3);
    expect(setOnlyMineFilterMock).toHaveBeenCalledTimes(3);

    fireEvent.click(firstCategory);

    expect(setCategoriasFiltereMock).toHaveBeenCalledTimes(4);
    expect(setFriendsFilterMock).toHaveBeenCalledTimes(3);
    expect(setOnlyMineFilterMock).toHaveBeenCalledTimes(3);

    fireEvent.click(secondCategory);

    expect(setCategoriasFiltereMock).toHaveBeenCalledTimes(5);
    expect(setFriendsFilterMock).toHaveBeenCalledTimes(3);
    expect(setOnlyMineFilterMock).toHaveBeenCalledTimes(3);

  })

})
import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import global_es from '../../translations/es/global.json';
import i18next from "i18next";
import { I18nextProvider } from "react-i18next";
import { ThemeContext } from '../../contexts/ThemeContext';
import { Themes } from "../../contexts/ThemeContext";
import FullInfoPlace from "./FullInfoPlace";

i18next.init({
	interpolation: { escapeValue: false },
	lng: "es",
	resources: {es: { global: global_es}},
});

const placeRevMock1 = {
    id : "1",
    author: "PruebaAuthor",
	name: "Prueba",
	latitude: 0,
	longitude: 0,
	category: "Prueba",
	reviews: [{
        author:"PruebaAuthor",
        rating:2
    }],
	comment: "Prueba Comentario",
	photo:"",
	privacy: "",
}

const placeRevMock2 = {
    id : "1",
    author: "PruebaAuthor",
	name: "Prueba",
	latitude: 0,
	longitude: 0,
	category: "Prueba",
	reviews: [{
        author:"PruebaAuthor",
        rating:2
    }],
	comment: "Prueba Comentario",
	photo:"",
	privacy: "",
}

const placeMock = {
    id : "1",
    author: "PruebaAuthor",
	name: "Prueba",
	latitude: 0,
	longitude: 0,
	category: "Prueba",
	reviews: [],
	comment: "Prueba Comentario",
	photos:[{
        imageJPG:"Buenas",
        author:"PruebaAuthor"
    }],
	privacy: "",
}

const placeFriendMock = {
    id : "1",
    author: "PruebaAuthor2",
	name: "Prueba",
	latitude: 0,
	longitude: 0,
	category: "Prueba",
	reviews: [{
        author:"PruebaAuthor2",
        rating:2
    }],
	comment: "Prueba Comentario",
	photo:"",
	privacy: "",
}

const categoriasMock = ["Restaurante","Parque"]
const API_location_callsMock = {
	API_createLocation: jest.fn(),
    API_updateLocation: jest.fn(),
    API_deleteLocation: jest.fn(),
    API_addReview: jest.fn(),
    API_updateReview: jest.fn(),
    API_removeReview: jest.fn(),
    API_addPhoto: jest.fn(),
    API_removePhoto: jest.fn()
};
const changeDrawerContentMock =  jest.fn();
const setPositionMock =  jest.fn();

describe('BasicLogin',() => {
	it("Renders coorectly",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <FullInfoPlace
						place = {placeMock}
                        setPosition = {setPositionMock}
                        changeDrawerContent = {changeDrawerContentMock}
                        categorias = {categoriasMock}
                        API_location_calls = {API_location_callsMock}
                        loggedInUserwebId = {"PruebaAuthor"}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)

        const arrow = screen.getByTestId('arrow')
        expect(arrow).toBeInTheDocument();
        fireEvent.click(arrow);

        const center = screen.getByTestId('center')
        expect(center).toBeInTheDocument();
        fireEvent.click(center);

        const edit = screen.getByTestId('edit')
        expect(edit).toBeInTheDocument();
        fireEvent.click(edit);

        const createNewReview = screen.getByTestId('createNewReview')
        expect(createNewReview).toBeInTheDocument();
        fireEvent.click(createNewReview);

        const commInput = screen.getByPlaceholderText('Comentario')
        expect(commInput).toBeInTheDocument();
    
        fireEvent.change(commInput,{target: { value: "Changed Value" }});
        const nameInputChange = screen.getByDisplayValue('Changed Value')
        expect(nameInputChange).toBeInTheDocument();

        const saveReview = screen.getByTestId('saveReview')
        expect(saveReview).toBeInTheDocument();
        fireEvent.click(saveReview);

        fireEvent.click(createNewReview);
        const cancelReview = screen.getByTestId('cancelReview')
        expect(cancelReview).toBeInTheDocument();
        fireEvent.click(cancelReview);

        const addPhoto = screen.getByTestId('addPhoto')
        expect(addPhoto).toBeInTheDocument();
        fireEvent.click(addPhoto);

        const file = screen.getByTestId('file')
        expect(file).toBeInTheDocument();
        fireEvent.click(file);

        const testImageFile = new File(["hello"], "hello.png", { type: "image/png" });
        fireEvent.change(file, {
            target: { files: [testImageFile] },
          });

        const deletePhoto = screen.getByTestId('deletePhoto')
        expect(deletePhoto).toBeInTheDocument();
        fireEvent.click(deletePhoto);

        const deletePlace = screen.getByTestId('deletePlace')
        expect(deletePlace).toBeInTheDocument();
        fireEvent.click(deletePlace);

	});

    it("Cancel review correctly",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <FullInfoPlace
						place = {placeMock}
                        setPosition = {setPositionMock}
                        changeDrawerContent = {changeDrawerContentMock}
                        categorias = {categoriasMock}
                        API_location_calls = {API_location_callsMock}
                        loggedInUserwebId = {"PruebaAuthor"}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)

        const arrow = screen.getByTestId('arrow')
        expect(arrow).toBeInTheDocument();
        fireEvent.click(arrow);

        const createNewReview = screen.getByTestId('createNewReview')
        expect(createNewReview).toBeInTheDocument();
        fireEvent.click(createNewReview);

        const cancelReview = screen.getByTestId('cancelReview')
        expect(cancelReview).toBeInTheDocument();
        fireEvent.click(cancelReview);

	});

    it("Cance review correctly with review",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <FullInfoPlace
						place = {placeRevMock1}
                        setPosition = {setPositionMock}
                        changeDrawerContent = {changeDrawerContentMock}
                        categorias = {categoriasMock}
                        API_location_calls = {API_location_callsMock}
                        loggedInUserwebId = {"PruebaAuthor"}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)

        const arrow = screen.getByTestId('arrow')
        expect(arrow).toBeInTheDocument();
        fireEvent.click(arrow);

        const createNewReview = screen.getByTestId('createReview')
        expect(createNewReview).toBeInTheDocument();
        fireEvent.click(createNewReview);

        const cancelReview = screen.getByTestId('cancelReview')
        expect(cancelReview).toBeInTheDocument();
        fireEvent.click(cancelReview);

	});

    it("With Review Delete",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <FullInfoPlace
						place = {placeRevMock1}
                        setPosition = {setPositionMock}
                        changeDrawerContent = {changeDrawerContentMock}
                        categorias = {categoriasMock}
                        API_location_calls = {API_location_callsMock}
                        loggedInUserwebId = {"PruebaAuthor"}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)

        const arrow = screen.getByTestId('arrow')
        expect(arrow).toBeInTheDocument();
        fireEvent.click(arrow);

        const center = screen.getByTestId('center')
        expect(center).toBeInTheDocument();
        fireEvent.click(center);

        const edit = screen.getByTestId('edit')
        expect(edit).toBeInTheDocument();
        fireEvent.click(edit);

        const deleteReview = screen.getByTestId('deleteReview')
        expect(deleteReview).toBeInTheDocument();
        fireEvent.click(deleteReview);

        const createReview = screen.getByTestId('createReview')
        expect(createReview).toBeInTheDocument();
        fireEvent.click(createReview);

	});

    it("With Review",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <FullInfoPlace
						place = {placeRevMock2}
                        setPosition = {setPositionMock}
                        changeDrawerContent = {changeDrawerContentMock}
                        categorias = {categoriasMock}
                        API_location_calls = {API_location_callsMock}
                        loggedInUserwebId = {"PruebaAuthor"}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)

        const arrow = screen.getByTestId('arrow')
        expect(arrow).toBeInTheDocument();
        fireEvent.click(arrow);

        const center = screen.getByTestId('center')
        expect(center).toBeInTheDocument();
        fireEvent.click(center);

        const edit = screen.getByTestId('edit')
        expect(edit).toBeInTheDocument();
        fireEvent.click(edit);

        const createReview = screen.getByTestId('createReview')
        expect(createReview).toBeInTheDocument();
        fireEvent.click(createReview);

        const saveReview = screen.getByTestId('saveReview')
        expect(saveReview).toBeInTheDocument();
        fireEvent.click(saveReview);

	});

    it("With Friend Review",() => {
		render(
			<I18nextProvider i18n={i18next}>
                <ThemeContext.Provider value={{ currentTheme: Themes.LIGHT }}>
                    <FullInfoPlace
						place = {placeFriendMock}
                        setPosition = {setPositionMock}
                        changeDrawerContent = {changeDrawerContentMock}
                        categorias = {categoriasMock}
                        API_location_calls = {API_location_callsMock}
                        loggedInUserwebId = {"PruebaAuthor"}
                    />
                </ThemeContext.Provider>
            </I18nextProvider>
		)

        const arrow = screen.getByTestId('arrow')
        expect(arrow).toBeInTheDocument();
        fireEvent.click(arrow);

        const center = screen.getByTestId('center')
        expect(center).toBeInTheDocument();
        fireEvent.click(center);

        const createNewReview = screen.getByTestId('createNewReview')
        expect(createNewReview).toBeInTheDocument();
        fireEvent.click(createNewReview);

        const saveReview = screen.getByTestId('saveReview')
        expect(saveReview).toBeInTheDocument();
        fireEvent.click(saveReview);

        const cancelReview = screen.getByTestId('cancelReview')
        expect(cancelReview).toBeInTheDocument();
        fireEvent.click(cancelReview);

	});

})
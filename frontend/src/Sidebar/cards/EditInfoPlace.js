import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { IconButton } from "@mui/material";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";

export default function FullInfoPlace({
	place,
	categorias,
	API_location_calls,
	returnTo,
	changeDrawerContent,
}) {
	// TODO: settear correctamente la variable
	const isUserPlace = true;

	const [loading, setLoading] = useState(false);
	const [name, setName] = useState(place === null ? "" : place.name);
	const [isNameTextFieldErrored, setIsNameTextFieldErrored] = useState(false);

	// TODO: default category
	const [category, setCategory] = useState(
		place === null ? "" : place.category
	);

	const [t] = useTranslation("global");

	function returnFunction() {
		changeDrawerContent(returnTo);
	}

	async function save() {
		setLoading(true);

		var thePlaceID;

		if (place === null) {
			thePlaceID = await API_location_calls.API_createLocation();
			// TODO: actualizar el ID del lugar
		} else {
			if (isUserPlace) {
				if (name !== place.name || category !== place.category) {
					const location = {
						name: name,
						category: category,
					};
					await API_location_calls.API_updateLocation(place.id, location);
				}
			}
		}

		setLoading(false);
		returnFunction();
	}

	const categoriesToList = ["", ...categorias];
	if (!categoriesToList.includes(place.category)) {
		categoriesToList.push(place.category);
	}

	function handleNameChange(event) {
		setName(event.target.value);
		setIsNameTextFieldErrored(event.target.value.trim().length <= 0);
	}

	function handleCategoryChange(event) {
		setCategory(event.target.value);
	}

	return (
		<>
			{/* Botón para volver atrás */}
			<IconButton onClick={returnFunction}>
				<ArrowBackIcon />
			</IconButton>
			<br></br>

			{/* Nombre */}
			{isUserPlace ? (
				<TextField
					disabled={loading}
					required
					error={isNameTextFieldErrored}
					label={t("sidebar.place.name")}
					defaultValue={name}
					onChange={handleNameChange}
					helperText={
						isNameTextFieldErrored ? "El nombre no puede estar vacío" : ""
					}
					margin="normal"
				/>
			) : (
				<h1>{name}</h1>
			)}

			<br></br>

			{/* Categoria */}
			{isUserPlace ? (
				<Select
					disabled={loading}
					defaultValue={place.category.toLowerCase()}
					label="Categoria"
					onChange={handleCategoryChange}
				>
					{categoriesToList.map((categoria) => (
						<MenuItem
							key={categoria.toLowerCase()}
							sx={{ height: "35px" }}
							value={categoria.toLowerCase()}
						>
							{categoria === "" ? <em>Sin categoria</em> : categoria}
						</MenuItem>
					))}
				</Select>
			) : (
				<p>{place.category}</p>
			)}
			<br></br>

			<hr></hr>
			{/* Botón de guardar */}
			<LoadingButton
				disabled={isNameTextFieldErrored}
				color="secondary"
				onClick={save}
				loading={loading}
				loadingPosition="start"
				startIcon={<SaveIcon />}
				variant="contained"
			>
				{/* TODO: cambiar el texto */}
				<span>Save</span>
			</LoadingButton>
		</>
	);
}

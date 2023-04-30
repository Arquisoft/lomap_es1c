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
	const isUserPlace = true;

	const [loading, setLoading] = useState(false);
	const [name, setName] = useState(place === null ? "" : place.name);
	const [isNameTextFieldErrored, setIsNameTextFieldErrored] = useState(false);

	const [category, setCategory] = useState(
		place === null ? "" : place.category
	);

	const [t] = useTranslation("global");

	function returnFunction() {
		changeDrawerContent(returnTo);
	}

	async function save() {
		setLoading(true);

		if (place === null) {
			await API_location_calls.API_createLocation();
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
		changeDrawerContent(null);
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
				<ArrowBackIcon data-testid="arrow"/>
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
						isNameTextFieldErrored ? t("sidebar.place.namecannotbeempty") : ""
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
					label={t("sidebar.place.category")}
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
				data-testid="saveBtn"
			>
				<span>{t("sidebar.place.save")}</span>
			</LoadingButton>
		</>
	);
}

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { IconButton } from "@mui/material";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";

// TODO eliminar datos hardcodeados
const images = [
	{
		label: "San Francisco – Oakland Bay Bridge, United States",
		imgPath:
			"https://images.unsplash.com/photo-1537944434965-cf4679d1a598?auto=format&fit=crop&w=400&h=250&q=60",
	},
	{
		label: "Bird",
		imgPath:
			"https://images.unsplash.com/photo-1538032746644-0212e812a9e7?auto=format&fit=crop&w=400&h=250&q=60",
	},
	{
		label: "Bali, Indonesia",
		imgPath:
			"https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&w=400&h=250",
	},
	{
		label: "Goč, Serbia",
		imgPath:
			"https://images.unsplash.com/photo-1512341689857-198e7e2f3ca8?auto=format&fit=crop&w=400&h=250&q=60",
	},
	{
		label: "Goč, Serbia",
		imgPath:
			"https://external-preview.redd.it/s6GPQfLEwj9-i-EQcfuQb8JBqRV3E8h1iJ0hCTzYOzE.jpg?auto=webp&v=enabled&s=46f24037b6c6c992cb02f15f8a5e607da97b06e2",
	},
	{
		label: "Goč, Serbia",
		imgPath:
			"https://blog.foto24.com/wp-content/uploads/2019/02/6-fotografia-de-Alejandro-Rodriguez-683x1024.jpg",
	},
];

export default function FullInfoPlace({
	place,
	returnFunction,
	categorias,
	API_location_calls,
}) {
	const [loading, setLoading] = useState(false);
	const [name, setName] = useState(place.name);
	const [category, setCategory] = useState(place.categoria);
	const [privacy, setPrivacy] = useState(place.privacidad);

	const [t] = useTranslation("global");
	const nivelesPrivacidad = ["Publico", "Solo Amigos", "Privado"];

	async function save() {
		setLoading(true);
		if (
			place.name != name ||
			place.categoria != category ||
			place.privacidad != privacy
		) {
			await API_location_calls.API_updateLocation(
				place.id,
				name,
				category,
				privacy
			);
			setLoading(false);
		}
		returnFunction();
	}

	const categoriesToList = ["", ...categorias];
	if (!categoriesToList.includes(place.categoria)) {
		categoriesToList.push(place.categoria);
	}

	function addImage() {
		// TODO: implementar y conectar a la API
		console.log("añadir imagen: pendiente");
	}

	function deleteImage() {}

	function handleNameChange(event) {
		setName(event.target.value);
	}

	function handleCategoryChange(event) {
		setCategory(event.target.value);
	}

	function handlePrivacyChange(event) {
		setPrivacy(event.target.value);
	}

	return (
		<>
			<IconButton onClick={returnFunction}>
				<ArrowBackIcon />
			</IconButton>
			<br></br>
			<TextField
				label="Nombre"
				defaultValue={place.name}
				onChange={handleNameChange}
			/>

			<Rating value={place.valoracion} />

			<br></br>

			<Select
				defaultValue={
					place.privacidad
						? place.privacidad.toLowerCase()
						: nivelesPrivacidad[0].toLowerCase()
				}
				onChange={handlePrivacyChange}
			>
				{nivelesPrivacidad.map(
					(nivel) => (<MenuItem key={nivel.toLowerCase()} value={nivel.toLowerCase()}>{nivel}</MenuItem>))
				}
			</Select>

			<br></br>

			<Select
				defaultValue={place.categoria.toLowerCase()}
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

			<br></br>

			<TextField label="Comentario" value={place.comentario} />

			<h3>Fotos:</h3>
			<Swiper
				pagination={{ type: "fraction" }}
				navigation={true}
				modules={[Pagination, Navigation]}
			>
				{/* TODO: reemplazar por las imágenes del lugar */}
				{images.map((i) => (
					<SwiperSlide key={i.imgPath + "slide"}>
						<img src={i.imgPath} />
					</SwiperSlide>
				))}
				<SwiperSlide>
					<Button onClick={addImage}>Añadir imagen</Button>
				</SwiperSlide>
			</Swiper>

			<br></br>

			<LoadingButton
				color="secondary"
				onClick={save}
				loading={loading}
				loadingPosition="start"
				startIcon={<SaveIcon />}
				variant="contained"
			>
				<span>Save</span>
			</LoadingButton>
		</>
	);
}

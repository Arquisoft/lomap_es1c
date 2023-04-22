import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import SaveIcon from "@mui/icons-material/Save";
import LoadingButton from "@mui/lab/LoadingButton";
import { IconButton } from "@mui/material";
import Button from '@mui/material/Button';
import MenuItem from "@mui/material/MenuItem";
import Rating from "@mui/material/Rating";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import DeleteIcon from '@mui/icons-material/Delete';


export default function FullInfoPlace({
	place,
	returnFunction,
	categorias,
	API_location_calls,	
}) {
	// TODO: settear correctamente la variable
	const isUserPlace = true

	const [loading, setLoading] = useState(false);
	const [name, setName] = useState(place === null ? "" : place.name);
	const [isNameTextFieldErrored, setIsNameTextFieldErrored] = useState(false);

	// TODO: default category
	const [category, setCategory] = useState(place === null ? "" : place.category);

	// TODO: coger la review adecuada
	const [rating, setRating] = useState(place?.review?.rating ? place.review?.rating/2 : null);
	// TODO: coger la review adecuada
	const [comment, setComment] = useState(place?.review?.comment ? place.review?.comment : "");
	const [review, setReview] = useState(rating||comment ? {rating: rating, comment: comment} : null);
	
	// TODO: seleccionar las imágenes adecuadas
	const [photosURLs, setPhotosURLs] = useState(place?.images ? place?.images.filter(photo => photo.webID==="aaa") : [] )

	const [t] = useTranslation("global");

	const [imageCommands, setImageCommands] = useState([])
	const [reviewCommand, setReviewCommand] = useState(null)


	async function save() {
		setLoading(true);

		var thePlaceID;

		if (place === null) {
			thePlaceID = await API_location_calls.API_createLocation()
			// TODO: actualizar el ID del lugar
		} else {
			if (isUserPlace) {
				if (name!==place.name  ||  category!==place.category) {
					await API_location_calls.API_updateLocation()
				}
			}
		}

		// Ejecutar el comando adecuado para la review
		if (reviewCommand)
			reviewCommand()

		// Si se añaden/borran fotos, hacer
		for (var command of imageCommands) {
			command.f(thePlaceID)
		}

		setLoading(false);
		returnFunction();
	}

	const categoriesToList = ["", ...categorias];
	if (!categoriesToList.includes(place.category)) {
		categoriesToList.push(place.category);
	}

	function addImage(event) {
		const file = event.target.files[0]
		console.log(file)
		const reader = new FileReader();
		reader.readAsDataURL(file)

		reader.onloadend = () => {
			if (!photosURLs.includes(reader.result)) {
				setPhotosURLs(current => [...current, reader.result])
			}
		}
		setImageCommands(current => [...current, {url: reader.result, f: (placeID) => {console.log("añadir API PENDIENTE ")}}])
	}

	function deleteImage(url) {
		const isNewImage = imageCommands.some(imageCommand => imageCommand.url===url)
		if (isNewImage) {
			setImageCommands(current => current.filter(imageCommand => imageCommand.url!==url))
		} else {
			setImageCommands(current => [...current, {f: (placeID) => {console.log("BORRAR API PENDIENTE")}}])
		}
		setPhotosURLs(current => current.filter(photoURL => photoURL!==url))
	}

	function handleNameChange(event) {
		setName(event.target.value);
		setIsNameTextFieldErrored(event.target.value.trim().length <= 0)
	}

	function handleCategoryChange(event) {
		setCategory(event.target.value);
	}

	function createNewReview() {
		setReview({rating: rating, comment: comment})
		// TODO cambiar condicion
		if (true) {
			console.log("CAMBIAR CONDICION")
			// Create a new review
			const newReviewCommand = (placeID) => API_location_calls.API_addReview()
			setReviewCommand(newReviewCommand)
		} else {
			// Update existing review
			const newReviewCommand = (placeID) => API_location_calls.API_updateReview()
			setReviewCommand(newReviewCommand)
		}
	}

	function deleteReview() {
		// TODO cambiar condicion
		if (true) {
			console.log("CAMBIAR CONDICION")
			// Delete already existing review
			const newReviewCommand = (placeID) => API_location_calls.API_removeReview()
			setReviewCommand(newReviewCommand)
		} else {
			// Remove new review
			setReviewCommand(null)
		}
		setRating(null)
		setComment("")
		setReview(null)
	}

	function handleRatingChange(event) {
		setRating(parseFloat(event.target.value));
	}

	function handleCommentChange(event) {
		setComment(event.target.value);
	}

	return (
		<>
			{/* Botón para volver atrás */}
			<IconButton onClick={returnFunction}>
				<ArrowBackIcon />
			</IconButton>
			<br></br>

			{/* Nombre */}
			{isUserPlace ?
				<TextField
					disabled={loading}
					required
					error = {isNameTextFieldErrored}
					label = {t("sidebar.place.name")}
					defaultValue = {name}
					onChange = {handleNameChange}
					helperText = {isNameTextFieldErrored ? "El nombre no puede estar vacío" : ""}
					margin = "normal"
				/>
				 :
					<h1>{name}</h1>
			}
			
			<br></br>

			{/* Categoria */}
			{isUserPlace ? 
				<Select
					disabled = {loading}
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
			:
				<p>{place.category}</p>
			}
			<br></br>

			<hr></hr>
			{/* Review */}
			{review!==null && 
				<div>
					<Rating value={rating} precision={0.5} onChange={handleRatingChange}/>
					<TextField label="Comentario" value={comment} onChange={handleCommentChange} />
				</div>
			}
			<Button
				variant="contained"
				onClick={review===null ? createNewReview : deleteReview}
				disabled = {loading}
			>
				{/* TODO: internacionalizar */}
				{review===null ? "Añadir review" : "Eliminar review"}
			</Button>
			<hr></hr>


			{/* Fotos */}
			{/* TODO: internacionalizar */}
			<h3>Fotos:</h3>
			{photosURLs.map(
				url =>
				<div key={"photo_div"+photosURLs.indexOf(url)}>
					<img
						src={url}
						width="250"
						height="100"
						// TODO: poner el alto adecuado
						key={"photo_url_"+photosURLs.indexOf(url)}
					/>
					<IconButton
						onClick={() => deleteImage(url)}
						key={"delete_photo_button"+photosURLs.indexOf(url)}
					>
						<DeleteIcon/>
					</IconButton>
				</div>
			)}
			
			<>
			<input
				type="file"
				name="photos"
				id="photos"
				accept="image/*"
				onChange={addImage}
				style={{display: 'none'}}
			/>
			<label htmlFor="photos">
				<Button
					variant="contained"
					component="span"
				>
					{/*TODO: internacionalizar*/}
					Añadir imagen
				</Button>
			</label>
			</>
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

import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, IconButton, TextField } from "@mui/material";
import React, { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import EditInfoPlace from "./EditInfoPlace.js";
import Rating from '@mui/material/Rating';

// TODO: eliminar hardcoded
const reviews = [
	{
		rating: 5,
		comment: "",
		author: "Other",
		id: 111111
	},
	{
		rating: 8,
		comment: "Super comentario existente",
		author: "Other",
		id: 123123123
	},
	{
		rating: -1,
		comment: "Solo texto",
		author: "Other",
		id: 333333
	},
	{
		rating: 6,
		comment: "Mi comentarios",
		author: "https://id.inrupt.com/uo276818",
		id: 999999
	}
]

export default function FullInfoPlace(props) {
	const {
		place,
		setPosition,
		changeDrawerContent,
		categorias,
		API_location_calls,
		loggedInUserwebId
	} = props;

	const isUserPlace = props.place.author === loggedInUserwebId;

	console.log("---")
	console.log(props.place)

	const [t] = useTranslation("global");
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [addImageLoading, setAddImageLoading] = useState(false);
	const [commentLoading, setCommentLoading] = useState(false);
	const [loading, setLoading] = useState(false);

	// TODO: coger la review adecuada
	const [rating, setRating] = useState(
		place?.reviews?.find(r => r.author===loggedInUserwebId) ? place?.reviews?.find(r => r.author===loggedInUserwebId)?.rating : null
	);
	// TODO: coger la review adecuada
	const [comment, setComment] = useState(
		place?.reviews?.find(r => r.author===loggedInUserwebId) ? place?.reviews?.find(r => r.author===loggedInUserwebId)?.comment : ""
	);
	const [review, setReview] = useState(null);

	// TODO: seleccionar las imágenes adecuadas
	const [photosURLs, setPhotosURLs] = useState(
		place?.photos ? place?.photos : []
	);

	function createNewReview() {
		setReview({ rating: rating, comment: comment });
	}

	async function saveReview() {
		if (place?.reviews?.find(r => r.author===loggedInUserwebId)) {
			// updating
			const theReview = place.reviews.find(r => r.author===loggedInUserwebId)

			console.log("UPDATE INICIO")
			const result = await API_location_calls.API_updateReview(
				theReview.id,
				{
					comment: comment, 
					rating:(rating&&rating>0)?parseInt(rating):-1
				},
				place.id
			)
			console.log("UPDATE FIN")

			place[reviews] = place.reviews
				.filter(r => r.author!==loggedInUserwebId)
				.concat({...result})
		} else {
			console.log("COMIENZA A CREAR")
			// creating
			const theReview = await API_location_calls.API_addReview(
				place.id,
				place.author,
				{
					comment: comment, 
					rating:(rating&&rating>0)?parseInt(rating):-1
				}
			)
			place[reviews] = place.reviews
				.filter(r => r.author!==loggedInUserwebId)
				.concat({...theReview})
			console.log("FIN DE CREAR")
		}
	}

	function cancelReview() {
		const originalReview = place?.reviews.find(r => r.author===loggedInUserwebId)
		if (Boolean(originalReview)) {
			setRating(originalReview.rating)
			setComment(originalReview.comment)
		} else {
			setRating(null)
			setComment("")
		}
		setReview(null)
	}

	async function deleteReview() {
		
		console.log("Borrar review inicio")
		await API_location_calls.API_removeReview(
			place.id,
			place.reviews.find(r => r.author===loggedInUserwebId).id
		);
		console.log("Borrar review final")

		place.reviews = place.reviews.filter(
			r =>
			r.author !== loggedInUserwebId
		)


		setRating(null);
		setComment("");
		setReview(null);
	}

	function handleRatingChange(event) {
		setRating(parseFloat(event.target.value)*2);
	}

	function handleCommentChange(event) {
		setComment(event.target.value);
	}

	function addImage(event) {
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);

		
		reader.onloadend = async () => {
			console.log("INICIO front")
			const response = await API_location_calls.API_addPhoto(
				place.id,
				place.author,
				reader.result
			)
			console.log("FIN FRONT")
			setPhotosURLs(current => [...current, response])
			
		};
	}

	async function deleteImage(photo) {
		console.log("COMIENZO FRONT")
		const response = await API_location_calls.API_removePhoto(
			place.id,
			photo.id
		)
		console.log("FIN FRONT")
		setPhotosURLs((current) => current.filter((p) => p.id !== photo.id));
	}

	function allowEdit() {
		changeDrawerContent(
			<EditInfoPlace
				place={place}
				changeDrawerContent={changeDrawerContent}
				returnTo={<FullInfoPlace {...props} />}
				categorias={categorias}
				API_location_calls={API_location_calls}
			/>
		);
	}

	function centerMapToPlace() {
		setPosition({
			lat: place.latitude,
			lng: place.longitude,
		});
	}

	async function deletePlace() {
		setDeleteLoading(true);
		await API_location_calls.API_deleteLocation(place.id);
		setDeleteLoading(false);
		changeDrawerContent(props.returnTo);
	}

	async function processComment() {}

	async function saveImages() {
		setAddImageLoading(true);

		// TODO: implement
		console.log("Pendiente");

		setAddImageLoading(false);
	}

	return (
		<>
			{/* Botón de retorno */}
			{props.returnTo && (
				<IconButton onClick={() => {changeDrawerContent(props.returnTo)}}>
					<ArrowBackIcon />
				</IconButton>
			)}

			<div className="card--line1">
				{/* Nombre del lugar */}
				<h1>{place.name}</h1>

				{/* Botón de localizar */}
				<Button
					onClick={centerMapToPlace}
					disabled={deleteLoading || addImageLoading || commentLoading}
					startIcon={<TravelExploreIcon />}
					variant="contained"
				>
					{t("sidebar.place.locate")}
				</Button>
			</div>

			{/* Categoría del lugar */}
			{/* TODO: internacionalizar */}
			<div className="card--line1">
				<h3>Categoria:</h3>
				<p>{place.category}</p>
			</div>

			{/* Autor */}
			<div className="card--line1">
				{/* TODO: internacionalizar */}
				<h3>Autor:</h3>
				{props.place.author}
				{/* TODO: hacer */}
			</div>

			<br></br>
			<div className="card--line1">

			{/* Botón de editar */}
			{isUserPlace && (
				<Button
					onClick={allowEdit}
					disabled={deleteLoading || addImageLoading || commentLoading}
					startIcon={<EditIcon />}
					variant="contained"
				>
					{t("sidebar.place.edit")}
				</Button>
			)}

			{/* Botón de borrar */}
			{isUserPlace && (
				<LoadingButton
					color="secondary"
					onClick={deletePlace}
					loading={deleteLoading}
					loadingPosition="start"
					startIcon={<DeleteIcon />}
					variant="contained"
				>
					{t("sidebar.place.delete")}
				</LoadingButton>
			)}
			</div>

			<br></br><hr></hr>

			<div>
			{/* Reviews */}
			<h3>Reviews:</h3>
			{/* Mi review */}
			{review ?
			// Se está editando
			(
			<div className="card">
				<Rating
					defaultValue={rating/2}
					precision={0.5}
					onChange={handleRatingChange}
				/>
				<TextField
						label="Comentario"
						defaultValue = ""
						onChange={handleCommentChange}
					/>
				<div className="card--line1">
					<Button
						variant="contained"
						onClick={saveReview}
						disabled={loading}
						margin="normal"
					> 
						{/* TODO: internacionalizar */}
						{"Guardar"}
					</Button>

					<Button
						variant="contained"
						onClick={cancelReview}
						disabled={loading}
						margin="normal"
					> 
						{/* TODO: internacionalizar */}
						{"Cancelar"}
					</Button>
				</div>

			</div>)
			
			:
			((comment||(rating  &&  rating>0)) ?
			// Existe, se pinta
			<>
			<div className="card">
				<Rating
					defaultValue={rating/2}
					precision={0.5}
					onChange={handleRatingChange}
					readOnly
				/>
				<p>{comment}</p>
			</div>
			

			<Button
				variant="contained"
				onClick={createNewReview}
				disabled={loading}
			> 
				{/* TODO: internacionalizar */}
				{"Editar"}
			</Button>

			<Button
				variant="contained"
				onClick={deleteReview}
				disabled={loading}
			> 
				{/* TODO: internacionalizar */}
				{"Borrar review"}
			</Button>
			</>

			// No existe, botón de crear
			:
			<Button
				variant="contained"
				onClick={createNewReview}
				disabled={loading}
			> 
				{/* TODO: internacionalizar */}
				{"Añadir review"}
			</Button>)
			}

			{/* Reviews de otros */}
			{place?.reviews.filter(r => r.author!==loggedInUserwebId).map(
				r =>
				<div className="card">
					Author: {r.author}
					check: {loggedInUserwebId}
					< br/>
					{
						r.rating  &&  r.rating>0
						&&
						<>
							<Rating
								value={r.rating/2}
								readOnly
								precision={0.5}
							/>
						<br/>
						</>
					}
					{
					r.comment  &&  r.comment.length!==0
						&&
					'“'+r.comment+'”'
					}
				</div>
			)}

			</div> 
			
			<br></br><hr></hr>

			{/* Fotos */}
			{/* TODO: internacionalizar */}
			<h3>Fotos</h3>
			{photosURLs.map((photo) => (
				<div key={"photo_div" + photosURLs.indexOf(photo)}>
					<img
						src={photo.imageJPG}
						width="250"
						height="100"
						// TODO: poner el alto adecuado
						key={"photo_url_" + photosURLs.indexOf(photo)}
					/>
					{
					photo.author === loggedInUserwebId
						&&
					<IconButton
						onClick={() => deleteImage(photo)}
						key={"delete_photo_button" + photosURLs.indexOf(photo)}
					>
						<DeleteIcon />
					</IconButton>
					}
				</div>
			))}

			<>
				<input
					type="file"
					name="photos"
					id="photos"
					accept="image/*"
					onChange={addImage}
					style={{ display: "none" }}
				/>
				<label htmlFor="photos">
					<Button variant="contained" component="span">
						{/*TODO: internacionalizar*/}
						Añadir imagen
					</Button>
				</label>
			</>
		</>
	);
}

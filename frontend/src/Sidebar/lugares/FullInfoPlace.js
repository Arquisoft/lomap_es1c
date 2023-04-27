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

	console.log(props.place)

	const [t] = useTranslation("global");
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [addImageLoading, setAddImageLoading] = useState(false);
	const [commentLoading, setCommentLoading] = useState(false);
	const [loading, setLoading] = useState(false);

	const [isReviewOpen, setIsReviewOpen] = useState(false);
	const [isPhotoAdded, setIsPhotoAdded] = useState(false);

	// TODO: coger la review adecuada
	const [rating, setRating] = useState(
		place?.reviews?.find(r => r.author===loggedInUserwebId) ? place?.reviews?.find(r => r.author===loggedInUserwebId)?.rating / 2 : null
	);
	// TODO: coger la review adecuada
	const [comment, setComment] = useState(
		place?.reviews?.find(r => r.author===loggedInUserwebId) ? place?.reviews?.find(r => r.author===loggedInUserwebId)?.comment : ""
	);
	const [review, setReview] = useState(null);

	// TODO: seleccionar las imágenes adecuadas
	const [photosURLs, setPhotosURLs] = useState(
		place?.images ? place?.images.filter((photo) => photo.webID === "aaa") : []
	);
	const [imageCommands, setImageCommands] = useState([]);

	function createNewReview() {
		setReview({ rating: rating, comment: comment });
	}

	// var originalReview = useRef({comment: comment, rating: rating})

	async function saveReview() {
		if (place?.reviews?.find(r => r.author===loggedInUserwebId)) {
			// updating
			const theReview = place.reviews.find(r => r.author===loggedInUserwebId)
			await API_location_calls.API_updateReview(
				theReview.id,
				{
					comment: comment, 
					rating:(rating&&rating>0)?rating:-1
				}
			)

			place[reviews] = place.reviews
				.filter(r => r.author!==loggedInUserwebId)
				.concat({...review, id:theReview.id, author: theReview.author})
		} else {
			// creating
			const response = await API_location_calls.API_addReview(
				place.id,
				place.author,
				{
					comment: comment, 
					rating:(rating&&rating>0)?rating:-1
				}
			)
			place[reviews] = place.reviews
			.filter(r => r.author!==loggedInUserwebId)
			.concat({...review, author: response.author, id: response.id})
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
		if (place?.review?.find(r => r.author===loggedInUserwebId)) {
			await API_location_calls.API_removeReview(
				place.review.find(r => r.author===loggedInUserwebId).id
			);

			place.reviews = place.reviews.filter(
				r =>
				r.author !== loggedInUserwebId
			)

		}

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
		console.log(file);
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onloadend = () => {
			const nuevo_resultado = "" + reader.result + ""
			console.log(typeof nuevo_resultado)
			console.log(nuevo_resultado)

			if (!photosURLs.includes(reader.result)) {
				setPhotosURLs((current) => [...current, nuevo_resultado]);
			}
			
		};
		setImageCommands((current) => [
			...current,
			{
				url: reader.result,
				f: (placeID) => {
					console.log("añadir API PENDIENTE ");
				},
			},
		]);
	}

	function deleteImage(url) {
		const isNewImage = imageCommands.some(
			(imageCommand) => imageCommand.url === url
		);
		if (isNewImage) {
			setImageCommands((current) =>
				current.filter((imageCommand) => imageCommand.url !== url)
			);
		} else {
			setImageCommands((current) => [
				...current,
				{
					f: (placeID) => {
						console.log("BORRAR API PENDIENTE");
					},
				},
			]);
		}
		setPhotosURLs((current) => current.filter((photoURL) => photoURL !== url));
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
				{loggedInUserwebId}
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
								defaultValue={r.rating/2}
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
			{photosURLs.map((url) => (
				<div key={"photo_div" + photosURLs.indexOf(url)}>
					<img
						src={url}
						width="250"
						height="100"
						// TODO: poner el alto adecuado
						key={"photo_url_" + photosURLs.indexOf(url)}
					/>
					<IconButton
						onClick={() => deleteImage(url)}
						key={"delete_photo_button" + photosURLs.indexOf(url)}
					>
						<DeleteIcon />
					</IconButton>
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

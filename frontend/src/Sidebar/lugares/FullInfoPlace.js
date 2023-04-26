import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, IconButton, TextField } from "@mui/material";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import EditInfoPlace from "./EditInfoPlace.js";
import Rating from '@mui/material/Rating';
/*
// Ejecutar el comando adecuado para la review
		if (reviewCommand) reviewCommand();

		// Si se añaden/borran fotos, hacer
		for (var command of imageCommands) {
			command.f(thePlaceID);
		}
*/

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

	const [t] = useTranslation("global");
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [addImageLoading, setAddImageLoading] = useState(false);
	const [commentLoading, setCommentLoading] = useState(false);
	const [loading, setLoading] = useState(false);

	const [isReviewOpen, setIsReviewOpen] = useState(false);
	const [isPhotoAdded, setIsPhotoAdded] = useState(false);

	// TODO: coger la review adecuada
	const [rating, setRating] = useState(
		place?.review?.find(r => r.author===loggedInUserwebId) ? place?.review?.find(r => r.author===loggedInUserwebId)?.rating / 2 : null
	);
	// TODO: coger la review adecuada
	const [comment, setComment] = useState(
		place?.review?.find(r => r.author===loggedInUserwebId) ? place?.review?.find(r => r.author===loggedInUserwebId)?.comment : ""
	);
	const [review, setReview] = useState(
		(rating  &&  rating>=0) || comment ? { rating: rating, comment: comment } : null
	);

	// TODO: seleccionar las imágenes adecuadas
	const [photosURLs, setPhotosURLs] = useState(
		place?.images ? place?.images.filter((photo) => photo.webID === "aaa") : []
	);
	const [imageCommands, setImageCommands] = useState([]);
	const [reviewCommand, setReviewCommand] = useState(null);

	function createNewReview() {
		setReview({ rating: rating, comment: comment });
	}

	function saveReview() {
		// if nueva

		// if updating
	}

	function cancelReview() {

	}

	function deleteReview() {
		// TODO cambiar condicion
		if (true) {
			console.log("CAMBIAR CONDICION");
			// Delete already existing review
			const newReviewCommand = (placeID) =>
				API_location_calls.API_removeReview();
			setReviewCommand(newReviewCommand);
		} else {
		}
		setRating(null);
		setComment("");
		setReview(null);
	}

	function handleRatingChange(event) {
		setRating(parseFloat(event.target.value));
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
			if (!photosURLs.includes(reader.result)) {
				setPhotosURLs((current) => [...current, reader.result]);
			}
			console.log(reader.result);
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

	async function showSaveReviewButton() {
		setIsReviewOpen(!isReviewOpen);
		if (!isReviewOpen) {
			createNewReview();
		} else {
			deleteReview();
		}
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
			<p>Si</p>
				:
				<Button
					variant="contained"
					onClick={showSaveReviewButton}
					disabled={loading}
				> 
					{/* TODO: internacionalizar */}
					{"Añadir review"}
				</Button>
			}

			{/* Reviews de otros */}
			{reviews.filter(r => r.author!==loggedInUserwebId).map(
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
			
			{/* Mi review */}
			{/* {review !== null && (
				<div>
					<Rating
						value={rating}
						precision={0.5}
						onChange={handleRatingChange}
					/>
					<TextField
						label="Comentario"
						value={comment}
						onChange={handleCommentChange}
					/>
				</div>
			)} */}

			{/* {isReviewOpen ? (
				<Button
					variant="contained"
					onClick={review === null ? createNewReview : deleteReview}
					disabled={loading}
				>
					Save
				</Button>
			) : null} */}

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

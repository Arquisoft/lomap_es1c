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

	const [rating, setRating] = useState(
		place?.reviews?.find(r => r.author===loggedInUserwebId) ? place?.reviews?.find(r => r.author===loggedInUserwebId)?.rating : null
	);
	const [comment, setComment] = useState(
		place?.reviews?.find(r => r.author===loggedInUserwebId) ? place?.reviews?.find(r => r.author===loggedInUserwebId)?.comment : ""
	);
	const [review, setReview] = useState(null);

	const [photosURLs, setPhotosURLs] = useState(
		place?.photos ? place?.photos : []
	);

	function createNewReview() {
		setReview({ rating: rating, comment: comment });
	}

	async function saveReview() {
		setCommentLoading(true)
		if (place?.reviews?.find(r => r.author===loggedInUserwebId)) {
			// updating
			const theReview = place.reviews.find(r => r.author===loggedInUserwebId)

			const result = await API_location_calls.API_updateReview(
				theReview.id,
				{
					comment: comment, 
					rating:(rating&&rating>0)?parseInt(rating):-1
				},
				place.id
			)

			place.reviews = place.reviews
				.filter(r => r.author!==loggedInUserwebId)
				.concat({...result})
		} else {
			// creating
			const theReview = await API_location_calls.API_addReview(
				place.id,
				place.author,
				{
					comment: comment, 
					rating:(rating&&rating>0)?parseInt(rating):-1
				}
			)
			place.reviews = place.reviews
				.filter(r => r.author!==loggedInUserwebId)
				.concat({...theReview})
		}
		setCommentLoading(false);
		setReview(null);
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
		setCommentLoading(true)
		await API_location_calls.API_removeReview(
			place.id,
			place.reviews.find(r => r.author===loggedInUserwebId).id
		);

		place.reviews = place.reviews.filter(
			r =>
			r.author !== loggedInUserwebId
		)

		setRating(null);
		setComment("");
		setReview(null);
		setCommentLoading(false)
	}

	function handleRatingChange(event) {
		setRating(parseFloat(event.target.value)*2);
	}

	function handleCommentChange(event) {
		setComment(event.target.value);
	}

	function addImage(event) {
		setAddImageLoading(true)
		const file = event.target.files[0];
		const reader = new FileReader();
		reader.readAsDataURL(file);

		reader.onloadend = async () => {
			const response = await API_location_calls.API_addPhoto(
				place.id,
				place.author,
				reader.result
			)
			setPhotosURLs(current => [...current, response])
			
		};
		setAddImageLoading(false)
	}

	async function deleteImage(photo) {
		const response = await API_location_calls.API_removePhoto(
			place.id,
			photo.id
		)
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
		changeDrawerContent(null);
	}

	return (
		<>
			{/* Botón de retorno */}
			<IconButton onClick={() => {changeDrawerContent(props.returnTo ? props.returnTo : null)}}>
				<ArrowBackIcon data-testid="arrow"/>
			</IconButton>

			<div className="card--line1">
				{/* Nombre del lugar */}
				<h1>{place.name}</h1>

				{/* Botón de localizar */}
				<Button
					onClick={centerMapToPlace}
					disabled={deleteLoading || addImageLoading || commentLoading}
					startIcon={<TravelExploreIcon />}
					variant="contained"
					data-testid="center"
				>
					{t("sidebar.place.locate")}
				</Button>
			</div>

			{/* Categoría del lugar */}
			<div className="card--line1">
				<h3>{t("sidebar.place.category")}:</h3>
				<p>{t("categories."+place.category)}</p>
			</div>

			{/* Autor */}
			<div className="card--line1">
				<h3>{t("sidebar.place.author")}:</h3>
				{props.place.author}
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
					data-testid="edit"
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
					data-testid="deletePlace"
				>
					{t("sidebar.place.delete")}
				</LoadingButton>
			)}
			</div>

			<br></br><hr></hr>

			<div>
			{/* Reviews */}
			<h3>{t("sidebar.place.reviews")}:</h3>
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
						defaultValue = {comment}
						onChange={handleCommentChange}
						placeholder="Comentario"
					/>
				<div className="card--line1">
					<Button
						variant="contained"
						onClick={saveReview}
						disabled={deleteLoading || addImageLoading || commentLoading}
						margin="normal"
						data-testid="saveReview"
					> 
						{t("sidebar.place.save")}
					</Button>

					<Button
						variant="contained"
						onClick={cancelReview}
						disabled={deleteLoading || addImageLoading || commentLoading}
						margin="normal"
						data-testid="cancelReview"
					> 
						{t("sidebar.place.cancel")}
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
			

			<Button
				variant="contained"
				onClick={createNewReview}
				disabled={deleteLoading || addImageLoading || commentLoading}
				data-testid="createReview"
				> 
				{t("sidebar.place.edit")}
			</Button>

			<LoadingButton
				variant="contained"
				onClick={deleteReview}
				disabled={deleteLoading || addImageLoading || commentLoading}
				loading={commentLoading}
				data-testid="deleteReview"
				> 
				{t("sidebar.place.delete")}
			</LoadingButton>
			</div>
			</>

			// No existe, botón de crear
			:
			<Button
				variant="contained"
				onClick={createNewReview}
				disabled={deleteLoading || addImageLoading || commentLoading}
				data-testid="createNewReview"
			> 
				{t("sidebar.place.add-review")}
			</Button>)
			}

			{/* Reviews de otros */}
			{place?.reviews?.filter(r => r.author!==loggedInUserwebId).map(
				r =>
				<div className="card" key={"review_other_"+r.author}>
					{/* TODO: internacionalizar */}
					Author: { props.getFriendName ? props.getFriendName(r.author) : r.author }
					
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
			<h3>{t("sidebar.place.photos")}:</h3>
			{photosURLs.map((photo) => (
				<div key={"photo_div" + photosURLs.indexOf(photo)}>
					<p></p>
					{/* TODO : nombre del amigo */}
					<img
						src={photo.imageJPG}
						width="250"
						height="100"
						alt="Foto"
						key={"photo_url_" + photosURLs.indexOf(photo)}
					/>
					{
					photo.author === loggedInUserwebId
						&&
					<IconButton
						onClick={() => deleteImage(photo)}
						key={"delete_photo_button" + photosURLs.indexOf(photo)}
						data-testid="deletePhoto"
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
					data-testid="file"
				/>
				<label htmlFor="photos">
					<Button variant="contained" component="span" data-testid="addPhoto">
						{t("sidebar.place.addImage")}
					</Button>
				</label>
			</>
		</>
	);
}

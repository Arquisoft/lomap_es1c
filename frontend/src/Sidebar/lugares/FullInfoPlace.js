import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import TravelExploreIcon from "@mui/icons-material/TravelExplore";
import LoadingButton from "@mui/lab/LoadingButton";
import { Button, IconButton, TextField } from "@mui/material";
import Rating from "@mui/material/Rating";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { Navigation, Pagination } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import { Swiper, SwiperSlide } from "swiper/react";
import EditInfoPlace from "./EditInfoPlace.js";
/*
// Ejecutar el comando adecuado para la review
		if (reviewCommand) reviewCommand();

		// Si se añaden/borran fotos, hacer
		for (var command of imageCommands) {
			command.f(thePlaceID);
		}
*/
export default function FullInfoPlace(props) {
	const {
		place,
		setPosition,
		changeDrawerContent,
		categorias,
		API_location_calls,
		isUserPlace,
	} = props;

	//ESTADOS COMO EL ESPAÑOL

	const [t] = useTranslation("global");
	const [deleteLoading, setDeleteLoading] = useState(false);
	const [addImageLoading, setAddImageLoading] = useState(false);
	const [commentLoading, setCommentLoading] = useState(false);
	const [loading, setLoading] = useState(false);

	const [isReviewOpen, setIsReviewOpen] = useState(false);
	const [isPhotoAdded, setIsPhotoAdded] = useState(false);

	// TODO: coger la review adecuada
	const [rating, setRating] = useState(
		place?.review?.rating ? place.review?.rating / 2 : null
	);
	// TODO: coger la review adecuada
	const [comment, setComment] = useState(
		place?.review?.comment ? place.review?.comment : ""
	);
	const [review, setReview] = useState(
		rating || comment ? { rating: rating, comment: comment } : null
	);

	// TODO: seleccionar las imágenes adecuadas
	const [photosURLs, setPhotosURLs] = useState(
		place?.images ? place?.images.filter((photo) => photo.webID === "aaa") : []
	);
	const [imageCommands, setImageCommands] = useState([]);
	const [reviewCommand, setReviewCommand] = useState(null);

	function createNewReview() {
		setReview({ rating: rating, comment: comment });
		// TODO cambiar condicion
		if (true) {
			console.log("CAMBIAR CONDICION");
			// Create a new review
			const newReviewCommand = (placeID) => API_location_calls.API_addReview();
			setReviewCommand(newReviewCommand);
		} else {
		}
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

			{/* Nombre del lugar */}
			<h1>{place.name}</h1>

			{/* Categoría del lugar */}
			{/* TODO: internacionalizar */}
			<h3>Categoria:</h3>
			<p>{place.category}</p>

			{/* Reviews */}
			{/* {place.reviews  &&  place.reviews.length>0  &&  
            <>
                <h3>Reviews: </h3>
                <Swiper
                    pagination={{ type: "fraction", }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                >
                    {place.reviews.map(
                        review => (
                            <SwiperSlide>
                                <p>{review.author}</p>
                                <Rating value={(review.rating)/2.0} readOnly/>
                            </SwiperSlide>
                        )
                    )}
                </Swiper>
            </>
        } */}

			{/* Comments */}
			{/* {place.comments  &&  place.comments.length>0  &&
            <>
                <h3>Comentarios:</h3>
                <Swiper
                    pagination={{ type: "fraction", }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                >
                    {place.comments.map(
                        comment => 
                        (<SwiperSlide key={comment.id}>
                            <p>"{comment.text}"({comment.author})</p>
                        </SwiperSlide>)
                    )}
                </Swiper>

            </>
        } */}

			{/* Photos */}
			{/* {place.photos  &&  place.photos.length>0  &&
            <>
                <h3>Fotos:</h3>
                <Swiper
                    pagination={{ type: "fraction", }}
                    navigation={true}
                    modules={[Pagination, Navigation]}
                >
                    {place.photos.map(
                        photo =>
                        (<SwiperSlide>
                           //TODO: hacer bien
                            <img src=""/>
                        </SwiperSlide>)
                    )}
                </Swiper>
            </>
        } */}

			<br></br>
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

			{/* Botón de localizar */}
			<Button
				onClick={centerMapToPlace}
				disabled={deleteLoading || addImageLoading || commentLoading}
				startIcon={<TravelExploreIcon />}
				variant="contained"
			>
				{t("sidebar.place.locate")}
			</Button>

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

			<hr></hr>
			{/* Review */}
			<h3>Review</h3>
			{review !== null && (
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
			)}

			{isReviewOpen ? (
				<Button
					variant="contained"
					onClick={review === null ? createNewReview : deleteReview}
					disabled={loading}
				>
					Save
				</Button>
			) : null}

			<Button
				variant="contained"
				onClick={showSaveReviewButton}
				disabled={loading}
			>
				{/* TODO: internacionalizar */}
				{!isReviewOpen ? "Añadir" : "Cancelar"}
			</Button>
			<hr></hr>

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

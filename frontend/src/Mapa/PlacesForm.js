import { Button, MenuItem, Rating, Select, TextField } from "@mui/material";
import React from "react";
import { useTranslation } from "react-i18next";
import Modal from "react-modal";
import "./muiComps.css";
import LoadingButton from "@mui/lab/LoadingButton";
import SaveIcon from '@mui/icons-material/Save';

export default function CreateModal({
	isOpen,
	latMark,
	lngMark,
	updateLocations,
	setIsOpen,
	setMarkers,
	setStateButton,
	setCanCick,
	API_location_calls,
	categorias
}) {
	const [t] = useTranslation("global");
	const [loading, setLoading] = React.useState(false);

	const nivelesPrivacidad = ["Publico", "Solo Amigos"];

	Modal.setAppElement(document.getElementsByClassName("map-conteiner")[0]);
	//Constantes para abrir y cerrar el modal.
	const modalIsOpen = isOpen;
	const latitudeMark = latMark;
	const longitudeMark = lngMark;

	let subtitle;
	let form;

	//Estilo de los componentes del modal una vez se abren
	function afterOpenModal() {
		subtitle.style.color = "#FFFFF";
		subtitle.style.textAlign = "center";
		subtitle.style.marginTop = 0;
		form.style.display = "grid";
		form.style.gridTemplateColumns = "auto";
		form.style.marginBottom = "10px";
	}

	//Estilos del modal
	const customStyles = {
		content: {
			top: "50%",
			left: "50%",
			right: "auto",
			bottom: "auto",
			marginRight: "-50%",
			transform: "translate(-50%, -50%)",
			background: "#1e2124",
			color: "#f7f7f7",
		},
	};

	//Constantes para los campos del form
	const [nombre, setNombre] = React.useState("");
	const [valoracion, setValoracion] = React.useState(0);
	const [categoria, setCategoria] = React.useState("Sin categoria");
	const [privacidad, setPrivacidad] = React.useState("Publico");
	const [fotos, setFotos] = React.useState("");
	const [comentario, setComentario] = React.useState("");

	function handleNameChange(e) {
		setNombre(e.target.value);
	}

	function handleValChange(e) {
		setValoracion(e.target.value);
	}

	function handleCategoryChange(e) {
		setCategoria(e.target.value);
	}

	function handlePrivacyChange(e) {
		setPrivacidad(e.target.value);
	}

	function handleFotoChange(e) {
		setFotos(e.target.value);
	}

	function handleCommentChange(e) {
		setComentario(e.target.value);
	}

	//Cierra el modal y pone todos los valores de los campos a su valor por defecto.
	function closeModal() {
		setNombre("");
		setValoracion("");
		setIsOpen(false);
		setMarkers([]);
		setCanCick(false);
	}

	//Comprueba que todos los campos esten correctos, añade el punto a la lista de puntos,restea los valores por defecto del formulario
	//Y recarga los puntos del mapa para que se vean los nuevos.
	async function addPlaceModal() {
		setMarkers([]);
		if (nombre.trim().length <= 0) {
			alert("El nombre no puede estar vacio");
		}else {
			setStateButton(true);
			await addPlaceApi(
				nombre,
				latitudeMark,
				longitudeMark,
				categoria,
				valoracion * 2,
				comentario,
				fotos,
				privacidad
			);
			setNombre("");
			setValoracion("");
			setIsOpen(false);
			setCanCick(false);
			updateLocations();
		}
	}

	async function addPlaceApi(
		nombreP,
		latitudeMarkP,
		longitudeMarkP,
		categoriaP,
		reviewP,
		commentP,
		photoP,
		privacyP
	) {
		setLoading(true)
		const data = {
			name: nombreP,
			latitude: latitudeMarkP,
			longitude: longitudeMarkP,
			category: categoriaP,
			review: reviewP,
			comment: commentP,
			photo: photoP,
			privacy: privacyP,
		};

		const response = await API_location_calls.API_createLocation(data)
		setLoading(false)
		return response
	}

	return (
		<Modal
			isOpen={modalIsOpen}
			onAfterOpen={afterOpenModal}
			onRequestClose={closeModal}
			style={customStyles}
			contentLabel="Add Point Modal"
		>
			<h2 ref={(_subtitle) => (subtitle = _subtitle)}>
				{t("locations.form.title")}
			</h2>
			<form ref={(_form) => (form = _form)}>
				<TextField
					id="filled-basic"
					className="nombre"
					label={t("locations.form.name")}
					variant="outlined"
					type="text"
					name="nombre"
					value={nombre}
					onChange={handleNameChange}
					disabled={loading}
				/>

				<label htmlFor="puntuacion">{t("locations.form.score")}</label>
				<Rating
					defaultValue={2.5}
					className="rating"
					precision={0.5}
					name="simple-controlled"
					value={Number(valoracion)}
					onChange={handleValChange}
					disabled={loading}
				/>

				<label htmlFor="categoria">{t("locations.form.category")}</label>
				<Select
					id="categoria"
					className="categoria"
					defaultValue="sin categoria"
					name="categoria"
					onChange={handleCategoryChange}
					disabled={loading}
				>
					<MenuItem value={"sin categoria"} defaultValue={true}>Sin Categoria</MenuItem>
					{categorias.map((categoria) => (
						<MenuItem value={categoria} disabled={loading}>{categoria}</MenuItem>
					))}
				</Select>

				<label htmlFor="nivelPrivacidad">{t("locations.form.privacy")}</label>

				<Select
					id="nivelPrivacidad"
					className="privacidad"
					defaultValue="privado"
					name="nivelPrivacidad"
					onChange={handlePrivacyChange}
					disabled={loading}
				>
					<MenuItem value={"privado"} defaultValue={"privado"} disabled={loading}>Privado</MenuItem>
					{nivelesPrivacidad.map((nivel) => (
						<MenuItem value={nivel.toLowerCase()} disabled={loading}>{nivel}</MenuItem>
					))}
				</Select>

				<label htmlFor="fotos">{t("locations.form.photos")}</label>
				<input
					type="file"
					name="fotos"
					id="fotos"
					placeholder="Escoja las imagenes"
					onChange={handleFotoChange}
					disabled={loading}
				/>

				<label htmlFor="comentarios">{t("locations.form.comment")}</label>
				<TextField
					id="comentarios"
					placeholder={t("locations.form.commentPlaceHolder")}
					name="comentarios"
					onChange={handleCommentChange}
					className="comentario"
					multiline
					rows={8}
					disabled={loading}
				/>
			</form>
			<div className="submitFormLugares">
				<LoadingButton
					className="btn"
					onClick={addPlaceModal}
					disabled={loading}
					loading={loading}
					loadingPosition="start"
					startIcon={<SaveIcon/>}
				>
					{t("locations.form.add")}
				</LoadingButton>
				<Button
					className="btnCancel"
					onClick={closeModal}
					disabled={loading}
				>
					{t("locations.form.cancel")}
				</Button>
			</div>
		</Modal>
	);
}

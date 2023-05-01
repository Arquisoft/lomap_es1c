import Location from "../models/locationModels/Location";
import Photo from "../models/locationModels/Photo";
import Review from "../models/locationModels/Review";
import {
	getLocationById,
	saveLocation,
	updateReview as updateReview_,
	deleteReviewById,
	getAllLocations as getAllLocations_,
	deleteLocationById,
	deletePhotoById,
	getCategories as getCategories_
} from "../solid/Solid.js";

//CRUD
async function getLocation(session, id) {
	try {
		const location1 = await getLocationById(
			session,
			id,
			session.info.webId
		);

		if (location1 !== null) {
			return location1;
		} else {
			return null;
		}
	} catch (err) {
		throw new Error("Error al obtener la localizacion");
	}
}

async function getAllLocations(session) {
	try {
		const locations = await getAllLocations_(session, session.info.webId);
		return locations;
	} catch (err) {
		throw new Error("Error al obtener las localizaciones");
	}
}

async function createLocation(session, location) {
	const name = location.name;
	const latitude = location.latitude;
	const longitude = location.longitude;
	const category = location.category;

	if (!name || !latitude || !longitude) {
		throw new Error("Faltan datos");
	}
	try {
		const location = new Location(
			name,
			latitude,
			longitude,
			session.info.webId,
			category
		);
		await saveLocation(session, location, session.info.webId);
		return location;
	} catch (err) {
		throw new Error("Error al crear la ruta");
	}
}

async function updateLocation(session, id, location) {
	let name = location.name;
	let category = location.category;

	try {
		if (!id) {
			throw new Error("Faltan datos");
		}

		let location = await getLocationById(session, id, session.info.webId);

		location.name = name || location.name;
		location.category = category || location.category;

		await saveLocation(session, location, session.info.webId);

		return location;
	} catch (err) {
		throw new Error("Error al actualizar la localizacion");
	}
}

async function deleteLocation(session, id) {
	try {
		const location = await getLocationById(
			session,
			id,
			session.info.webId
		);
		if (location !== null) {
			await deleteLocationById(session, id, session.info.webId);
		} else {
			throw new Error("Location not found");
		}
		return location;
	} catch (err) {
		throw new Error("Error al eliminar la localizacion");
	}
}

//PHOTOS REVIEWS
async function addPhoto(session, id, photo, webIdAuthor) {
	const photoImage = photo.imageJPG;

	try {
		if (!photoImage) {
			throw new Error("Faltan datos");
		}
		let location = await getLocationById(session, id, webIdAuthor);
		const photo = new Photo(session.info.webId, photoImage);
		location.addPhoto(photo);
		await saveLocation(session, location, webIdAuthor);
		return photo;
	} catch (err) {
		throw new Error("Error añadiendo foto");
	}
}

async function deletePhoto(session, idPhoto) {
	try {
		await deletePhotoById(session, idPhoto, session.info.webId);
		return true;
	} catch (err) {
		throw new Error("Error eliminando la foto");
	}
}

async function addReview(session, id, webIdAuthor, review) {
	const rating = review.rating;
	const comment = review.comment;

	try {
		if (!rating) {
			throw new Error("Faltan datos");
		}
		let location = await getLocationById(session, id, webIdAuthor);
		const review = new Review(rating, comment, session.info.webId);
		location.addReview(review);
		await saveLocation(session, location, webIdAuthor);
		return review;
	} catch (err) {
		throw new Error("Error añadiendo la review");
	}
}

async function updateReview(session, idReview, review1) {
	try {
		const rating = review1.rating;
		const comment = review1.comment;
		let review = new Review(rating, comment, session.info.webId, idReview);
		await updateReview_(session, review, session.info.webId);
		return review;
	} catch (error) {
		throw new Error("Error actualizando la review");
	}
}

async function deleteReview(session, idReview) {
	try {
		await deleteReviewById(session, idReview, session.info.webId);
		return true;
	} catch (err) {
		throw new Error("Error eliminando la review");
	}
}

//  Categories
async function getCategories() {
	try {
		let categories = await getCategories_();
		return categories;
	} catch (err) {
		throw new Error("Error al obtener las categorias");
	}
}
/*
async function getLocationsByCategory(session, category) {
	try {
		let locations = await getAllLocations_(session, session.info.webId);
		locations = locations.filter((location) => location.category === category);
		return locations;
	} catch (err) {
		throw new Error("Error al obtener las localizaciones por categoria");
	}
}
*/
export  {
	createLocation,
	getAllLocations,
	getLocation,
	getCategories,
	deleteLocation,
	updateLocation,
	addReview,
	addPhoto,
	deletePhoto,
	deleteReview,
	updateReview,
};

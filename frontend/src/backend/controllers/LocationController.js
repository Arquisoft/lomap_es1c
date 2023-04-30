const Location = require("../models/locationModels/Location");
const Photo = require("../models/locationModels/Photo");
const Review = require("../models/locationModels/Review");
const solid = require("../solid/Solid.js");

//CRUD
async function getLocation(session, id) {
	try {
		const location1 = await solid.getLocationById(
			session,
			id,
			session.info.webId
		);

		if (location1 != null) {
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
		const locations = await solid.getAllLocations(session, session.info.webId);
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
		await solid.saveLocation(session, location, session.info.webId);
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

		let location = await solid.getLocationById(session, id, session.info.webId);

		location.name = name || location.name;
		location.category = category || location.category;

		await solid.saveLocation(session, location, session.info.webId);

		return location;
	} catch (err) {
		throw new Error("Error al actualizar la localizacion");
	}
}

async function deleteLocation(session, id) {
	try {
		const location = await solid.getLocationById(
			session,
			id,
			session.info.webId
		);
		if (location != null) {
			await solid.deleteLocationById(session, id, session.info.webId);
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
		let location = await solid.getLocationById(session, id, webIdAuthor);
		const photo = new Photo(session.info.webId, photoImage);
		location.addPhoto(photo);
		await solid.saveLocation(session, location, webIdAuthor);
		return photo;
	} catch (err) {
		throw new Error("Error añadiendo foto");
	}
}

async function deletePhoto(session, idPhoto) {
	try {
		await solid.deletePhotoById(session, idPhoto, session.info.webId);
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
		let location = await solid.getLocationById(session, id, webIdAuthor);
		const review = new Review(rating, comment, session.info.webId);
		location.addReview(review);
		await solid.saveLocation(session, location, webIdAuthor);
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
		await solid.updateReview(session, review, session.info.webId);
		return review;
	} catch (error) {
		throw new Error("Error actualizando la review");
	}
}

async function deleteReview(session, idReview) {
	try {
		await solid.deleteReviewById(session, idReview, session.info.webId);
		return true;
	} catch (err) {
		throw new Error("Error eliminando la review");
	}
}

//  Categories
async function getCategories() {
	try {
		let categories = await solid.getCategories();
		return categories;
	} catch (err) {
		throw new Error("Error al obtener las categorias");
	}
}
/*
async function getLocationsByCategory(session, category) {
	try {
		let locations = await solid.getAllLocations(session, session.info.webId);
		locations = locations.filter((location) => location.category === category);
		return locations;
	} catch (err) {
		throw new Error("Error al obtener las localizaciones por categoria");
	}
}
*/
module.exports = {
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

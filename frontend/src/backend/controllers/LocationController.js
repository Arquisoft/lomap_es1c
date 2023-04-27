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
		console.log(err);
		console.log("Error en getLocation");
		throw new Error(err);
	}
}

async function getAllLocations(session) {
	try {
		const locations = await solid.getAllLocations(session, session.info.webId);
		return locations;
	} catch (err) {
		throw new Error(err);
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
		console.log(err);
		throw new Error("error al crear la ruta");
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
		throw new Error(err);
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
		throw new Error(err);
	}
}

//PHOTOS REVIEWS
async function addPhoto(session, id, photo, webIdAuthor) {
	const photoImage = photo.photoImage;

	if (!photo || !name) {
		throw new Error("Faltan datos");
	}
	try {
		let location = await solid.getLocationById(session, id, webIdAuthor);
		const photo = new Photo(session.info.webId, photoImage);
		// TODO cambiar
		await solid.addPhoto(session, photo, location.id, session.info.webId);
		await solid.saveLocation(location);
		return photo
	} catch (err) {
		throw new Error(err);
	}
}

async function deletePhoto(session, idPhoto) {
	try {
		await solid.deletePhoto(session, idPhoto);
	} catch (err) {
		throw new Error(err);
	}
}

async function addReview(session, id, webIdAuthor, review) {
	const rating = review.rating;
	const comment = review.comment;

	if (!rating) {
		throw new Error("Faltan datos");
	}
	try {
		let location = await solid.getLocationById(session, id, webIdAuthor);
		const review = new Review(rating, comment, session.info.webId);
		// TODO: falla aquí
		location.addReview(review);
		await solid.saveLocation(session, location, webIdAuthor);
		return review;
	} catch (err) {
		throw new Error("Error en el add review");
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
		throw new Error("Error en el update review");
	}
}

async function deleteReview(session, idReview) {
	try {
		await solid.deleteReviewById(session, idReview, session.info.webId);
	} catch (err) {
		throw new Error("Error en el deleteReview");
	}
}

//  Categories
async function getCategories() {
	try {
		let categories = await solid.getCategories();
		return categories;
	} catch (err) {
		throw new Error(err);
	}
}

async function getLocationsByCategory(session, category) {
	try {
		let locations = await solid.getAllLocations(session, session.info.webId);
		locations = locations.filter((location) => location.category === category);
		return locations;
	} catch (err) {
		throw new Error(err);
	}
}

module.exports = {
	createLocation,
	getAllLocations,
	getLocation,
	getCategories,
	deleteLocation,
	updateLocation,
	getLocationsByCategory,
	addReview,
	addPhoto,
	deletePhoto,
	deleteReview,
};

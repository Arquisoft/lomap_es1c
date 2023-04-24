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
			session.info.user
		);
		if (location1 != null) {
			return location1;
		} else {
			return null;
		}
	} catch (err) {
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
	const comment = location.comment;
	const review = location.review;
	const photo = location.photo;
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
		/*
		if (comment) {
			const comment1 = new Comment(session.info.webId, comment);
			await solid.addComment(
				session,
				comment1,
				location.id,
				session.info.webId
			);
		}

		if (review) {
			const review1 = new Review(review, session.info.webId);
			await solid.addReview(session, review1, location.id, session.info.webId);
		}
		if (photo) {
			const photo1 = new Photo(photo, session.info.webId);
			await solid.addPhoto(session, photo1, location.id, session.info.webId);
		}
		*/
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

//PHOTOS REVIEWS COMMENTS
async function addPhoto(session, id, photo) {
	const name = photo.name;
	const photoImage = photo.photoImage;

	if (!photo || !name) {
		throw new Error("Faltan datos");
	}
	try {
		let location = await solid.getLocationById(session, id, session.info.webId);
		const photo = new Photo(session.info.webId, name, photoImage);
		await solid.addPhoto(session, photo, location.id, session.info.webId);
		await solid.saveLocation(location);
	} catch (err) {
		throw new Error(err);
	}
}

async function deletePhoto(session, id, idPhoto) {
	try {
		await solid.deletePhoto(session, id, idPhoto);
	} catch (err) {
		throw new Error(err);
	}
}

async function addReview(session, id, review) {
	const rating = review.rating;
	const comment = review.comment;

	if (!rating) {
		throw new Error("Faltan datos");
	}
	try {
		let location = await solid.getLocationById(session, id, session.info.webId);
		const review = new Review(rating, comment, session.info.webId);
		await solid.addReview(session, review, location.id, session.info.webId);
	} catch (err) {
		throw new Error(err);
	}
}

async function deleteReview(session, idLocation, idReview) {
	try {
		await solid.deleteReviewById(session, idLocation, idReview);
	} catch (err) {
		throw new Error(err);
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

const Location = require("../models/locationModels/Location");
const Photo = require("../models/locationModels/Photo");
const Review = require("../models/locationModels/Review");
const Comment = require("../models/locationModels/Comment");
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
			return JSON.stringify(location1);
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
		return JSON.stringify(locations);
	} catch (err) {
		throw new Error(err);
	}
}

async function createLocation(session, location) {
	const name = location.name;
	const latitude = location.latitude;
	const longitude = location.longitude;
	const privacy = location.privacy;
	const category = location.category;
	const comment = location.comment;
	const review = location.review;
	const photo = location.photo;
	if (!name || !latitude || !longitude || !privacy) {
		throw new Error("Faltan datos");
	}
	try {
		const location = new Location(
			name,
			latitude,
			longitude,
			privacy,
			session.info.webId,
			category
		);
		await solid.saveLocation(session, location, session.info.webId);

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

		return location;
	} catch (err) {
		throw new Error(err);
	}
}

async function updateLocation(session, id, location) {
	let name = location.name;
	let latitude = location.latitude;
	let longitude = location.longitude;
	let privacy = location.privacy;
	let category = location.category;

	try {
		if (!id) {
			throw new Error("Faltan datos");
		}

		let location = await solid.getLocationById(session, id, session.info.webId);

		location.name = name || location.name;
		location.latitude = latitude || location.latitude;
		location.longitude = longitude || location.longitude;
		location.privacy = privacy || location.privacy;
		location.category = category || location.category;

		await solid.saveLocation(session, location, session.info.webId);

		return location;
	} catch (err) {
		throw new Error(err);
	}
}
/*
async function deleteLocation(req, res, next) {
	const { id } = req.params;
	try {
		const session = await SessionController.getSession(req, next);
		const location = await solid.getLocationById(
			session,
			id,
			session.info.webId
		);
		if (location != null) {
			await solid.deleteLocationById(session, id, session.info.webId);
		} else {
			res.status(404).json("No se han encontrado localizaciones con esa id");
			return;
		}
		res.status(204).json({ message: "Location deleted successfully" });
	} catch (err) {
		next(err);
	}
}

//PHOTOS REVIEWS COMMENTS
async function addPhoto(req, res, next) {
	const { id } = req.params;
	const { name, photoUrl } = req.body;

	if (!photoUrl || !name) {
		res.status(400).json({ error: "Faltan datos" });
		return;
	}
	try {
		const session = await SessionController.getSession(req, next);
		let location = await solid.getLocationById(session, id, session.info.webId);
		const photo = new Photo(session.info.webId, name, photoUrl);
		await solid.saveLocation(location);
		res.status(201).json({ message: "Photo added successfully" });
	} catch (err) {
		next(err);
	}
}

async function deletePhoto(req, res, next) {
	const { id } = req.params;
	const { idPhoto } = req.body;
	try {
		const session = await SessionController.getSession(req, next);
		await solid.deletePhoto(id, idPhoto);
		res.status(204).json({ message: "Photo removed successfully" });
	} catch (err) {
		next(err);
	}
}

async function addReview(req, res, next) {
	const { id } = req.params;
	const { rating } = req.body;

	if (!rating) {
		res.status(400).json({ error: "Faltan datos" });
		return;
	}
	try {
		const session = await SessionController.getSession(req, next);
		let location = await solid.getLocationById(session, id, session.info.webId);
		const review = new Review(rating, session.info.webId);
		await solid.addReview(session, review, location.id, session.info.webId);
		res.status(201).json({ message: "Photo added successfully" });
	} catch (err) {
		next(err);
	}
}

async function deleteReview(req, res, next) {
	const { id } = req.params;
	const { idReview } = req.body;
	if (!idReview) {
		res.status(400).json({ error: "Faltan datos" });
		return;
	}
	try {
		const session = await SessionController.getSession(req, next);
		await solid.deleteReviewById(id, idReview);
		res.status(204).json({ message: "Review removed successfully" });
	} catch (err) {
		next(err);
	}
}

async function addComment(req, res, next) {
	const { id } = req.params;
	const { text } = req.body;

	if (!text) {
		res.status(400).json({ error: "Faltan datos" });
		return;
	}
	try {
		const session = await SessionController.getSession(req, next);
		let location = await solid.getLocationById(session, id, session.info.webId);
		const comment = new Comment(session.info.webId, text);

		await solid.addReview(session, comment, location.id, session.info.webId);
		res.status(201).json({ message: "Comment added successfully" });
	} catch (err) {
		next(err);
	}
}

async function deleteComment(req, res, next) {
	const { id } = req.params;
	const { idComment } = req.body;
	try {
		const session = await SessionController.getSession(req, next);
		await solid.deleteCommentById(id, idComment);
		res.status(204).json({ message: "Comment removed successfully" });
	} catch (err) {
		next(err);
	}
}
*/
//  Categories
async function getCategories() {
	try {
		let categories = await solid.getCategories();
		return JSON.stringify(categories);
	} catch (err) {
		throw new Error(err);
	}
}
/*
async function getLocationsByCategory(req, res, next) {
	const { category } = req.params;
	try {
		const session = await SessionController.getSession(req, next);
		let locations = await solid.getAllLocations(session, session.info.webId);
		locations = locations.filter((location) => location.category === category);
		res.send(JSON.stringify(locations));
	} catch (err) {
		next(err);
	}
}
*/
module.exports = {
	createLocation,
	getAllLocations,
	getLocation,
	getCategories,
	/*deleteLocation,
	updateLocation,
	addReview,
	addPhoto,
	addComment,
	getLocationsByCategory,
	deletePhoto,
	deleteReview,
	deleteComment,
	*/
};
